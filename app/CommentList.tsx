"use client";

import { Suspense, use, useState } from "react";
import { fetchComments, hasMoreComments } from "./fetchComments";

function CommentPage({ page }: { page: number }) {
  const comments = use(fetchComments(page));

  return (
    <>
      {comments.map((comment) => (
        <li key={comment.id}>
          <strong>{comment.author}</strong>: {comment.body}
        </li>
      ))}
    </>
  );
}

export function CommentList() {
  const [pages, setPages] = useState([1]);
  const lastPage = pages[pages.length - 1];
  const canLoadMore = hasMoreComments(lastPage);

  return (
    <>
      <ul>
        {pages.map((page) => (
          <Suspense key={page} fallback={<li>Loading more…</li>}>
            <CommentPage page={page} />
          </Suspense>
        ))}
      </ul>
      {canLoadMore && (
        <button
          type="button"
          onClick={() => setPages((current) => [...current, current.length + 1])}
        >
          Load more
        </button>
      )}
    </>
  );
}
