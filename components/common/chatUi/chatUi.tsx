// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './chatUi.less';
import { useBem } from 'components/utilities/useBem';
import clsx from 'clsx';
import { PiChatTextBold, PiTrash } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import { FiUser, FiSend } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import { Button, Input } from 'antd';
import localforage from 'localforage';
import { Typography } from '../typography';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep, isString } from 'lodash-es';

// expect
export interface ChatUiProps {
  className?: string;
  chatUrl: string;
  prompt?: string;
  placeholder?: React.ReactNode;
  width?: number;
  height?: number;
}

export type AiMessageType = 'text' | 'image_url';

export type AiMessageRole = 'assistant' | 'user' | 'system';

export interface Content {
  type: AiMessageType;
  text?: string;
  image_url?: string;
}

export interface Message {
  role: AiMessageRole;
  content: string | Content[];
}

export interface ConversationProperty {
  id: string;
  name: string;
  chatUrl: string;
  messages: Message[];
  prompt: string;
}

export interface ConversationItemProps {
  property: ConversationProperty;
  active?: boolean;
  onSelect?: () => void;
  onEdit?: (item: ConversationItemProps['property']) => void;
  onRemove?: (item: ConversationItemProps['property']) => void;
}

export enum ChatBotAnswerStatus {
  Empty = 'empty',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const ConversationItem: FC<ConversationItemProps> = ({ property, active, onSelect, onEdit, onRemove }) => {
  const bem = useBem('subql-chat-conversation-item');
  return (
    <div
      className={clsx(bem({ active }))}
      onClick={() => {
        onSelect?.();
      }}
    >
      <PiChatTextBold className={clsx(bem('icon'))}></PiChatTextBold>

      <Typography variant="small">{property.name}</Typography>
      <span style={{ flex: 1 }}></span>
      {active ? (
        <>
          {/* <PiPencilSimple
            onClick={() => {
              onEdit?.(property);
            }}
          ></PiPencilSimple> */}
          <PiTrash
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(property);
            }}
          ></PiTrash>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export const ConversationMessage = forwardRef<
  { scrollToBottom: () => void },
  { property: ConversationProperty; answerStatus: ChatBotAnswerStatus }
>(({ property, answerStatus }, ref) => {
  const bem = useBem('subql-chat-conversation-message');
  const outerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      outerRef.current?.scrollTo(0, outerRef.current?.scrollHeight);
    },
  }));

  return (
    <div className={clsx(bem())} ref={outerRef}>
      {property.messages.map((message, index) => {
        return (
          <div
            key={index}
            className={clsx(
              bem('item'),
              bem(message.role, {
                [answerStatus]:
                  index === property.messages.length - 1 && message.role === 'assistant' ? true : undefined,
                lastOne: index === property.messages.length - 1 && message.role === 'assistant' ? true : undefined,
              }),
            )}
          >
            {message.role === 'user' ? (
              <FiUser
                style={{ fontSize: 30, flexShrink: 0, color: 'rgb(243,244,246)', alignSelf: 'flex-start' }}
              ></FiUser>
            ) : (
              <RiRobot2Line
                style={{ fontSize: 30, flexShrink: 0, color: 'rgb(243,244,246)', alignSelf: 'flex-start' }}
              ></RiRobot2Line>
            )}
            {/* TODO: support array */}
            <span className={clsx(bem('item-span'))}>{isString(message.content) ? message.content : ''}</span>
          </div>
        );
      })}
    </div>
  );
});

ConversationMessage.displayName = 'ConversationMessage';

// maybe later support custom workspace name
const workspaceName = 'subql-chat-workspace';

export const chatWithStream = async (url: string, body: { messages: Message[] }) => {
  const res = await fetch(url, {
    headers: {
      accept: 'text/event-stream',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gemma2',
      messages: body.messages,
      stream: true,
    }),
  });
  return res.body;
};

export const ChatUi: FC<ChatUiProps> = ({ chatUrl, prompt, className, placeholder, width, height }) => {
  const bem = useBem('subql-chat');
  const [chats, setChats] = React.useState<ConversationItemProps['property'][]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationItemProps['property']>();
  const [currentInput, setCurrentInput] = useState('');
  const [answerStatus, setAnswerStatus] = useState<ChatBotAnswerStatus>(ChatBotAnswerStatus.Empty);
  const messageArea = useRef<{ scrollToBottom: () => void }>(null);

  const createNewChat = async () => {
    let oldWorkspace = await localforage.getItem<Array<ConversationItemProps['property']>>(workspaceName);

    if (!oldWorkspace || !Array.isArray(oldWorkspace)) {
      oldWorkspace = [];
    }

    const chat = {
      id: uuidv4(),
      name: 'New Conversation',
      chatUrl,
      messages: [],
      prompt: prompt || '',
    };

    oldWorkspace.unshift(chat);
    await localforage.setItem(workspaceName, oldWorkspace);
    setChats(oldWorkspace);
    setCurrentChat(chat);
  };

  const pushNewMsgToChat = async (newChat: ConversationProperty, newMessage: Message) => {
    if (!currentChat) return;

    setCurrentChat({
      ...newChat,
      messages: [...newChat.messages, newMessage],
    });

    setTimeout(() => {
      messageArea.current?.scrollToBottom();
    });

    const newChats = cloneDeep(chats).map((chat) => {
      if (chat.id === currentChat.id) {
        return {
          ...newChat,
          messages: [...newChat.messages, newMessage],
        };
      }

      return chat;
    });

    setChats(newChats);
    await localforage.setItem(workspaceName, newChats);
  };

  const sendMessage = async () => {
    if (!currentInput || !currentChat) {
      return;
    }
    setAnswerStatus(ChatBotAnswerStatus.Loading);
    try {
      const newMessage = {
        role: 'user' as const,
        content: currentInput,
      };

      const newChat = {
        ...currentChat,
        messages: [...currentChat.messages, newMessage],
        name: currentChat.messages.length ? currentChat.name : currentInput.slice(0, 40),
      };

      const newChats = cloneDeep(chats).map((chat) => {
        if (chat.id === currentChat.id) {
          return newChat;
        }

        return chat;
      });

      setCurrentInput('');
      setChats(newChats);
      setCurrentChat(newChat);
      await localforage.setItem(workspaceName, newChats);
      messageArea.current?.scrollToBottom();

      const robotAnswer = {
        role: 'assistant' as const,
        content: '',
      };

      await pushNewMsgToChat(newChat, robotAnswer);

      // set user's message first, then get the response
      const res = await chatWithStream(newChat.messages.length - 1 > 0 ? newChat.chatUrl : chatUrl, {
        messages: prompt ? [{ role: 'system' as const, content: prompt }, ...newChat.messages] : newChat.messages,
      });

      if (res) {
        const decoder = new TextDecoder();
        const reader = res.getReader();
        while (true) {
          const { value, done } = await reader.read();
          const chunkValue = decoder.decode(value);

          if (done || !chunkValue) {
            break;
          }

          const parts = chunkValue.split('\n\n');
          for (const part of parts) {
            const partWithHandle = part.startsWith('data: ') ? part.slice(6, part.length).trim() : part;
            if (part) {
              const parsed: { choices: { delta: { content: string } }[] } = JSON.parse(partWithHandle);
              robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

              await pushNewMsgToChat(newChat, robotAnswer);
            }
          }
        }
      }

      setAnswerStatus(ChatBotAnswerStatus.Success);
    } catch (e) {
      console.error(e);
      setAnswerStatus(ChatBotAnswerStatus.Error);
    }
  };

  const init = async () => {
    const workspace = await localforage.getItem<Array<ConversationItemProps['property']>>(workspaceName);

    if (!workspace || !Array.isArray(workspace)) {
      return;
    }

    setChats(workspace);
    setCurrentChat(workspace[0]);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={clsx(bem(), className)} style={{ width, height }}>
      <div className={clsx(bem('navigate'))}>
        <PiChatTextBold className={clsx(bem('icon'))}></PiChatTextBold>
      </div>

      <div className={clsx(bem('workspace'))}>
        <Button
          style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%', justifyContent: 'center' }}
          onClick={() => {
            createNewChat();
          }}
        >
          <FaPlus /> New Chat
        </Button>

        <Input className={clsx(bem('workspace-search'))} placeholder="Search chats"></Input>

        <div className={clsx(bem('chats'))}>
          {chats.length ? (
            chats.map((chat) => {
              return (
                <ConversationItem
                  key={chat.id}
                  property={chat}
                  active={chat.id === currentChat?.id}
                  onSelect={() => {
                    setCurrentChat(chat);
                  }}
                  onRemove={async (item) => {
                    const filtered = chats.filter((c) => c.id !== item.id);
                    setChats(filtered);
                    setCurrentChat(filtered[0]);
                    await localforage.setItem(workspaceName, filtered);
                  }}
                ></ConversationItem>
              );
            })
          ) : (
            <Typography style={{ padding: 32 }} variant="large">
              <em>No chats.</em>
            </Typography>
          )}
        </div>
      </div>

      <div className={clsx(bem('area'))}>
        {currentChat?.messages.length ? (
          <ConversationMessage
            property={currentChat}
            answerStatus={answerStatus}
            ref={messageArea}
          ></ConversationMessage>
        ) : (
          <div className={clsx(bem('chat-placeholder'))}>
            {placeholder || (
              <div>
                <Typography>SubQuery Chat</Typography>
              </div>
            )}
          </div>
        )}

        <div className={clsx(bem('chat-input-group'))}>
          <Input
            className={clsx(bem('chat-input'))}
            placeholder="Ask anything"
            value={currentInput}
            onChange={(e) => {
              setCurrentInput(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            suffix={
              <div
                className={clsx(bem('chat-input-send'))}
                style={{
                  cursor: answerStatus === ChatBotAnswerStatus.Loading ? 'not-allowed' : 'pointer',
                }}
                onClick={() => sendMessage()}
              >
                <FiSend style={{ color: '#000', fontSize: 20 }}></FiSend>
              </div>
            }
          ></Input>
        </div>
      </div>
    </div>
  );
};
