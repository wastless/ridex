import IconButton from "./IconButton";
import { Glass_Minus } from "~/Icons";

export default function ZoomOutButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <Glass_Minus color="black" />
    </IconButton>
  );
}
