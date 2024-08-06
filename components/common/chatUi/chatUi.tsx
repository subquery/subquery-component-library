// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC, useEffect, useState } from 'react';
import './chatUi.less';
import { useBem } from 'components/utilities/useBem';
import clsx from 'clsx';
import { PiChatTextBold, PiPencilSimple, PiTrash } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa6';
import { FiPlusCircle, FiSend } from 'react-icons/fi';
import { Button, Input } from 'antd';
import localforage from 'localforage';
import { Typography } from '../typography';
import { v4 as uuidv4 } from 'uuid';

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

export type AiMessageRole = 'assistant' | 'user';

export interface Content {
  type: AiMessageType;
  text?: string;
  image_url?: string;
}

export interface Message {
  role: AiMessageRole;
  content: string | Content[];
}

export interface ConversationItemProps {
  property: {
    id: string;
    name: string;
    chatUrl: string;
    messages: Message[];
    prompt: string;
  };
  active?: boolean;
  onSelect?: () => void;
  onEdit?: (item: ConversationItemProps['property']) => void;
  onRemove?: (item: ConversationItemProps['property']) => void;
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

// maybe later support custom workspace name
const workspaceName = 'subql-chat-workspace';

export const ChatUi: FC<ChatUiProps> = ({ chatUrl, prompt, className, placeholder, width, height }) => {
  const bem = useBem('subql-chat');
  const [chats, setChats] = React.useState<ConversationItemProps['property'][]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationItemProps['property']>();

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
        <div className={clsx(bem('chat-placeholder'))}>
          {placeholder || (
            <div>
              <Typography>SubQuery Chat</Typography>
            </div>
          )}
        </div>

        <div className={clsx(bem('chat-input-group'))}>
          <Input
            className={clsx(bem('chat-input'))}
            placeholder="Ask anything"
            suffix={
              <div className={clsx(bem('chat-input-send'))}>
                <FiSend style={{ color: '#000', fontSize: 20 }}></FiSend>
              </div>
            }
          ></Input>
        </div>
      </div>
    </div>
  );
};
