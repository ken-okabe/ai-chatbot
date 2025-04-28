'use server';

const getSuggestionsByDocumentId = async ({ documentId }: { documentId: string }) => {
  return [];
};

export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return suggestions ?? [];
}
