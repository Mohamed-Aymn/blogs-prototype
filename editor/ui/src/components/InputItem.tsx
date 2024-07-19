import { forwardRef, KeyboardEvent, ChangeEvent } from 'react';
import H2Item from './H2Item'; // Import the H2Item component

interface InputItemProps {
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    content: string;
    setContent: (value: string) => void;
    type: number; // Add type to handle content differently based on type
}

export type InputItemRef = HTMLTextAreaElement;

const InputItem = forwardRef<InputItemRef, InputItemProps>(({ onKeyDown, content, setContent, type }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    if (type === 1) {
        // Render H2Item if the type is 1
        return (
            <H2Item
                content={content.slice(4)} // Remove '/h2 ' prefix
                onChange={(value: string) => setContent(`/h2 ${value}`)} // Add '/h2 ' prefix back
                onKeyDown={onKeyDown}
                ref={ref}
            />
        );
    } else {
        // Render a textarea if the type is 0
        return (
            <textarea
                className="item w-full border-0 outline-none resize-none hover:bg-gray-100 px-2 py-1 transition-all"
                placeholder="Type here!"
                onKeyDown={onKeyDown}
                onChange={handleChange}
                value={content}
                ref={ref}
            />
        );
    }
});

export default InputItem;
