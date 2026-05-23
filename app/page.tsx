"use client";

import { useState } from "react";
import { CommentPopup } from "./CommentPopup";

export default function Page() {
  const [isOpen, setOpen] = useState(false);

  return (
    <main>
      <button type="button" onClick={() => setOpen((open) => !open)}>
        {isOpen ? "Close" : "Open"}
      </button>
      <CommentPopup open={isOpen} />
    </main>
  );
}
