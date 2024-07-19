import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputItem, { InputItemRef } from "../components/InputItem";

interface InputItemType {
    id: number;
}

function Editor() {
    const [inputItems, setInputItems] = useState<InputItemType[]>([{ id: 1 }]);
    const inputRefs = useRef<(InputItemRef | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current.length > 0) {
            inputRefs.current[inputRefs.current.length - 1]?.focus();
        }
    }, [inputItems]);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>, index: number) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setInputItems(prev => [...prev, { id: prev.length + 1 }]);
        } else if (e.key === 'Backspace' && e.currentTarget.value === '' && inputItems.length > 1) {
            e.preventDefault();
            const newInputItems = inputItems.filter((_, i) => i !== index);
            setInputItems(newInputItems);
            inputRefs.current = inputRefs.current.filter((_, i) => i !== index);
            // Focus the previous input
            const previousIndex = index > 0 ? index - 1 : 0;
            inputRefs.current[previousIndex]?.focus();
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow w-full">
                <div className="mx-auto px-6 max-w-[85rem]">
                    <input className="text-4xl border-0 outline-none py-1 w-full" placeholder="Blog Title" />
                    <div id="content" className="mt-10">
                        {inputItems.map((item, index) => (
                            <InputItem
                                key={item.id}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={el => inputRefs.current[index] = el}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Editor;
