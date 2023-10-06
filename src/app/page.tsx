"use client";

import { useMemo } from "react";
import { Viewport } from "./components/viewport";
import { Whiteboard } from "./components/whiteboard";
import { nanoid } from "nanoid";

const BACKGROUND_COLOURS = ['#fca5a5', '#fb923c', '#fde047', '#bef264', '#6ee7b7', '#7dd3fc', '#d8b4fe']

function randomHexColour() {
  return BACKGROUND_COLOURS[Math.floor(Math.random() * BACKGROUND_COLOURS.length)];
}

export default function Home() {

  const MEMOs = useMemo(() => Array(10000).fill(0).map(() => ({
    id: nanoid(),
    x: Math.random() * 10000,
    y: Math.random() * 10000,
    bgColour: randomHexColour()
  })), []);

  return (
    <Viewport
      render={(viewportArgs) => (
        <Whiteboard
          MEMOs={MEMOs}
          {...viewportArgs}
        />
      )}
    />
  )
}
