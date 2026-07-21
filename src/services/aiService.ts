import { ChatMessage } from '../store/useAppStore';

const SYSTEM_PROMPT = `You are an excellent Japanese café staff member. Always answer politely, warmly, and professionally. Keep responses short, clear, and helpful. Recommend menu items when appropriate, never invent unavailable items, and always prioritize excellent customer service.`;

export async function* streamChat(
  provider: string,
  model: string,
  apiKey: string,
  messages: ChatMessage[],
  signal?: AbortSignal
): AsyncGenerator<string, void, unknown> {
  const formattedMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  if (!apiKey) {
    yield 'Error: API key is not configured for this provider. Please add it in the settings.';
    return;
  }

  try {
    let response: Response;

    if (provider === 'openrouter') {
      response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Sakura Brew Cafe',
        },
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          stream: true,
        }),
        signal,
      });
    } else if (provider === 'groq') {
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          stream: true,
        }),
        signal,
      });
    } else if (provider === 'google') {
        const geminiMessages = formattedMessages.map(m => ({
            role: m.role === 'system' ? 'user' : m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.role === 'system' ? 'SYSTEM PROMPT: ' + m.content : m.content }]
        }));

        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                contents: geminiMessages,
            }),
            signal,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        if (!reader) throw new Error('No reader available');
        
        let done = false;
        while (!done) {
            if (signal?.aborted) {
              reader.cancel();
              break;
            }
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
              const chunkValue = decoder.decode(value, { stream: true });
              const textMatches = chunkValue.match(/"text":\s*"([^"]+)"/g);
              if (textMatches) {
                  for (const match of textMatches) {
                      const text = match.replace(/"text":\s*"/, '').replace(/"$/, '').replace(/\\n/g, '\n').replace(/\\"/g, '"');
                      yield text;
                  }
              }
            }
        }
        return;
    } else {
        throw new Error('Unsupported provider');
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error('No reader available');

    while (true) {
      if (signal?.aborted) {
        reader.cancel();
        break;
      }
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.includes('[DONE]')) continue;
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.choices && data.choices[0].delta.content) {
              yield data.choices[0].delta.content;
            }
          } catch (e) {
            // ignore parse errors
          }
        }
      }
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Chat stream aborted');
    } else {
      yield `\n\nError communicating with AI Barista: ${error.message}`;
    }
  }
}
