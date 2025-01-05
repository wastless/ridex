import IconButton from "./IconButton";
import {Pencil} from "~/Icons";

export default function PencilButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <IconButton isActive={isActive} onClick={onClick}>
      <Pencil color={isActive ? "white" : "black"} />
    </IconButton>
  );
}
