import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import InputItem, { InputItemRef } from '../components/InputItem';

interface InputItemType {
    id: number;
    content: string;
}

function Editor() {
    const [inputItems, setInputItems] = useState<InputItemType[]>([{ id: 1, content: '' }]);
    const inputRefs = useRef<(InputItemRef | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current.length > 0) {
            inputRefs.current[inputRefs.current.length - 1]?.focus();
        }
    }, [inputItems]);

    const savePost = () => {

    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputItems[index].content.startsWith('/h2 ')) {
                // Insert a new InputItem after the H2Item
                setInputItems(prev => [
                    ...prev.slice(0, index + 1),
                    { id: prev.length + 1, content: '' },
                    ...prev.slice(index + 1)
                ]);
                // Focus the newly added InputItem
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
            } else {
                // Handle Enter in normal InputItem case
                setInputItems(prev => [...prev, { id: prev.length + 1, content: '' }]);
            }
        } else if (e.key === 'Backspace' && e.currentTarget.value === '' && inputItems.length > 1) {
            e.preventDefault();
            const newInputItems = inputItems.filter((_, i) => i !== index);
            setInputItems(newInputItems);
            inputRefs.current = inputRefs.current.filter((_, i) => i !== index);
            const previousIndex = index > 0 ? index - 1 : 0;
            inputRefs.current[previousIndex]?.focus();
        }
    };

    const handleContentChange = (index: number, value: string) => {
        setInputItems(prev => prev.map((item, i) => i === index ? { ...item, content: value } : item));
    };

    return (
        <div className="mx-auto px-6 max-w-[85rem]">
            <input
                className="text-4xl border-0 outline-none py-1 w-full"
                placeholder="Blog Title"
            />
            <div id="content" className="mt-10">
                {inputItems.map((item, index) => (
                    <InputItem
                        key={item.id}
                        content={item.content}
                        setContent={(value) => handleContentChange(index, value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={el => inputRefs.current[index] = el}
                    />
                ))}
            </div>
            <div className='w-full flex justify-end'>
                <button 
                    onClick={() => savePost()}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        Save
                </button>
            </div>
        </div>
    );
}

export default Editor;
