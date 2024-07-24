import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';
import InputItem, { InputItemRef } from '../components/InputItem';

interface InputItemType {
    id: number;
    content: string;
    type: number; // Add type to determine whether it is a normal textarea or H2
}

function Editor() {
    const [inputItems, setInputItems] = useState<InputItemType[]>([{ id: 1, content: '', type: 0 }]);
    const [title, setTitle] = useState<string>('');
    const inputRefs = useRef<(InputItemRef | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current.length > 0) {
            inputRefs.current[inputRefs.current.length - 1]?.focus();
        }
    }, [inputItems]);

    const savePost = async () => {
        const postData = {
            title,
            data: inputItems.map(item => ({
                type: item.type, 
                data: item.content
            }))
        };

        try {
            await axios.post('http://localhost:3000/api/posts', postData);
            window.location.href = "http://localhost:8000";
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputItems[index].content.startsWith('/h2 ')) {
                // Insert a new InputItem after the H2Item
                setInputItems(prev => [
                    ...prev.slice(0, index + 1),
                    { id: prev.length + 1, content: '', type: 0 },
                    ...prev.slice(index + 1)
                ]);
                // Focus the newly added InputItem
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
            } else {
                // Handle Enter in normal InputItem case
                setInputItems(prev => [...prev, { id: prev.length + 1, content: '', type: 0 }]);
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
        setInputItems(prev => prev.map((item, i) => i === index ? { ...item, content: value, type: value.startsWith('/h2 ') ? 1 : 0 } : item));
    };

    return (
        <div className="mx-auto px-6 max-w-[85rem]">
            <input
                className="text-4xl border-0 outline-none py-1 w-full"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div id="content" className="mt-10">
                {inputItems.map((item, index) => (
                    <InputItem
                        key={item.id}
                        content={item.content}
                        setContent={(value) => handleContentChange(index, value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={el => inputRefs.current[index] = el}
                        type={item.type} // Pass type to InputItem
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
