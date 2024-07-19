import { forwardRef, KeyboardEvent } from 'react';
import H2Item from './H2Item'; // Import the H2Item component

interface InputItemProps {
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
    content: string; // Add a content prop to manage the current value
    setContent: (value: string) => void; // Add a setContent function to manage the content
}

export type InputItemRef = HTMLTextAreaElement;

const InputItem = forwardRef<InputItemRef, InputItemProps>(({ onKeyDown, content, setContent }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    // Check if content starts with '/h2' and has no other text
    const isH2 = content.startsWith('/h2 ') && content.length > 4;

    if (isH2) {
        // Pass the onChange and onKeyDown handlers to H2Item
        return (
            <H2Item
                content={content.slice(4)} // Remove '/h2 ' prefix
                onChange={(value: string) => setContent(`/h2 ${value}`)} // Add '/h2 ' prefix back
                onKeyDown={onKeyDown} // Handle key down for H2Item
                ref={ref} // Pass ref to H2Item
            />
        );
    } else {
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
