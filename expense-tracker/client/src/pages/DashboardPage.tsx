import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Dashboard } from '../components/Dashboard';
import { ExpenseForm } from '../components/ExpenseForm';
import { FinancialProfileModal } from '../components/FinancialProfileModal';
import { useExpenses } from '../context/ExpenseContext';

export const DashboardPage: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const { isProfileSet } = useExpenses();

    return (
        <>
            <Navbar />
            <main>
                <Dashboard onAddExpense={() => setShowForm(true)} />
            </main>
            {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
            {!isProfileSet && <FinancialProfileModal />}
        </>
    );
};
