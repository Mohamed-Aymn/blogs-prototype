// H2Item.tsx
import { forwardRef, ChangeEvent, KeyboardEvent } from 'react';

interface H2ItemProps {
    content: string;
    onChange: (value: string) => void;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void; // Add onKeyDown prop
}

const H2Item = forwardRef<HTMLTextAreaElement, H2ItemProps>(({ content, onChange, onKeyDown }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    return (
        <textarea
            className="text-2xl font-semibold mt-4 w-full border-0 outline-none resize-none px-2 py-1 hover:bg-gray-100 transition-all"
            value={content}
            onChange={handleChange}
            onKeyDown={onKeyDown} // Attach onKeyDown handler
            ref={ref}
        />
    );
});

export default H2Item;
