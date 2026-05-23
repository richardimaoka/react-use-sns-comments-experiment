"use client";

import { useState } from "react";
import { CommentPopup2 } from "./CommentPopup2";

export default function Page() {
  const [isOpen, setOpen] = useState(false);

  return (
    <main>
      <button type="button" onClick={() => setOpen((open) => !open)}>
        {isOpen ? "Close" : "Open"}
      </button>
      <CommentPopup2 open={isOpen} videoId="video-1" />
    </main>
  );
}
