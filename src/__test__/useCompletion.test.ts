import { act, renderHook } from '@testing-library/react-hooks';
import { useCompletion } from '../index';

// Mock OpenAIApi and its createCompletion method
jest.mock('openai', () => {
    const originalModule = jest.requireActual('openai');
    return {
        ...originalModule,
        OpenAIApi: jest.fn().mockImplementation(() => ({
            createCompletion: jest.fn().mockResolvedValue({
                data: { choices: [{ text: 'Mocked completion' }] },
            }),
        })),
    };
});

describe('useCompletion', () => {
    it('should fetch completion and return the result', async () => {
        const prompt = 'Test prompt';
        const apiKey = 'test-api-key';
        const model = 'test-model';

        const { result, waitForNextUpdate } = renderHook(() => useCompletion(prompt, apiKey, model));

        expect(result.current.isFetching).toBe(true);
        expect(result.current.text).toBeUndefined();
        expect(result.current.error).toBeUndefined();

        await act(() => waitForNextUpdate())

        expect(result.current.isFetching).toBe(false);
        expect(result.current.text).toBe('Mocked completion');
        expect(result.current.error).toBeUndefined();
    });
});