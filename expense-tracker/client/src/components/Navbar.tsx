import React, { useState, useEffect } from 'react';
import { Wallet, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, signOut, user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    const isDashboard = location.pathname === '/dashboard';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#242424]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}>
                    <div className="bg-gradient-to-tr from-indigo-500 to-violet-500 p-2 rounded-lg">
                        <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        ExpenseTracker
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {!isAuthenticated && !isDashboard && (
                        <>
                            {/* Unused links removed */}
                        </>
                    )}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-zinc-400">Welcome, {user?.name}</span>
                                <Button variant="ghost" size="sm" onClick={handleSignOut}>Sign Out</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" onClick={() => navigate('/signin')}>Sign In</Button>
                                <Button size="sm" onClick={() => navigate('/signup')}>Get Started</Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-zinc-400 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#242424] border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl">
                    {!isAuthenticated && !isDashboard && (
                        <>
                            {/* Unused links removed */}
                        </>
                    )}
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm text-zinc-400">Welcome, {user?.name}</span>
                            <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>Sign Out</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/signin')}>Sign In</Button>
                            <Button className="w-full" onClick={() => navigate('/signup')}>Get Started</Button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};
