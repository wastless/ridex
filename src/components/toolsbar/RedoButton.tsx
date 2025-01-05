import IconButton from "./IconButton";
import {Redo} from "~/Icons";

export default function RedoButton({
                                       onClick,
                                       disabled,
                                   }: {
    onClick: () => void;
    disabled: boolean;
}) {
    return (
        <IconButton onClick={onClick} disabled={disabled}>
            <Redo color="black" />
        </IconButton>
    );
}