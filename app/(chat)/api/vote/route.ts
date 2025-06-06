import { getChatById } from '@/lib/db/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return new Response('chatId is required', { status: 400 });
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new Response('Chat not found', { status: 404 });
  }

  return Response.json(chat, { status: 200 });
}

export async function PATCH(request: Request) {
  const {
    chatId,
    messageId,
    type,
  }: { chatId: string; messageId: string; type: 'up' | 'down' } =
    await request.json();

  if (!chatId || !messageId || !type) {
    return new Response('messageId and type are required', { status: 400 });
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new Response('Chat not found', { status: 404 });
  }

  return new Response('Message voted', { status: 200 });
}
