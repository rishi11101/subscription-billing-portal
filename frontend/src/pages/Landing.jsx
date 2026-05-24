import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
    const navigate = useNavigate();

    const { user } = useAuth();
    if (user) return <Navigate to="/dashboard" replace />;

    return (

        <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/10 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
                <div className="text-2xl font-black tracking-tighter">
                    Plan<span className="text-emerald-500">Vault</span>
                </div>
                <div className="flex gap-3 sm:gap-4">
                    <button 
                        onClick={() => navigate('/login')} 
                        className="px-4 py-2 text-sm font-medium text-zinc-300 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Log in
                    </button>
                    <button 
                        onClick={() => navigate('/register')} 
                        className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
                    >
                        Get started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative text-center px-6 pt-24 pb-20 overflow-hidden">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-8">
                        <span className="animate-pulse">✦</span> Simple, transparent pricing
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1] mb-6">
                        Subscribe smarter.<br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-600">
                            Pay less. Do more.
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Pick a plan that fits your needs. Upgrade anytime and unlock powerful features instantly
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                            onClick={() => navigate('/register')} 
                            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] text-base"
                        >
                            Get started free
                        </button>
                        <button 
                            onClick={() => navigate('/login')} 
                            className="w-full sm:w-auto px-8 py-3.5 border border-white/10 text-zinc-300 font-semibold rounded-lg hover:bg-white/5 hover:text-white transition-colors text-base"
                        >
                            View dashboard
                        </button>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="px-6 py-20 border-t border-white/5 bg-zinc-950">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-3">Plans and pricing</h2>
                    <p className="text-zinc-400 text-lg">Start free. Upgrade when you're ready.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {/* Free Plan */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
                        <h3 className="text-2xl font-black text-white mb-2">Free</h3>
                        <p className="text-sm text-zinc-400 mb-6 h-10">For individuals just getting started.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white tracking-tighter">₹0</span>
                            <span className="text-sm text-zinc-500"> / month</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {['Basic dashboard access', 'Up to 3 projects', 'Community support', '1 GB storage'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                                    <span className="text-emerald-500 font-bold shrink-0">✓</span>{f}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => navigate('/register')} 
                            className="w-full py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm mt-auto"
                        >
                            Get started free
                        </button>
                    </div>

                    {/* Basic Plan */}
                    <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl p-8 flex flex-col relative shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] scale-100 md:scale-105 z-10">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-emerald-600 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                            ⭐ Most Popular
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">Basic</h3>
                        <p className="text-sm text-zinc-400 mb-6 h-10">For growing teams and professionals.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white tracking-tighter">₹299</span>
                            <span className="text-sm text-zinc-500"> / month</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {['Everything in Free', 'Analytics dashboard', 'Unlimited projects', '10 GB storage', 'Email support'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                                    <span className="text-emerald-500 font-bold shrink-0">✓</span>{f}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => navigate('/register')} 
                            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-colors text-sm mt-auto shadow-lg shadow-emerald-900/50"
                        >
                            Upgrade to Basic
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-colors">
                        <h3 className="text-2xl font-black text-white mb-2">Pro</h3>
                        <p className="text-sm text-zinc-400 mb-6 h-10">For scaling businesses and power users.</p>
                        <div className="mb-8">
                            <span className="text-5xl font-black text-white tracking-tighter">₹799</span>
                            <span className="text-sm text-zinc-500"> / month</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {['Everything in Basic', 'Priority support', 'Advanced analytics', 'Unlimited storage', 'Pro member badge'].map(f => (
                                <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                                    <span className="text-emerald-500 font-bold shrink-0">✓</span>{f}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => navigate('/register')} 
                            className="w-full py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm mt-auto"
                        >
                            Upgrade to Pro
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}