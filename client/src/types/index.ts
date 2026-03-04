export type Category = 'Food' | 'Transport' | 'Housing' | 'Utilities' | 'Entertainment' | 'Health' | 'Shopping' | 'Other';

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: Category;
    date: string; // ISO string
}

export interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Omit<Expense, 'id'>) => void;
    deleteExpense: (id: string) => void;
    totalBalance: number;
    totalIncome: number; // For now we might just track expenses, but good to have
    totalExpenses: number;
    setFinancialProfile: (income: number, balance: number) => void;
    isProfileSet: boolean;
    updateIncome: (income: number) => void;
    updateTotalBalance: (balance: number) => void;
}
