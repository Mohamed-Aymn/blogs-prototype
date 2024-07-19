import { forwardRef, KeyboardEvent } from 'react';

interface InputItemProps {
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export type InputItemRef = HTMLTextAreaElement;

const InputItem = forwardRef<InputItemRef, InputItemProps>(({ onKeyDown }, ref) => {
    return (
        <div className="relative group">
            <svg
                className="absolute -left-5 top-[0.1em] size-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
                <path d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
            <textarea
                className="item w-full border-0 outline-none resize-none"
                placeholder="Type here!"
                onKeyDown={onKeyDown}
                ref={ref}
            />
        </div>
    );
});

export default InputItem;
