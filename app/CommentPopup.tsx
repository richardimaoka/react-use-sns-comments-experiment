"use client";

import { Suspense } from "react";
import { CommentList } from "./CommentList";

type CommentPopupProps = {
  open: boolean;
};

export function CommentPopup({ open }: CommentPopupProps) {
  if (!open) {
    return null;
  }

  return (
    <dialog open>
      <Suspense fallback={<p>Loading comments…</p>}>
        <CommentList />
      </Suspense>
    </dialog>
  );
}
