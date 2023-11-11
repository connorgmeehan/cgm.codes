import clsx from "clsx";
import { type JSX } from "solid-js";
import { Portal } from "solid-js/web";

type OverlayProps = {
    class?: string,
    onClose: () => void,
    children: JSX.Element,
}
export function Overlay(props: OverlayProps) {
    const handleClick = () => {
        props.onClose();
    }
    const stopPropagation = (e: MouseEvent) => {
        e.stopPropagation();
    }

    return <Portal>
        <div class={clsx("flex fixed inset-0 flex-col justify-center items-center bg-black bg-opacity-50", props.class)} onClick={handleClick}>
            <div onClick={stopPropagation}>
                {props.children}
            </div>
        </div>
    </Portal>;
}
