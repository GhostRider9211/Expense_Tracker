import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { Button } from './ui/Button';
import { Plus, TrendingUp, TrendingDown, DollarSign, Trash2, Pencil, Check, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#64748b'];

export const Dashboard: React.FC<{ onAddExpense: () => void }> = ({ onAddExpense }) => {
    const { expenses, totalBalance, totalIncome, totalExpenses, deleteExpense, updateIncome } = useExpenses();
    const [editingIncome, setEditingIncome] = React.useState(false);
    const [tempIncome, setTempIncome] = React.useState('');

    const startEditingIncome = () => {
        setTempIncome(totalIncome.toFixed(2));
        setEditingIncome(true);
    };

    const saveIncome = () => {
        const val = parseFloat(tempIncome);
        if (!isNaN(val) && val >= 0) {
            updateIncome(val);
        }
        setEditingIncome(false);
    };

    // Prepare data for charts
    const categoryData = expenses.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.category);
        if (existing) {
            existing.value += curr.amount;
        } else {
            acc.push({ name: curr.category, value: curr.amount });
        }
        return acc;
    }, [] as { name: string; value: number }[]);

    return (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                    <p className="text-zinc-400">Overview of your financial health</p>
                </div>
                <Button onClick={onAddExpense}>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Expense
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-24 h-24 text-indigo-500" />
                    </div>
                    <p className="text-zinc-400 text-sm mb-1">Total Balance</p>
                    <h3 className="text-3xl font-bold text-white">${totalBalance.toFixed(2)}</h3>
                    {/* <div className="mt-4 flex items-center text-sm text-emerald-400">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>+2.5% from last month</span>
                    </div> */}
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-24 h-24 text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-start mb-1 relative z-10">
                        <p className="text-zinc-400 text-sm">Total Income</p>
                        {!editingIncome && (
                            <button onClick={startEditingIncome} className="text-zinc-500 hover:text-white transition-colors">
                                <Pencil className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {editingIncome ? (
                        <div className="flex items-center gap-2 relative z-10">
                            <input
                                type="number"
                                value={tempIncome}
                                onChange={(e) => setTempIncome(e.target.value)}
                                className="bg-black/20 border border-white/10 rounded px-2 py-1 text-2xl font-bold text-white w-full focus:outline-none focus:border-emerald-500"
                                autoFocus
                            />
                            <button onClick={saveIncome} className="p-1 hover:bg-emerald-500/20 rounded text-emerald-500">
                                <Check className="w-5 h-5" />
                            </button>
                            <button onClick={() => setEditingIncome(false)} className="p-1 hover:bg-rose-500/20 rounded text-rose-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <h3 className="text-3xl font-bold text-white relative z-10">${totalIncome.toFixed(2)}</h3>
                    )}

                    <div className="mt-4 flex items-center text-sm text-zinc-500 relative z-10">
                        <span>Monthly budget</span>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingDown className="w-24 h-24 text-rose-500" />
                    </div>
                    <p className="text-zinc-400 text-sm mb-1">Total Expenses</p>
                    <h3 className="text-3xl font-bold text-white">${totalExpenses.toFixed(2)}</h3>
                    {/* <div className="mt-4 flex items-center text-sm text-rose-400">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        <span>-12% from last month</span>
                    </div> */}
                </div>
            </div>


            {/* Charts & Recent Transactions */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Spending by Category Chart */}
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6">Spending by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {expenses.length === 0 ? (
                            <p className="text-zinc-500 text-center py-8">No transactions yet.</p>
                        ) : (
                            expenses.map((expense) => (
                                <div key={expense.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 text-indigo-400`}>
                                            <DollarSign className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{expense.description}</p>
                                            <p className="text-xs text-zinc-400">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-white">-${expense.amount.toFixed(2)}</span>
                                        <button
                                            onClick={() => deleteExpense(expense.id)}
                                            className="text-zinc-500 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};
