// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type AiMessageType = 'text' | 'image_url';

export type AiMessageRole = 'assistant' | 'user' | 'system';

export interface Content {
  type: AiMessageType;
  text?: string;
  image_url?: string;
}

export interface ConversationProperty {
  id: string;
  name: string;
  chatUrl: string;
  messages: Message[];
  prompt: string;
}

export interface Message {
  role: AiMessageRole;
  content: string | Content[];
  type?: 'welcome'; // welcome should filter before send
  id?: string;
  conversation_id?: string;
}

export interface ResponseChunk {
  id?: string;
  conversation_id?: string;
  choices: { delta: { content: string } }[];
}

export const chatWithStream = async (url: string, body: { messages: Message[]; model?: string }) => {
  const { model = 'gemma2' } = body;
  const res = await fetch(url, {
    headers: {
      accept: 'text/event-stream',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages: body.messages,
      stream: true,
    }),
  });
  return res;
};
