import IconButton from "./IconButton";
import { Glass_Plus } from "~/Icons";

export default function ZoomInButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <Glass_Plus color="black" />
    </IconButton>
  );
}
