import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Button } from './ui/Button';
import { Wallet, DollarSign } from 'lucide-react';

export const FinancialProfileModal: React.FC = () => {
    const { setFinancialProfile } = useExpenses();
    const [income, setIncome] = useState('');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const incomeNum = parseFloat(income);
        const balanceNum = parseFloat(balance);

        if (isNaN(incomeNum) || isNaN(balanceNum)) {
            setError('Please enter valid numbers');
            return;
        }

        if (incomeNum < 0 || balanceNum < 0) {
            setError('Values cannot be negative');
            return;
        }

        setFinancialProfile(incomeNum, balanceNum);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-4">
                        <Wallet className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Setup Your Profile</h2>
                    <p className="text-zinc-400">
                        To get started, please enter your current financial details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                            Monthly Income / Budget
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">
                            Current Total Balance
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <Button className="w-full py-6 text-lg" type="submit">
                        Start Tracking
                    </Button>
                </form>
            </div>
        </div>
    );
};
