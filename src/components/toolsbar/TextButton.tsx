import IconButton from "./IconButton";
import {Text} from "~/Icons";

export default function TextButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <IconButton isActive={isActive} onClick={onClick}>
      <Text color={isActive ? "white" : "black"} />
    </IconButton>
  );
}
