import { act, renderHook } from '@testing-library/react-hooks';
import { useCompletion } from '../index';

jest.mock('openai', () => {
    const originalModule = jest.requireActual('openai');
    return {
        ...originalModule,
        OpenAIApi: jest.fn().mockImplementation(() => ({
            createCompletion: jest.fn().mockRejectedValue(new Error('Failed to fetch completion')),
        })),
    };
});

describe('useCompletion', () => {
    it('should handle error when fetching completion', async () => {
        const prompt = 'Test prompt';
        const apiKey = 'test-api-key';
        const model = 'test-model';

        const { result, waitForNextUpdate } = renderHook(() => useCompletion(prompt, apiKey, model));

        expect(result.current.isFetching).toBe(true);
        expect(result.current.text).toBeUndefined();
        expect(result.current.error).toBeUndefined();

        await act(waitForNextUpdate);

        expect(result.current.isFetching).toBe(false);
        expect(result.current.text).toBeUndefined();
        expect(result.current.error).toEqual(new Error('Failed to fetch completion'));
    });
});