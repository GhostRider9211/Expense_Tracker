import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
    const { user, signOut } = useAuth();

    React.useEffect(() => {
        if (user?.email === 'demo@expensetracker.com') {
            signOut();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
            </main>
        </>
    );
};
