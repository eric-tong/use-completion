import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai'
import type { Completion } from './types';
import { DEFAULT_MODEL } from './constants';

/**
 *
 * @summary Creates a completion for the provided prompt
 * @param {string} prompt Text that is sent to the model for completion
 * @param {string} apiKey OpenAI API Key {@link https://platform.openai.com/account/api-keys} 
 *    WARNING: Be careful not to leak your API key by using this in public-facing apps
 * @param {string} [model] Name of generative model to be used. Defaults to {@link DEFAULT_MODEL}
 */
export default function useCompletion(prompt: string, apiKey: string, model: string = DEFAULT_MODEL): Completion {
    const [text, setText] = useState<string>()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [error, setError] = useState<Error>()

    const configuration = new Configuration({ apiKey })
    const request = { prompt, model }
    const openai = new OpenAIApi(configuration)

    openai.createCompletion(request)
        .then(response => response.data)
        .then(data => data.choices[0]?.text!!)
        .then(text => setText(text))
        .then(() => setIsFetching(false))
        .catch(setError)

    return { text, isFetching, error }
}