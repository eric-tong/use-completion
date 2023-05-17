/**
 *
 * @summary Return type for useCompletion Hook
 * @param {string} prompt Text that is sent to the model for completion
 * @param {string} apiKey OpenAI API Key
 * @param {string} [model] Name of generative model to be used
 */
export type Completion = {
    text: string | undefined,
    isFetching: boolean,
    error: Error | undefined,
}