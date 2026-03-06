import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Expense, ExpenseContextType } from '../types';
import { useAuth } from './AuthContext';


export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [income, setIncome] = useState<number>(0);
    const [initialBalance, setInitialBalance] = useState<number>(0);
    const [isProfileSet, setIsProfileSet] = useState<boolean>(false);
    const api = import.meta.env.VITE_API_URL;

    // Fetch data when user changes
    useEffect(() => {
        if (user && user.id) {
            fetchExpenses();
            fetchUserProfile();
        } else {
            setExpenses([]);
            setIncome(0);
            setInitialBalance(0);
            setIsProfileSet(false);
        }
    }, [user]);

    const fetchExpenses = async () => {
        if (!user?.id) return;
        try {
            const res = await fetch(`${api}/api/expenses/${user.id}`);
            if (res.ok) {
                const data = await res.json();
                // Map _id to id
                const mappedExpenses = data.map((e: any) => ({ ...e, id: e._id }));
                setExpenses(mappedExpenses);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    const fetchUserProfile = async () => {
        if (!user?.id) return;
        try {
            const res = await fetch(`${api}/api/user/${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setIncome(data.income);
                setInitialBalance(data.initialBalance);
                // Assume profile is set if we get data back, or check specific fields
                // For now, let's say if income or balance is non-zero or just by virtue of existing
                setIsProfileSet(true);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    const addExpense = async (expense: Omit<Expense, 'id'>) => {
        if (!user?.id) return;
        try {
            const res = await fetch(`${api}/api/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...expense, userId: user.id }),
            });
            if (res.ok) {
                const newExpense = await res.json();
                setExpenses(prev => [{ ...newExpense, id: newExpense._id }, ...prev]);
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            const res = await fetch(`${api}/api/expenses/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setExpenses(prev => prev.filter(e => e.id !== id));
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalBalance = initialBalance + income - totalExpenses;

    const setFinancialProfile = async (newIncome: number, newBalance: number) => {
        if (!user?.id) return;
        try {
            const res = await fetch(`${api}/api/user/${user.id}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ income: newIncome, initialBalance: newBalance }),
            });
            if (res.ok) {
                setIncome(newIncome);
                setInitialBalance(newBalance);
                setIsProfileSet(true);
            }
        } catch (error) {
            console.error("Error setting profile:", error);
        }
    };

    const updateIncome = async (newIncome: number) => {
        if (!user?.id) return;
        // reuse setFinancialProfile logic or call API directly
        try {
            const res = await fetch(`${api}/api/user/${user.id}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ income: newIncome }),
            });
            if (res.ok) {
                setIncome(newIncome);
            }
        } catch (error) {
            console.error("Error updating income:", error);
        }
    };

    const updateTotalBalance = async (newTotalBalance: number) => {
        if (!user?.id) return;
        // newTotalBalance = initialBalance + income - totalExpenses
        // initialBalance = newTotalBalance - income + totalExpenses
        const newInitialBalance = newTotalBalance - income + totalExpenses;

        try {
            const res = await fetch(`${api}/api/user/${user.id}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ initialBalance: newInitialBalance }),
            });
            if (res.ok) {
                setInitialBalance(newInitialBalance);
            }
        } catch (error) {
            console.error("Error updating balance:", error);
        }
    };

    return (
        <ExpenseContext.Provider value={{
            expenses,
            addExpense,
            deleteExpense,
            totalBalance,
            totalIncome: income,
            totalExpenses,
            setFinancialProfile,
            isProfileSet,
            updateIncome,
            updateTotalBalance
        }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenses = () => {
    const context = useContext(ExpenseContext);
    if (context === undefined) {
        throw new Error('useExpenses must be used within an ExpenseProvider');
    }
    return context;
};
