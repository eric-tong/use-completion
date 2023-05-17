import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai'
import type { Completion } from './types';
import { DEFAULT_MODEL } from './constants';

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