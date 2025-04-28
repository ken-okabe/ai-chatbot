import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { createVertex } from '@ai-sdk/google-vertex';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const vertex = createVertex({
  project: 'agent-kenokabe01',
  location: 'us-central1',
});
// 例: vertex('gemini-2.0-flash-001') でモデル指定

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': vertex('gemini-2.0-flash-001'),
        'chat-model-reasoning': vertex('gemini-2.0-flash-001'),
        'title-model': vertex('gemini-2.0-flash-001'),
        'artifact-model': vertex('gemini-2.0-flash-001'),
      },
      imageModels: {
        // Vertex AI画像モデルを使う場合はここに追加
      },
    });
