export type Comment = {
  id: string;
  author: string;
  body: string;
};

const commentsByPage: Record<number, Comment[]> = {
  1: [
    { id: "1", author: "alice", body: "Nice post!" },
    { id: "2", author: "bob", body: "Thanks for sharing." },
    { id: "3", author: "carol", body: "Following this thread." },
  ],
  2: [
    { id: "4", author: "dave", body: "Great discussion." },
    { id: "5", author: "eve", body: "Adding my two cents." },
  ],
};

const cache = new Map<number, Promise<Comment[]>>();

async function loadComments(page: number): Promise<Comment[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return commentsByPage[page] ?? [];
}

export function fetchComments(page = 1): Promise<Comment[]> {
  if (!cache.has(page)) {
    cache.set(page, loadComments(page));
  }
  return cache.get(page)!;
}

export function hasMoreComments(page: number): boolean {
  return page + 1 in commentsByPage;
}
