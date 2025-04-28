import 'server-only';

import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import { generateUUID } from '../utils';

export async function createGuestUser() {
  const email = `guest-${Date.now()}`;
  const password = generateHashedPassword(generateUUID());

  try {
    const filePath = path.join(process.cwd(), 'public', 'users.json');
    let users: Array<any> = [];
    try {
      const file = await readFile(filePath, 'utf-8');
      users = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ空配列
      users = [];
    }

    const newUser = { id: generateUUID(), email, password };
    users.push(newUser);

    await writeFile(filePath, JSON.stringify(users, null, 2));
    return newUser;
  } catch (error) {
    console.error('Failed to create guest user in file');
    throw error;
  }
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'chats.json');
    let chats: Array<any> = [];
    try {
      const file = await readFile(filePath, 'utf-8');
      chats = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ空配列
      chats = [];
    }

    const newChat = { id, createdAt: new Date(), userId, title };
    chats.push(newChat);

    await writeFile(filePath, JSON.stringify(chats, null, 2));
    return newChat;
  } catch (error) {
    console.error('Failed to save chat in file');
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'chats.json');
    let chats: Array<any> = [];
    try {
      const file = await readFile(filePath, 'utf-8');
      chats = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ空配列
      chats = [];
    }

    const updatedChats = chats.filter((chat) => chat.id !== id);

    await writeFile(filePath, JSON.stringify(updatedChats, null, 2));
    return { id };
  } catch (error) {
    console.error('Failed to delete chat by id from file');
    throw error;
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'chats.json');
    let chats: Array<any> = [];
    try {
      const file = await readFile(filePath, 'utf-8');
      chats = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ空配列
      chats = [];
    }

    // startingAfter/endingBeforeによるページングは未実装（必要なら追加）
    const pagedChats = chats.slice(0, limit);
    const hasMore = chats.length > limit;
    return {
      chats: pagedChats,
      hasMore,
    };
  } catch (error) {
    console.error('Failed to get chats from file');
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'chats.json');
    let chats: Array<any> = [];
    try {
      const file = await readFile(filePath, 'utf-8');
      chats = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ空配列
      chats = [];
    }

    const selectedChat = chats.find((chat) => chat.id === id);
    return selectedChat;
  } catch (error) {
    console.error('Failed to get chat by id from file');
    throw error;
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<any>;
}) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'messages.json');
    let existingMessages: Array<any> = [];
    try {
      const file = await readFile(filePath, 'utf-8');
      existingMessages = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ空配列
      existingMessages = [];
    }

    const newMessages = [...existingMessages, ...messages];

    await writeFile(filePath, JSON.stringify(newMessages, null, 2));
    return newMessages;
  } catch (error) {
    console.error('Failed to save messages in file', error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'messages.json');
    let messages: Array<any> = [];
    try {
      const file = await readFile(filePath, 'utf-8');
      messages = JSON.parse(file);
    } catch (e) {
      // ファイルがなければ空配列
      messages = [];
    }

    const chatMessages = messages.filter((message) => message.chatId === id);
    return chatMessages;
  } catch (error) {
    console.error('Failed to get messages by chat id from file', error);
    throw error;
  }
}
