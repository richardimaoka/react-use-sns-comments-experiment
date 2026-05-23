"use client";

import { use } from "react";
import { fetchComments } from "./fetchComments";

export function CommentList() {
  const comments = use(fetchComments());

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <strong>{comment.author}</strong>: {comment.body}
        </li>
      ))}
    </ul>
  );
}
