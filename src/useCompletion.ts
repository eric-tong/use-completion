import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai'

export default function useCompletion(prompt: string, apiKey: string) {
    const [completion, setCompletion] = useState<string | null>(null)
    const configuration = new Configuration({ apiKey })
    const openai = new OpenAIApi(configuration)
    openai.createCompletion({
        model: "text-davinci-003",
        prompt,
    }).then(response => response.data)
        .then(data => data.choices[0]?.text!!)
        .then(text => setCompletion(text))

    return completion
}