"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasMode } from "~/types";
import IconButton from "./IconButton";
import { Cursor, Chevronarrow, Hand, Optionenabled } from "~/Icons";

export default function SelectionButton({
  isActive,
  canvasMode,
  onClick,
}: {
  isActive: boolean;
  canvasMode: CanvasMode;
  onClick: (canvasMode: CanvasMode.None | CanvasMode.Dragging) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (canvasMode: CanvasMode.None | CanvasMode.Dragging) => {
    onClick(canvasMode);
    setIsOpen(false);
  };

  return (
    <div className="relative flex" ref={menuRef}>
      <IconButton isActive={isActive} onClick={() => onClick(CanvasMode.None)}>
        {canvasMode !== CanvasMode.None &&
          canvasMode !== CanvasMode.Dragging && (
            <Cursor color={isActive ? "white" : "black"} />
          )}
        {canvasMode === CanvasMode.None && (
          <Cursor color={isActive ? "white" : "black"} />
        )}
        {canvasMode === CanvasMode.Dragging && (
          <Hand color={isActive ? "white" : "black"} />
        )}
      </IconButton>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-0 rounded-radius-xs hover:bg-greyscale-50"
      >
        <Chevronarrow />
      </button>
      {isOpen && (
        <div className="gap-spacing-0 mt-1 absolute -left-1.5 -top-20 box-border flex min-w-[180px] flex-col rounded-radius-lg border-[1px] border-solid bg-greyscale-0 p-spacing-4">
          <button
            className={`flex w-full items-center gap-spacing-4 rounded-md px-spacing-8 py-1 text-xs-medium text-greyscale-800 hover:bg-greyscale-50 ${canvasMode === CanvasMode.None ? "" : ""}`}
            onClick={() => handleClick(CanvasMode.None)}
          >
            <span className="w-5 text-xs-medium">
              {canvasMode === CanvasMode.None && <Optionenabled />}
            </span>

            <Cursor size={20} color={"black"} />
            <span>Move</span>

            <span className="ml-auto text-xs-medium text-base-text-paragraph">
              V
            </span>
          </button>

          <button
              className={`flex w-full items-center gap-spacing-4 rounded-md px-spacing-8 py-1 text-xs-medium text-greyscale-800 hover:bg-greyscale-50 ${canvasMode === CanvasMode.Dragging ? "" : ""}`}
              onClick={() => handleClick(CanvasMode.Dragging)}
          >
            <span className="w-5 text-xs-medium">
              {canvasMode === CanvasMode.Dragging && <Optionenabled/>}
            </span>
            <Hand size={20} color={"black"}/>
            <span>Hand tool</span>

            <span className="ml-auto text-xs-medium text-base-text-paragraph">
              H
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
