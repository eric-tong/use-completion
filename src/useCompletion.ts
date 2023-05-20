import { Configuration } from 'openai'
import type { Completion } from './types';
import { DEFAULT_MODEL, DEFAULT_MAX_TOKENS } from './constants';
import useCompletionWithConfig from './useCompletionWithConfig';

/**
 *
 * @summary Simple hook to create a completion for the provided prompt. Use {@link useCompletionWithConfig} to configure the query in detail
 * @param {string} prompt Text that is sent to the model for completion
 * @param {string} apiKey OpenAI API Key {@link https://platform.openai.com/account/api-keys} 
 *    WARNING: Be careful not to leak your API key by using this in public-facing apps
 * @param {string} [model] Name of generative model to be used. Defaults to {@link DEFAULT_MODEL}
 */
export default function useCompletion(prompt: string, apiKey: string, model: string = DEFAULT_MODEL): Completion {
    const configuration = new Configuration({ apiKey })
    const request = { prompt, model, max_tokens: DEFAULT_MAX_TOKENS }

    return useCompletionWithConfig(request, configuration)
}