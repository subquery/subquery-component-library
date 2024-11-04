// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useBem } from 'components/utilities/useBem';
import clsx from 'clsx';
import { PiChatTextBold, PiTrash } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import { FiUser, FiSend } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import { AiFillApi } from 'react-icons/ai';
import { SlArrowDown } from 'react-icons/sl';
import { IoClose } from 'react-icons/io5';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { Button, Input, InputRef, message, Popover } from 'antd';
import { Typography } from '../typography';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep, isString } from 'lodash-es';
import Address from '../address';
import Markdown from '../markdown/Markdown';
import './chatUi.less';
import { chatWithStream, ConversationProperty, Message } from 'components/utilities/chatWithStream';

const indexerName: { [key in string]: string } = {
  '0xd0af1919af890cfdd8d12be5cf1b1421224fc29a': 'Mainnet Operator',
  '0x21e86cf290992a0773107e63cbc1f609f772e931': 'Phoenix Rebirth',
  '0xa10af672bcdd1dd61b6a63a18295e55e5f3ea842': 'subquerynetwork.eth',
};

// expect
export interface ChatUiProps {
  className?: string;
  chatUrl: string;
  prompt?: string;
  placeholder?: React.ReactNode;
  width?: number;
  height?: number;
  model?: string;
}

export interface ChatBoxProps {
  className?: string;
  chatUrl: string;
  prompt?: string;
  model?: string;
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
  { property: ConversationProperty; answerStatus: ChatBotAnswerStatus; version?: 'chat' | 'chatbox' }
>(({ property, answerStatus, version = 'chat' }, ref) => {
  const bem = useBem(version === 'chat' ? 'subql-chat-conversation-message' : 'subql-chatbox-conversation-message');
  const outerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    scrollToBottom: (onlyWhenReachBottom = false) => {
      if (onlyWhenReachBottom && outerRef.current) {
        // 22 = 1em + line height
        const ifReachBottom =
          outerRef.current?.scrollTop >= outerRef.current?.scrollHeight - outerRef.current?.clientHeight - 22;
        if (ifReachBottom) {
          outerRef.current?.scrollTo(0, outerRef.current?.scrollHeight);
        }

        return;
      }
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
                  index === property.messages.length - 1 && message.role === 'assistant' && !message?.content?.length
                    ? true
                    : undefined,
                lastOne: index === property.messages.length - 1 && message.role === 'assistant' ? true : undefined,
              }),
            )}
          >
            {version === 'chat' ? (
              <>
                {message.role === 'user' ? (
                  <FiUser
                    style={{ fontSize: 30, flexShrink: 0, color: 'rgb(243,244,246)', alignSelf: 'flex-start' }}
                  ></FiUser>
                ) : (
                  <RiRobot2Line
                    style={{ fontSize: 30, flexShrink: 0, color: 'rgb(243,244,246)', alignSelf: 'flex-start' }}
                  ></RiRobot2Line>
                )}
              </>
            ) : (
              <>
                {message.role === 'assistant' ? (
                  <img src="https://static.subquery.network/logo-with-bg.svg" width={40} height={40}></img>
                ) : (
                  ''
                )}
              </>
            )}
            {/* TODO: support array */}
            <div className={clsx(bem('item-span'))}>
              {isString(message.content) ? <Markdown.Preview>{message.content}</Markdown.Preview> : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
});
ConversationMessage.displayName = 'ConversationMessage';

export const ChatUi: FC<ChatUiProps> = ({ chatUrl, prompt, className, placeholder, width, height, model }) => {
  const bem = useBem('subql-chat');
  const [chats, setChats] = React.useState<ConversationItemProps['property'][]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationItemProps['property']>();
  const [currentInput, setCurrentInput] = useState('');
  const [answerStatus, setAnswerStatus] = useState<ChatBotAnswerStatus>(ChatBotAnswerStatus.Empty);
  const [conversationSearch, setConversationSearch] = useState('');
  const messageArea = useRef<{ scrollToBottom: () => void }>(null);
  const inputRef = useRef<InputRef>(null);
  const selectedServer = useMemo(() => {
    const split = currentChat?.chatUrl?.split('select=');
    return split?.[1] || 'No Server Available';
  }, [currentChat?.chatUrl]);

  const renderChats = useMemo(() => {
    if (conversationSearch) {
      return chats.filter((chat) => chat.name.includes(conversationSearch));
    }

    return chats;
  }, [conversationSearch, chats]);

  const createNewChat = async () => {
    // let oldWorkspace = await localforage.getItem<Array<ConversationItemProps['property']>>(workspaceName);

    // if (!oldWorkspace || !Array.isArray(oldWorkspace)) {
    //   oldWorkspace = [];
    // }
    const oldWorkspace = cloneDeep(chats);

    const chat = {
      id: uuidv4(),
      name: 'New Conversation',
      chatUrl,
      messages: [],
      prompt: '',
    };

    oldWorkspace.unshift(chat);
    // await localforage.setItem(workspaceName, oldWorkspace);
    setChats(oldWorkspace);
    setCurrentChat(chat);

    return {
      chats: oldWorkspace,
      chat,
    };
  };

  const pushNewMsgToChat = async (
    newChat: ConversationProperty,
    newMessage: Message,
    curChat?: ConversationItemProps['property'],
    curChats?: ConversationItemProps['property'][],
  ) => {
    const cur = curChat || currentChat;
    const curs = curChats || chats;
    if (!cur) return;

    setCurrentChat({
      ...newChat,
      messages: [...newChat.messages, newMessage],
    });

    setTimeout(() => {
      messageArea.current?.scrollToBottom();
    });

    const newChats = cloneDeep(curs).map((chat) => {
      if (chat.id === cur.id) {
        return {
          ...newChat,
          messages: [...newChat.messages, newMessage],
        };
      }

      return chat;
    });

    setChats(newChats);
    // await localforage.setItem(workspaceName, newChats);
  };

  const sendMessage = async () => {
    let curChat = currentChat;
    let curChats = chats;
    if (!currentInput) {
      return;
    }

    if (!currentChat) {
      const { chats: newChats, chat } = await createNewChat();
      curChats = newChats;
      curChat = chat;
    }

    if (!curChat) {
      message.error('Failed to create new chat, please create manually.');
      return;
    }
    setAnswerStatus(ChatBotAnswerStatus.Loading);
    try {
      const newMessage = {
        role: 'user' as const,
        content: currentInput,
      };

      const newChat = {
        ...curChat,
        messages: [...curChat.messages, newMessage].filter((i) => i.content),
        name: curChat.messages.length ? curChat.name : currentInput.slice(0, 40),
      };
      newChat.chatUrl = newChat.messages.length - 1 > 0 ? newChat.chatUrl : chatUrl;
      newChat.prompt = newChat.prompt || prompt || '';

      const newChats = cloneDeep(curChats).map((chat) => {
        if (chat.id === curChat.id) {
          return newChat;
        }

        return chat;
      });

      setCurrentInput('');
      setChats(newChats);
      setCurrentChat(newChat);
      // await localforage.setItem(workspaceName, newChats);
      messageArea.current?.scrollToBottom();

      const robotAnswer = {
        role: 'assistant' as const,
        content: '',
      };

      await pushNewMsgToChat(newChat, robotAnswer, curChat, curChats);
      // set user's message first, then get the response
      const res = await chatWithStream(newChat.chatUrl, {
        messages: newChat.prompt
          ? [{ role: 'system' as const, content: newChat.prompt }, ...newChat.messages]
          : newChat.messages,
        model,
      });

      if (res.status === 200 && res.body) {
        const decoder = new TextDecoder();
        const reader = res.body.getReader();
        let invalidJson = '';

        while (true) {
          const { value, done } = await reader.read();
          const chunkValue = decoder.decode(value);

          if (done || !chunkValue) {
            break;
          }

          const parts = chunkValue.split('\n\n');
          for (const part of parts) {
            if (invalidJson) {
              try {
                invalidJson += part;
                const parsed: { choices: { delta: { content: string } }[] } = JSON.parse(invalidJson);
                robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

                await pushNewMsgToChat(newChat, robotAnswer, curChat, curChats);
                invalidJson = '';
              } catch (e) {
                // handle it until
              }
              continue;
            }

            const partWithHandle = part.startsWith('data: ') ? part.slice(6, part.length).trim() : part;

            if (partWithHandle) {
              try {
                const parsed: { choices: { delta: { content: string } }[] } = JSON.parse(partWithHandle);
                robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

                await pushNewMsgToChat(newChat, robotAnswer, curChat, curChats);
              } catch (e) {
                invalidJson += partWithHandle;
              }
            }
          }
        }

        if (invalidJson) {
          try {
            const parsed: { choices: { delta: { content: string } }[] } = JSON.parse(invalidJson);
            robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

            await pushNewMsgToChat(newChat, robotAnswer, curChat, curChats);
          } catch (e) {
            console.warn('Reach this code', invalidJson);
            // to reach this code, it means the response is not valid or the code have something wrong.
          }
        }
      } else {
        robotAnswer.content = 'Sorry, The Server is not available now.';
        await pushNewMsgToChat(newChat, robotAnswer, curChat, curChats);
        setAnswerStatus(ChatBotAnswerStatus.Error);
      }
      inputRef.current?.focus();
      setAnswerStatus(ChatBotAnswerStatus.Success);
    } catch (e) {
      console.error(e);
      inputRef.current?.focus();
      setAnswerStatus(ChatBotAnswerStatus.Error);
    }
  };

  const init = async () => {
    // const workspace = await localforage.getItem<Array<ConversationItemProps['property']>>(workspaceName);

    // if (!workspace || !Array.isArray(workspace)) {
    //   return;
    // }

    // setChats(workspace);
    // setCurrentChat(workspace[0]);
    createNewChat();
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            width: '100%',
            justifyContent: 'center',
          }}
          onClick={() => {
            if (answerStatus === ChatBotAnswerStatus.Loading) return;
            createNewChat();
          }}
        >
          <FaPlus /> New Chat
        </Button>

        <Input
          className={clsx(bem('workspace-search'))}
          placeholder="Search chats"
          onChange={(e) => {
            setConversationSearch(e.target.value);
          }}
        ></Input>

        <div className={clsx(bem('chats'))}>
          {renderChats.length ? (
            renderChats.map((chat) => {
              return (
                <ConversationItem
                  key={chat.id}
                  property={chat}
                  active={chat.id === currentChat?.id}
                  onSelect={() => {
                    setCurrentChat(chat);
                    inputRef.current?.focus();
                  }}
                  onRemove={async (item) => {
                    const filtered = chats.filter((c) => c.id !== item.id);
                    setChats(filtered);
                    setCurrentChat(filtered[0]);
                    // await localforage.setItem(workspaceName, filtered);
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
          <div className={clsx(bem('chat-url'))}>
            <AiFillApi style={{ fontSize: 30, flexShrink: 0, color: 'rgb(243,244,246)' }} />
            {/* {selectedServer} */}
            <Address
              address={selectedServer}
              size="bigger"
              customLabel={
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 8,
                  }}
                >
                  <Typography variant="medium">{indexerName[selectedServer]}</Typography>
                  <Typography variant="medium">{selectedServer}</Typography>
                </div>
              }
            ></Address>
          </div>
        ) : (
          ''
        )}
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
            ref={inputRef}
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

const ChatBoxIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0204 2.16292C11.9974 2.22184 11.9715 2.27932 11.9456 2.3368C11.9341 2.36123 11.9227 2.38566 11.9112 2.41153C11.4585 3.3499 10.7012 4.10721 9.76285 4.55984C9.73698 4.57133 9.71255 4.58283 9.68812 4.59433C9.63064 4.62019 9.57316 4.64606 9.51424 4.66905C9.41796 4.70929 9.32025 4.74521 9.22109 4.77826L8.48821 5.02255C8.13902 5.13895 8.13902 5.6333 8.48821 5.74969L9.22109 5.99398C9.32024 6.02703 9.41796 6.0644 9.51424 6.1032C9.57316 6.12762 9.63064 6.15205 9.68812 6.17936C9.71255 6.19085 9.73698 6.20235 9.76285 6.21384C10.7012 6.66508 11.4585 7.42382 11.9112 8.36215C11.9227 8.38658 11.9341 8.41101 11.9456 8.43544C11.9715 8.49292 11.9974 8.5504 12.0204 8.60932C12.0606 8.7056 12.0965 8.80331 12.1296 8.90247L12.3739 9.63678C12.4903 9.98598 12.9846 9.98598 13.101 9.63678L13.3453 8.90247C13.3784 8.80332 13.4157 8.7056 13.4545 8.60932C13.4789 8.5504 13.5034 8.49292 13.5307 8.43544C13.5422 8.41101 13.5537 8.38658 13.5652 8.36215C14.0164 7.42378 14.7751 6.66504 15.7135 6.21384C15.7379 6.20235 15.7623 6.19085 15.7868 6.17936C15.8442 6.15205 15.9017 6.12763 15.9606 6.1032C16.0569 6.0644 16.1546 6.02704 16.2538 5.99398L16.9867 5.74969C17.3373 5.63329 17.3373 5.13895 16.9867 5.02255L16.2538 4.77826C16.1546 4.74521 16.0569 4.70929 15.9606 4.66905C15.9017 4.64606 15.8442 4.62019 15.7868 4.59433C15.7623 4.58283 15.7379 4.57133 15.7135 4.55984C14.7751 4.10717 14.0164 3.34986 13.5652 2.41153C13.5537 2.38566 13.5422 2.36123 13.5307 2.3368C13.5034 2.27932 13.4789 2.22184 13.4545 2.16292C13.4157 2.06664 13.3784 1.96893 13.3453 1.86977L13.101 1.13689C12.9846 0.787702 12.4903 0.787702 12.3739 1.13689L12.1296 1.86977C12.0965 1.96893 12.0606 2.06664 12.0204 2.16292ZM12.7374 4.0066C12.3537 4.53685 11.8882 5.00243 11.3579 5.38612C11.8882 5.76981 12.3537 6.23683 12.7374 6.76708C13.1211 6.23683 13.5881 5.76981 14.1184 5.38612C13.5881 5.00243 13.1211 4.53685 12.7374 4.0066Z"
      fill="white"
    />
    <path
      d="M23.8773 4.99041C23.7609 4.64122 23.2665 4.64122 23.1501 4.99041L23.0524 5.28356C22.9001 5.74197 22.5409 6.10123 22.0825 6.25353L21.7893 6.35125C21.4401 6.46765 21.4401 6.96199 21.7893 7.07839L22.0825 7.1761C22.5409 7.32842 22.9001 7.68767 23.0524 8.14607L23.1501 8.43923C23.2665 8.78842 23.7609 8.78842 23.8773 8.43923L23.975 8.14607C24.1273 7.68767 24.4866 7.3284 24.945 7.1761L25.2381 7.07839C25.5873 6.96199 25.5873 6.46764 25.2381 6.35125L24.945 6.25353C24.4866 6.10121 24.1273 5.74197 23.975 5.28356L23.8773 4.99041Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8419 9.54118C17.8793 9.45783 17.9138 9.37161 17.9454 9.28539C17.9741 9.21067 18.0014 9.13594 18.0259 9.05978L18.2946 8.25506C18.411 7.90587 18.9053 7.90587 19.0217 8.25506L19.289 9.05978C19.3149 9.13594 19.3407 9.21067 19.3695 9.28539C19.4025 9.37161 19.437 9.45783 19.473 9.54118L19.4773 9.55267C20.0966 10.9854 21.2405 12.1292 22.6732 12.7486L22.6847 12.7529C22.7694 12.7902 22.8542 12.8233 22.9404 12.8564C23.0152 12.8851 23.0899 12.911 23.1675 12.9368L23.9708 13.2055C24.32 13.3219 24.32 13.8163 23.9708 13.9327L23.1675 14.2C23.0899 14.2258 23.0152 14.2517 22.9404 14.2804C22.8542 14.3135 22.7694 14.348 22.6847 14.3839L22.6732 14.3882C21.2405 15.0076 20.0966 16.1514 19.4773 17.5841L19.473 17.5956C19.437 17.679 19.4025 17.7652 19.3695 17.8514C19.3407 17.9261 19.3149 18.0008 19.289 18.077L19.0217 18.8817C18.9053 19.2309 18.411 19.2309 18.2946 18.8817L18.0259 18.077C18.0014 18.0008 17.9741 17.9261 17.9454 17.8514C17.9138 17.7652 17.8793 17.679 17.8419 17.5956L17.8376 17.5841C17.2183 16.1514 16.0744 15.0076 14.6417 14.3882L14.6302 14.3839C14.5469 14.348 14.4607 14.3135 14.3744 14.2804C14.2997 14.2517 14.225 14.2258 14.1488 14.2L13.3441 13.9327C12.9949 13.8163 12.9949 13.3219 13.3441 13.2055L14.1488 12.9368C14.225 12.911 14.2997 12.8851 14.3744 12.8564C14.4607 12.8233 14.5469 12.7902 14.6302 12.7529L14.6417 12.7486C16.0744 12.1292 17.2183 10.9854 17.8376 9.55267L17.8419 9.54118ZM16.3518 13.569C17.2772 12.9741 18.0632 12.1881 18.6581 11.2626C19.2516 12.1881 20.0377 12.9741 20.9631 13.569C20.0377 14.1625 19.2516 14.9486 18.6581 15.874C18.0632 14.9486 17.2772 14.1625 16.3518 13.569Z"
      fill="white"
    />
    <path
      d="M2.0333 9.24302C2.0333 8.81912 2.37531 8.47711 2.79921 8.47711H5.09842C5.52232 8.47711 5.86433 8.13367 5.86433 7.70976C5.86433 7.28729 5.52232 6.94385 5.09842 6.94385H2.79921C1.52891 6.94385 0.5 7.97275 0.5 9.24306V21.505C0.5 22.7753 1.52891 23.8042 2.79921 23.8042H5.09842V26.1034C5.09842 27.3666 6.53975 28.0879 7.5514 27.3306L12.0479 23.958C12.1801 23.8588 12.3411 23.8042 12.5078 23.8042H22.7262C23.9951 23.8042 25.0254 22.7753 25.0254 21.505V18.4399C25.0254 18.016 24.682 17.674 24.258 17.674C23.8356 17.674 23.4921 18.016 23.4921 18.4399V21.505C23.4921 21.9289 23.1487 22.2723 22.7262 22.2723H12.5078C12.0091 22.2723 11.5263 22.4333 11.1283 22.7322L6.63175 26.1034V23.4219C6.63175 22.7868 6.11588 22.2723 5.48215 22.2723H2.79925C2.37535 22.2723 2.03333 21.9289 2.03333 21.505L2.0333 9.24302Z"
      fill="white"
    />

    <path d="M8.2 275.4c0-8.6 3.4-17.401 10-24.001 13.2-13.2 34.8-13.2 48 0l451.8 451.8 445.2-445.2c13.2-13.2 34.8-13.2 48 0s13.2 34.8 0 48L542 775.399c-13.2 13.2-34.8 13.2-48 0l-475.8-475.8c-6.8-6.8-10-15.4-10-24.199z"></path>
  </svg>
);

// maybe split to other file.
export const ChatBox: FC<ChatBoxProps> = (props) => {
  const { chatUrl, prompt = '', model } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const bem = useBem('subql-chatbox');
  const [currentInput, setCurrentInput] = useState('');
  const inputRef = useRef<InputRef>(null);
  const messageRef = useRef<{ scrollToBottom: (argv?: boolean) => void }>(null);
  const [currentChat, setCurrentChat] = useState<ConversationItemProps['property']>({
    messages: [
      {
        role: 'assistant',
        content: 'Hi, I’m SubQuery AI, how can I help? you can ask me anything you want',
        type: 'welcome',
      },
    ],
    id: '0',
    name: 'SubQuery AI',
    chatUrl,
    prompt,
  });
  const [answerStatus, setAnswerStatus] = useState<ChatBotAnswerStatus>(ChatBotAnswerStatus.Loading);

  const pushNewMsgToChat = async (
    newChat: ConversationProperty,
    newMessage: Message,
    curChat?: ConversationItemProps['property'],
  ) => {
    const cur = curChat || currentChat;
    if (!cur) return;

    setCurrentChat({
      ...newChat,
      messages: [...newChat.messages, newMessage],
    });
  };

  const sendMessage = async () => {
    const curChat = currentChat;
    if (!currentInput) {
      return;
    }

    setAnswerStatus(ChatBotAnswerStatus.Loading);
    try {
      const newMessage = {
        role: 'user' as const,
        content: currentInput,
      };

      const newChat = {
        ...curChat,
        messages: [...curChat.messages, newMessage].filter((i) => i.content),
        name: curChat.messages.length ? curChat.name : currentInput.slice(0, 40),
      };
      newChat.chatUrl = newChat.messages.length - 1 > 0 ? newChat.chatUrl : chatUrl;
      newChat.prompt = newChat.prompt || prompt || '';

      const robotAnswer: Message = {
        role: 'assistant' as const,
        content: '',
      };

      setCurrentInput('');
      await pushNewMsgToChat(newChat, robotAnswer, curChat);
      messageRef.current?.scrollToBottom();
      // set user's message first, then get the response
      const res = await chatWithStream(newChat.chatUrl, {
        messages: newChat.prompt
          ? [{ role: 'system' as const, content: newChat.prompt }, ...newChat.messages]
          : newChat.messages,
        model,
      });

      if (res.status === 200 && res.body) {
        const decoder = new TextDecoder();
        const reader = res.body.getReader();
        let invalidJson = '';

        while (true) {
          const { value, done } = await reader.read();
          const chunkValue = decoder.decode(value);

          if (done || !chunkValue) {
            break;
          }

          const parts = chunkValue.split('\n\n');
          for (const part of parts) {
            if (invalidJson) {
              try {
                invalidJson += part;
                const parsed: { choices: { delta: { content: string } }[] } = JSON.parse(invalidJson);
                robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

                await pushNewMsgToChat(newChat, robotAnswer, curChat);
                console.warn(messageRef);
                messageRef.current?.scrollToBottom(true);
                invalidJson = '';
              } catch (e) {
                // handle it until
              }
              continue;
            }

            const partWithHandle = part.startsWith('data: ') ? part.slice(6, part.length).trim() : part;

            if (partWithHandle) {
              try {
                const parsed: { choices: { delta: { content: string } }[] } = JSON.parse(partWithHandle);
                robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

                await pushNewMsgToChat(newChat, robotAnswer, curChat);
                messageRef.current?.scrollToBottom(true);
              } catch (e) {
                invalidJson += partWithHandle;
              }
            }
          }
        }

        if (invalidJson) {
          try {
            const parsed: { choices: { delta: { content: string } }[] } = JSON.parse(invalidJson);
            robotAnswer.content += parsed?.choices?.[0]?.delta?.content;

            await pushNewMsgToChat(newChat, robotAnswer, curChat);
          } catch (e) {
            console.warn('Reach this code', invalidJson);
            // to reach this code, it means the response is not valid or the code have something wrong.
          }
        }
      } else {
        robotAnswer.content = 'Sorry, The Server is not available now.';
        await pushNewMsgToChat(newChat, robotAnswer, curChat);
        setAnswerStatus(ChatBotAnswerStatus.Error);
      }
      inputRef.current?.focus();
      setAnswerStatus(ChatBotAnswerStatus.Success);
    } catch (e) {
      console.error(e);
      inputRef.current?.focus();
      setAnswerStatus(ChatBotAnswerStatus.Error);
    }
  };

  return (
    <Popover
      open={popoverOpen}
      onOpenChange={(open) => {
        setPopoverOpen(open);
      }}
      trigger="click"
      placement="topLeft"
      overlayClassName={clsx(bem('popover'))}
      content={
        <div className={clsx(bem('content'))}>
          <div className={clsx(bem('content-top'))}>
            <div className={clsx(bem('content-icon'))}>
              <ChatBoxIcon></ChatBoxIcon>
            </div>
            <Typography variant="h6">SubQuery AI</Typography>
            <IoClose
              className={clsx(bem('content-close-icon'))}
              onClick={() => {
                setPopoverOpen(false);
              }}
            ></IoClose>
          </div>
          <div className={clsx(bem('content-main'))}>
            <ConversationMessage
              property={currentChat}
              answerStatus={answerStatus}
              version="chatbox"
              ref={messageRef}
            ></ConversationMessage>
          </div>
          <div className={clsx(bem('content-bottom'))}>
            <Input
              ref={inputRef}
              className={clsx(bem('content-input'))}
              placeholder="Ask a question..."
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
                <BsFillArrowUpCircleFill
                  onClick={() => sendMessage()}
                  style={{
                    color: 'var(--sq-gray300)',
                    fontSize: 32,
                  }}
                ></BsFillArrowUpCircleFill>
              }
            ></Input>
            <Typography variant="small" type="secondary">
              This AI App is powered by the{' '}
              <Typography.Link variant="small" underline href="https://academy.subquery.network/ai/welcome.html">
                SubQuery Network AI App Framework
              </Typography.Link>
            </Typography>
          </div>
        </div>
      }
    >
      <div className={clsx(bem({ open: popoverOpen ? true : undefined }))}>
        <ChatBoxIcon className={clsx(bem('close-icon'))}></ChatBoxIcon>
        <SlArrowDown className={clsx(bem('open-icon'))} />
      </div>
    </Popover>
  );
};