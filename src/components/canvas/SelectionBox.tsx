import { useSelf, useStorage } from "@liveblocks/react";
import { memo, useEffect, useRef, useState } from "react";
import useSelectionBounds from "~/hooks/useSelectionBounds";
import { LayerType, Side, XYWH } from "~/types";

const handleWidth = 8;

const SelectionBox = memo(
  ({
    onResizeHandlePointerDown,
  }: {
    onResizeHandlePointerDown: (corner: Side, initalBuild: XYWH) => void;
  }) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null,
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path,
    );

    const bounds = useSelectionBounds();
    const textRef = useRef<SVGTextElement>(null);
    const [textWidth, setTextWidth] = useState(0);
    const padding = 8;


    useEffect(() => {
      if (textRef.current) {
        const bbox = textRef.current.getBBox();
        setTextWidth(bbox.width);
      }
    }, [bounds]);

    if (!bounds) return null;

    return (
      <>
        <rect
          style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
          className="pointer-events-none fill-transparent stroke-primary-200 stroke-[1px]"
          width={bounds.width}
          height={bounds.height}
        />
        <rect
          className="fill-primary-200"
          x={bounds.x + bounds.width / 2 - (textWidth + padding) / 2}
          y={bounds.y + bounds.height + 10}
          width={textWidth + padding}
          height={20}
          rx={2}
        />
        <text
          ref={textRef}
          style={{
            transform: `translate(${bounds.x + bounds.width / 2}px, ${bounds.y + bounds.height + 25}px)`,
          }}
          textAnchor="middle"
          className="pointer-events-none select-none fill-base-white text-xs-regular"
        >
          {Math.round(bounds.width)} × {Math.round(bounds.height)}
        </text>
        {isShowingHandles && (
          <>
            <rect
              style={{
                cursor: "nwse-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x - handleWidth / 2}px, ${bounds.y - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-primary-200 stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
              }}
            />
            <rect
              style={{
                cursor: "nesw-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-primary-200 stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
              }}
            />
            <rect
              style={{
                cursor: "nesw-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-primary-200 stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
              }}
            />
            <rect
              style={{
                cursor: "nwse-resize",
                width: `${handleWidth}px`,
                height: `${handleWidth}px`,
                transform: `translate(${bounds.x + bounds.width - handleWidth / 2}px, ${bounds.y + bounds.height - handleWidth / 2}px)`,
              }}
              className="fill-white stroke-primary-200 stroke-[1px]"
              onPointerDown={(e) => {
                e.stopPropagation();
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
              }}
            />
          </>
        )}
      </>
    );
  },
);

SelectionBox.displayName = "SelectionBox";
export default SelectionBox;
