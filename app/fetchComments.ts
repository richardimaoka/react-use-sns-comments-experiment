export type Comment = {
  id: string;
  author: string;
  body: string;
};

export type CommentsPage = {
  comments: Comment[];
  nextCursor: string | null;
};

const commentsByVideo: Record<string, Record<string, CommentsPage>> = {
  "video-1": {
    "": {
      comments: [
        { id: "1", author: "alice", body: "Nice post!" },
        { id: "2", author: "bob", body: "Thanks for sharing." },
        { id: "3", author: "carol", body: "Following this thread." },
      ],
      nextCursor: "page-2",
    },
    "page-2": {
      comments: [
        { id: "4", author: "dave", body: "Great discussion." },
        { id: "5", author: "eve", body: "Adding my two cents." },
      ],
      nextCursor: "page-3",
    },
    "page-3": {
      comments: [
        { id: "6", author: "frank", body: "This helped a lot." },
        { id: "7", author: "grace", body: "Bookmarking for later." },
      ],
      nextCursor: "page-4",
    },
    "page-4": {
      comments: [
        { id: "8", author: "henry", body: "Could not agree more." },
        { id: "9", author: "iris", body: "One more thought on this." },
      ],
      nextCursor: "page-5",
    },
    "page-5": {
      comments: [
        { id: "10", author: "jack", body: "Wrapping up the thread." },
        { id: "11", author: "kate", body: "Thanks everyone!" },
      ],
      nextCursor: null,
    },
  },
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

const commentsByIdCache = new Map<string, Promise<CommentsPage>>();

function commentsByIdCacheKey(videoId: string, cursor: string | null) {
  return `${videoId}:${cursor ?? ""}`;
}

async function loadCommentsById(
  videoId: string,
  cursor: string | null,
): Promise<CommentsPage> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const commentsPage = commentsByVideo[videoId][cursor ?? ""]
  if (!commentsPage) {
    return {
      comments: [],
      nextCursor: null,
    }
  }

  return commentsPage;
}

export function fetchCommentsById(
  videoId: string,
  cursor: string | null = null,
): Promise<CommentsPage> {
  const key = commentsByIdCacheKey(videoId, cursor);

  if (!commentsByIdCache.has(key)) {
    commentsByIdCache.set(key, loadCommentsById(videoId, cursor));
  }

  return commentsByIdCache.get(key)!;
}
