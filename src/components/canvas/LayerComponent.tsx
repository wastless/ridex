import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import { LayerType } from "~/types";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Text from "./Text";
import Path from "./Path";
import { colorToCss } from "~/utils";

const LayerComponent = memo(
  ({
    id,
    onLayerPointerDown,
  }: {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  }) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle onPointerDown={onLayerPointerDown} id={id} layer={layer} />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse onPointerDown={onLayerPointerDown} id={id} layer={layer} />
        );
      case LayerType.Path:
        return (
          <Path
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            points={layer.points}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={layer.stroke ? colorToCss(layer.stroke) : "#000"}
            opacity={layer.opacity}
          />
        );
      case LayerType.Text:
        return (
          <Text onPointerDown={onLayerPointerDown} id={id} layer={layer} />
        );
      default:
        return null;
    }
  },
);

LayerComponent.displayName = "LayerComponent";

export default LayerComponent;
