import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface DefaultProps {
    children: React.ReactNode;
}

const Default: React.FC<DefaultProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow w-full">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Default;
