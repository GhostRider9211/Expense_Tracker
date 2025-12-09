import React, { createContext, useContext, useState } from 'react';

interface User {
    id: string; // MongoDB _id
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (email: string, name?: string) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const signIn = async (email: string, name?: string) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name }),
            });

            if (!res.ok) {
                throw new Error('Login failed');
            }

            const data = await res.json();
            // Map MongoDB _id to id if needed, or just keep the object
            const newUser = { ...data, id: data._id };

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            console.error("Login error:", error);
            // Fallback for demo/offline if needed, or just alert
            alert("Failed to login. Ensure backend is running.");
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
