import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import axios from 'axios';
import InputItem, { InputItemRef } from '../components/InputItem';
import { useConfig } from '../context/ConfigContext';

interface InputItemType {
    id: number;
    content: string;
    type: number; // Add type to determine whether it is a normal textarea or H2
}

function Editor() {
    const [inputItems, setInputItems] = useState<InputItemType[]>([{ id: 1, content: '', type: 0 }]);
    const [title, setTitle] = useState<string>('');
    const [errors, setErrors] = useState<string | null>(null);
    const inputRefs = useRef<(InputItemRef | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current.length > 0) {
            inputRefs.current[inputRefs.current.length - 1]?.focus();
        }
    }, [inputItems]);

    const { config } = useConfig();

    const validateForm = () => {
        const hasNonEmptyItem = inputItems.some(item => item.content.trim() !== '');
        if (!title.trim()) {
            setErrors('Title is required.');
            return false;
        }
        if (!hasNonEmptyItem) {
            setErrors('At least one non-empty item is required.');
            return false;
        }
        setErrors(null);
        return true;
    };

    const savePost = async () => {
        if (!validateForm()) return;

        const postData = {
            title,
            data: inputItems.map(item => ({
                type: item.type, 
                data: item.content
            }))
        };

        try {
            await axios.post(`${config.apiUrl}/editor/api/posts`, postData);
            window.location.href = config.apiUrl;
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputItems[index].content.startsWith('/h2 ')) {
                setInputItems(prev => [
                    ...prev.slice(0, index + 1),
                    { id: prev.length + 1, content: '', type: 0 },
                    ...prev.slice(index + 1)
                ]);
                setTimeout(() => inputRefs.current[index + 1]?.focus(), 0);
            } else {
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
            {errors && <div className="text-red-500 mt-4">{errors}</div>}
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
