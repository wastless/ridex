import useSelectionBounds from "~/hooks/useSelectionBounds";
import { Camera, CanvasMode } from "~/types";
import { useMutation, useSelf } from "@liveblocks/react";
import { memo } from "react";

function SelectionTools({
  camera,
  canvasMode,
}: {
  camera: Camera;
  canvasMode: CanvasMode;
}) {
  const selection = useSelf((me) => me.presence.selection);

  const bringToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];

        if (element !== undefined && selection?.includes(element)) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        const element = indices[i];
        if (element !== undefined) {
          liveLayerIds.move(element, arr.length - 1 - (indices.length - 1 - i));
        }
      }
    },
    [selection],
  );

  const sendToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];

        if (element !== undefined && selection?.includes(element)) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        const element = indices[i];
        if (element !== undefined) {
          liveLayerIds.move(element, i);
        }
      }
    },
    [selection],
  );

  const selectionBounds = useSelectionBounds();
  if (!selectionBounds) {
    return null;
  }

  const x =
    (selectionBounds.width / 2 + selectionBounds.x) * camera.zoom + camera.x;
  const y = selectionBounds.y * camera.zoom + camera.y;

  if (canvasMode !== CanvasMode.RightClick) return null;

  return (
    <div
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 8}px - 100%))`,
      }}
      className="absolute box-border flex min-w-[210px] flex-col rounded-radius-sm border-[1px] border-solid border-greyscale-100 bg-greyscale-0 p-spacing-4 text-left"
    >
      <button
        onClick={bringToFront}
        className="flex w-full items-center justify-between rounded-radius-xs px-spacing-8 py-spacing-4 text-xs-medium text-greyscale-800 hover:bg-greyscale-50"
      >
        <span>Переместить вперед</span>
        <span className="ml-auto text-xs-medium text-base-text-paragraph">
          ]
        </span>
      </button>
      <button
        onClick={sendToBack}
        className="flex w-full items-center justify-between rounded-radius-xs px-spacing-8 py-spacing-4 text-xs-medium text-greyscale-800 hover:bg-greyscale-50"
      >
        <span>Переместить назад</span>
        <span className="ml-auto text-xs-medium text-base-text-paragraph">
          [
        </span>
      </button>
    </div>
  );
}

export default memo(SelectionTools);
