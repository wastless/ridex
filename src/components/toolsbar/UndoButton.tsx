import IconButton from "./IconButton";
import {Undo} from "~/Icons";

export default function UndoButton({
                                       onClick,
                                       disabled,
                                   }: {
    onClick: () => void;
    disabled: boolean;
}) {
    return (
        <IconButton onClick={onClick} disabled={disabled}>
            <Undo color="black" />
        </IconButton>
    );
}