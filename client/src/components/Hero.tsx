import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
    const navigate = useNavigate();
    

    const handleViewDemo = () => {
        navigate('/demo');
    };

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    {/* Badge removed */}

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        Master your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 animate-gradient">
                            finances
                        </span> with ease
                    </h1>

                    <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                        Track expenses, set budgets, and gain insights into your spending habits.
                        Experience the future of personal finance management today.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Button size="lg" className="group" onClick={() => navigate('/signup')}>
                            Start for free
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="secondary" size="lg" onClick={handleViewDemo}>
                            View Demo
                        </Button>
                    </div>

                    {/* Security and Sync indicators removed */}
                </div>

                {/* Visual / Mockup */}
                <div className="relative lg:h-[600px] flex items-center justify-center">
                    <div className="relative w-full max-w-md aspect-[4/5] bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/10 backdrop-blur-xl p-6 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                        {/* Mockup Content */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-sm text-zinc-400">Total Balance</p>
                                <p className="text-3xl font-bold text-white">$12,450.00</p>
                            </div>
                            <div className="bg-indigo-500/20 p-2 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-indigo-400" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 opacity-80" />
                                        <div>
                                            <div className="w-24 h-4 bg-white/10 rounded mb-2" />
                                            <div className="w-16 h-3 bg-white/5 rounded" />
                                        </div>
                                    </div>
                                    <div className="w-16 h-6 bg-white/10 rounded" />
                                </div>
                            ))}
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-10 -right-10 bg-[#1a1a1a] p-4 rounded-2xl border border-white/10 shadow-xl w-48">
                            <p className="text-xs text-zinc-400 mb-2">Monthly Savings</p>
                            <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                                <div className="bg-indigo-500 h-2 rounded-full w-[75%]" />
                            </div>
                            <p className="text-right text-xs text-indigo-400">75% of goal</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
