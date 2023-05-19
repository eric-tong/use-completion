# ⚛ useCompletion React Hook
useCompletion is a simple, lightweight React hook that creates a completion for the provided prompt using the OpenAI API. It can be used to generate text or complete sentences based on the given prompt. Built on top of [openai-node](https://github.com/openai/openai-node).

> NOTE: This is an early release and the API may be subject to changes during development

# ⚙️ Installation
```bash
npm i use-completion

or

yarn add use-completion
```

# 📝 Usage
```tsx
import React from 'react';
import { useCompletion } from 'use-completion';

function MyComponent() {
  const prompt = "Suggest three names for an animal that is a superhero.";
  const apiKey = "MY_OPENAI_API_KEY"; // ⚠️ WARNING: Be careful not to leak your API key by using this in public-facing apps

  const { text, isFetching } = useCompletion(prompt, apiKey);
  
  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Generated Text</h1>
      <p>{prompt}</p>
      <p>{text}</p>
    </div>
  );
}
```

# 🚀 Advanced Usage
For more customization options, use `useCompletionWithConfig` instead.

```tsx
import React from 'react';
import { useCompletionWithConfig } from 'use-completion';

function MyComponent() {
  const request = {
    prompt: "Suggest three names for an animal that is a superhero.",
    model: "my-custom-model",
    temperature: 0.5
  };
  const configuration = {
    apiKey: "MY_OPENAI_API_KEY", // ⚠️ WARNING: Be careful not to leak your API key by using this in public-facing apps
    organization: "Foobar Corp"
  }

  const { text, isFetching } = useCompletionWithConfig(request, configuration);
  
  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Generated Text</h1>
      <p>{prompt}</p>
      <p>{text}</p>
    </div>
  );
}
```
