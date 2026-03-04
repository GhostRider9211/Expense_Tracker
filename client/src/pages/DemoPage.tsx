import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Dashboard } from '../components/Dashboard';
import { ExpenseForm } from '../components/ExpenseForm';
import type { Expense } from '../types';
import { ExpenseContext } from '../context/ExpenseContext';

// Mock Data
const mockExpenses: Expense[] = [
    { id: '1', description: 'Grocery Shopping', amount: 120.50, category: 'Food', date: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: '2', description: 'Uber Ride', amount: 25.00, category: 'Transport', date: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: new Date().toISOString() },
    { id: '4', description: 'Rent Payment', amount: 1200.00, category: 'Housing', date: new Date(Date.now() - 86400000 * 5).toISOString() },
];

const DemoExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
    const [income, setIncome] = useState(5000);
    const [initialBalance, setInitialBalance] = useState(2000);

    const addExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense = { ...expense, id: Math.random().toString() };
        setExpenses(prev => [newExpense, ...prev]);
    };

    const deleteExpense = (id: string) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalBalance = initialBalance + income - totalExpenses;

    return (
        <ExpenseContext.Provider value={{
            expenses,
            addExpense,
            deleteExpense,
            totalBalance,
            totalIncome: income,
            totalExpenses,
            setFinancialProfile: () => { },
            isProfileSet: true,
            updateIncome: (val: number) => setIncome(val),
            updateTotalBalance: (val: number) => setInitialBalance(val)
        }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const DemoPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <DemoExpenseProvider>
            <Navbar />
            <main>
                <div className="bg-indigo-600/20 text-center py-2 text-indigo-200 text-sm">
                    Demo Mode - Data will not be saved
                </div>
                <Dashboard onAddExpense={() => setShowForm(true)} />
            </main>
            {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
        </DemoExpenseProvider>
    );
};
