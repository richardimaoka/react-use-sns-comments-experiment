export type Comment = {
  id: string;
  author: string;
  body: string;
};

let cache: Promise<Comment[]> | null = null;

async function loadComments(): Promise<Comment[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: "1", author: "alice", body: "Nice post!" },
    { id: "2", author: "bob", body: "Thanks for sharing." },
    { id: "3", author: "carol", body: "Following this thread." },
  ];
}

export function fetchComments(): Promise<Comment[]> {
  if (!cache) {
    cache = loadComments();
  }
  return cache;
}
