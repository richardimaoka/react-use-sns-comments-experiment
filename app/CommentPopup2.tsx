"use client";

import {
  Suspense,
  use,
  useState,
  useTransition
} from "react";
import { fetchCommentsById } from "./fetchComments";

type CommentPopup2Props = {
  open: boolean;
  videoId: string;
};


function CommentList({ videoId }: { videoId: string }) {
  const initialComments = use(fetchCommentsById(videoId));
  const [commentState, setComments] = useState(initialComments);
  const nextCursor = initialComments.nextCursor

  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    if (!nextCursor) {
      return;
    }

    startTransition(async () => {
      const nextPage = await fetchCommentsById(videoId, nextCursor);
      const newComments = { comments: [...commentState.comments, ...nextPage.comments], nextCursor: nextPage.nextCursor };

      // React currently requires wrapping any set functions after the await in an additional startTransition
      // https://react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-after-await-as-a-transition
      startTransition(() => {
        setComments(newComments);
      });
    });
  };

  return (
    <>
      <ul>
        {commentState.comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author}</strong>: {comment.body}
          </li>
        ))}
      </ul>
      {nextCursor !== null && (
        <button type="button" disabled={isPending} onClick={loadMore}>
          {isPending ? "Loading more…" : "Load more"}
        </button>
      )}
    </>
  );
}

export function CommentPopup2({ open, videoId }: CommentPopup2Props) {
  if (!open) {
    return null;
  }

  return (
    <dialog open>
      <Suspense fallback={<p>Loading comments…</p>}>
        <CommentList videoId={videoId} />
      </Suspense>
    </dialog>
  );
}
