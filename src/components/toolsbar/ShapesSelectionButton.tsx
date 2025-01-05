"use client";

import { useState, useRef, useEffect } from "react";
import { CanvasMode, CanvasState, LayerType } from "~/types";
import IconButton from "./IconButton";
import { Chevronarrow, Rectangle, Ellipse, Optionenabled } from "~/Icons";

export default function ShapesSelectionButton({
  isActive,
  canvasState,
  onClick,
}: {
  isActive: boolean;
  canvasState: CanvasState;
  onClick: (layerType: LayerType.Rectangle | LayerType.Ellipse) => void;
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

  const handleClick = (layerType: LayerType.Rectangle | LayerType.Ellipse) => {
    onClick(layerType);
    setIsOpen(false);
  };

  return (
    <div className="relative flex" ref={menuRef}>
      <IconButton
        isActive={isActive}
        onClick={() => onClick(LayerType.Rectangle)}
      >
        {canvasState.mode === CanvasMode.None && (
          <Rectangle color={isActive ? "white" : "black"} />
        )}
        {canvasState.mode !== CanvasMode.None &&
          canvasState.mode !== CanvasMode.Inserting && (
            <Rectangle color={isActive ? "white" : "black"} />
          )}
        {canvasState.mode === CanvasMode.Inserting &&
          (canvasState.layerType === LayerType.Rectangle ||
            canvasState.layerType === LayerType.Text) && (
            <Rectangle color={isActive ? "white" : "black"} />
          )}
        {canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Ellipse && (
            <Ellipse color={isActive ? "white" : "black"} />
          )}
      </IconButton>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-0 rounded-radius-xs hover:bg-greyscale-50"
      >
        <Chevronarrow />
      </button>

      {isOpen && (
        <div className="gap-spacing-0 mt-1 absolute -top-20 box-border flex min-w-[180px] flex-col rounded-radius-lg border-[1px] border-solid bg-greyscale-0 p-spacing-4">
          <button
            className={`flex w-full items-center gap-spacing-4 rounded-md px-spacing-8 py-1 text-xs-medium text-greyscale-800 hover:bg-greyscale-50 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle ? "" : ""}`}
            onClick={() => handleClick(LayerType.Rectangle)}
          >
            <span className="w-5 text-xs-medium">
              {canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Rectangle && (
                  <Optionenabled />
                )}
            </span>
            <Rectangle size={20} color={"black"} />
            <span>Rectangle</span>
            <span className="ml-auto text-xs-medium text-base-text-paragraph">
              R
            </span>
          </button>

          <button
            className={`flex w-full items-center gap-spacing-4 rounded-md px-spacing-8 py-1 text-xs-medium text-greyscale-800 hover:bg-greyscale-50 ${canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse ? "" : ""}`}
            onClick={() => handleClick(LayerType.Ellipse)}
          >
            <span className="w-5 text-xs-medium">
              {canvasState.mode === CanvasMode.Inserting &&
                canvasState.layerType === LayerType.Ellipse && (
                  <Optionenabled />
                )}
            </span>
            <Ellipse size={20} color={"black"} />
            <span>Ellipse</span>
            <span className="ml-auto text-xs-medium text-base-text-paragraph">
              E
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
