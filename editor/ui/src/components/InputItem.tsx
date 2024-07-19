import { forwardRef, KeyboardEvent } from 'react';

interface InputItemProps {
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export type InputItemRef = HTMLTextAreaElement;

const InputItem = forwardRef<InputItemRef, InputItemProps>(({ onKeyDown }, ref) => {
    return (
        <textarea
            className="item w-full border-0 outline-none resize-none hover:bg-gray-100 px-2 py-1 transition-all"
            placeholder="Type here!"
            onKeyDown={onKeyDown}
            ref={ref}
        />
    );
});

export default InputItem;
