import { useEffect, useState } from 'react';
import { OpenAIApi } from 'openai';
import axios from 'axios'
import type { Configuration, CreateCompletionRequest } from 'openai'
import type { Completion } from './types';

/**
 *
 * @summary Hook to create a completion for the provided prompt with configuration options
 * @param {CreateCompletionRequest} request Configuration for the request to be sent to the Completion API, including the prompt and model name
 * @param {Configuration} configuration Configuration for OpenAI API, including API key
 */
export default function useCompletionWithConfig(request: CreateCompletionRequest, configuration: Configuration): Completion {
    const [text, setText] = useState<string>()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [error, setError] = useState<Error>()

    useEffect(() => {
        const openai = new OpenAIApi(configuration)
        const cancelTokenSource = axios.CancelToken.source();

        setIsFetching(true)
        setError(undefined)

        openai.createCompletion(request, {cancelToken: cancelTokenSource.token})
            .then(response => response.data)
            .then(data => data.choices[0]?.text!!) // TODO: Support cases where n > 1
            .then(text => setText(text))
            .catch(setError)
            .finally(() => setIsFetching(false))

        return () => cancelTokenSource.cancel("Request cancelled due to component cleanup")
    }, [request.prompt, request.model, configuration.apiKey]) // TODO: Consider more useEffect dependencies

    return { text, isFetching, error }
}