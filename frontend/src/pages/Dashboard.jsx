import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const fakeStats = {
    free:  { projects: 2, storage: '0.4 GB', tasks: 12 },
    basic: { projects: 18, storage: '4.2 GB', tasks: 87 },
    pro:   { projects: 54, storage: '38 GB',  tasks: 310 },
};

function LockedSection({ children, requiredPlan, feature }) {
    return (
        <div className="relative rounded-2xl overflow-hidden">
            <div className="blur-sm pointer-events-none select-none">
                {children}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/60 backdrop-blur-sm">
                <p className="text-white font-bold text-sm mb-3">
                    🔒 Upgrade to <span className="capitalize text-emerald-400">{requiredPlan}</span> to unlock <span className="text-white">{feature}</span>
                </p>
                <a href="#upgrade" className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-500 transition-all">
                    Upgrade Now
                </a>
            </div>
        </div>
    );
}

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const plan = user?.plan || 'free';
    const stats = fakeStats[plan];

    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = {
        basic: { id: 2, name: 'Basic', price: 299, features: ['Everything in Free', 'Analytics dashboard', 'Unlimited projects', '10 GB storage', 'Email support'] },
        pro:   { id: 3, name: 'Pro',   price: 799, features: ['Everything in Basic', 'Priority support', 'Advanced analytics', 'Unlimited storage', 'Pro badge'] }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handlePayment = async () => {
        
        const response = await api.post('/payments/create-order',
            { plan_id: selectedPlan.id}
        );
        const order = response.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            order_id: order.id,
            amount: order.amount,
            currency: "INR",
            name: "PlanVault",
            description: `Upgrade to ${selectedPlan.name}`,
            handler: function(razorpayResponse) {
                api.post('/payments/verify', {
                    razorpay_order_id: razorpayResponse.razorpay_order_id,
                    razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                    razorpay_signature: razorpayResponse.razorpay_signature
                }).then(res => {
                    setSelectedPlan(null);
                    alert('🎉 Payment successful! Plan upgraded to ' + selectedPlan.name);
                    window.location.reload();
                }).catch(() => {
                    alert('Payment verification failed.');
                });
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
                <div className="text-xl font-black tracking-tight">
                    Plan<span className="text-emerald-500">Vault</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider
                        ${plan === 'pro' ? 'bg-purple-500/20 text-purple-400' :
                          plan === 'basic' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-zinc-700 text-zinc-400'}`}>
                        {plan}
                    </span>
                    <span className="text-sm text-zinc-400">{user?.name}</span>
                    <button onClick={handleLogout}
                        className="text-sm text-zinc-500 hover:text-white transition-colors">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

                {/* Welcome */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight">
                        Welcome back, {user?.name?.split(' ')[0]} 👋
                    </h1>
                    <p className="text-zinc-400 mt-1 text-sm">
                        You're on the <span className="text-emerald-400 font-semibold capitalize">{plan}</span> plan.
                        {plan !== 'pro' && (
                            <a href="#upgrade" className="ml-2 text-emerald-500 underline cursor-pointer hover:text-emerald-400">
                                Upgrade for more →
                            </a>
                        )}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Active Projects', value: stats.projects },
                        { label: 'Storage Used', value: stats.storage },
                        { label: 'Tasks Completed', value: stats.tasks },
                    ].map(s => (
                        <div key={s.label} className="bg-zinc-900 border border-white/10 rounded-2xl p-5">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{s.label}</p>
                            <p className="text-3xl font-black">{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Analytics */}
                {plan === 'basic' || plan === 'pro' ? (
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-lg font-bold mb-4">Analytics</h2>
                        <div className="space-y-3">
                            {[
                                { label: 'Page Views', value: 84, color: 'bg-emerald-500' },
                                { label: 'Signups', value: 62, color: 'bg-blue-500' },
                                { label: 'Conversions', value: 38, color: 'bg-purple-500' },
                            ].map(b => (
                                <div key={b.label}>
                                    <div className="flex justify-between text-sm text-zinc-400 mb-1">
                                        <span>{b.label}</span><span>{b.value}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 rounded-full h-2">
                                        <div className={`${b.color} h-2 rounded-full`}
                                            style={{ width: `${b.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <LockedSection requiredPlan="basic" feature="Analytics">
                        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-lg font-bold mb-4">Analytics</h2>
                            <div className="space-y-3">
                                {[84, 62, 38].map(v => (
                                    <div key={v}>
                                        <div className="w-full bg-zinc-800 rounded-full h-2">
                                            <div className="bg-zinc-600 h-2 rounded-full" style={{ width: `${v}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </LockedSection>
                )}

                {/* Priority Support */}
                {plan === 'pro' ? (
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-lg font-bold mb-4">Priority Support</h2>
                        <div className="flex items-center justify-between bg-zinc-800 rounded-xl p-4">
                            <div>
                                <p className="text-sm font-semibold">Pro Support Active</p>
                                <p className="text-xs text-zinc-400 mt-0.5">Our team responds within 2 hours.</p>
                            </div>
                            <button className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-500 transition-all">
                                Contact Support
                            </button>
                        </div>
                    </div>
                ) : (
                    <LockedSection requiredPlan="pro" feature="Priority Support">
                        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                            <h2 className="text-lg font-bold mb-4">Priority Support</h2>
                            <div className="bg-zinc-800 rounded-xl p-4 h-16" />
                        </div>
                    </LockedSection>
                )}

                {/* Upgrade CTA */}
                {plan !== 'pro' && (
                    <div id="upgrade" className="py-20 flex items-center justify-center">
                        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-16 text-center w-full">
                            <div className="text-5xl mb-6">⚡</div>
                            <h3 className="text-3xl font-black mb-4">
                                {plan === 'free' ? 'Unlock more with Basic or Pro' : 'Unlock everything with Pro'}
                            </h3>
                            <p className="text-zinc-400 text-base mb-10 leading-relaxed max-w-md mx-auto">
                                {plan === 'free'
                                    ? 'Get analytics, unlimited projects, and priority support.'
                                    : 'Get priority support, advanced analytics, and a Pro badge.'}
                            </p>
                            <div className="flex gap-4 justify-center">
                                {plan === 'free' && (
                                    <button onClick={() => setSelectedPlan(plans.basic)} className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 text-base transition-all">
                                        Upgrade to Basic — ₹299/mo
                                    </button>
                                )}
                                <button onClick={() => setSelectedPlan(plans.pro)} className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-500 text-base transition-all">
                                    Upgrade to Pro — ₹799/mo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>


            {/* Upgrade Modal */}
          {selectedPlan && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                      
                      {/* Header */}
                      <div className="flex items-center justify-between mb-5">
                          <h3 className="text-lg font-black text-white">Upgrade to {selectedPlan.name}</h3>
                          <button onClick={() => setSelectedPlan(null)} className="text-zinc-500 hover:text-white transition-colors text-xl">✕</button>
                      </div>

                      {/* Plan Details */}
                      <div className="bg-zinc-800 rounded-xl p-4 mb-5">
                          <div className="flex items-end gap-1 mb-3">
                              <span className="text-3xl font-black text-white">₹{selectedPlan.price}</span>
                              <span className="text-zinc-400 text-sm mb-1">/ month</span>
                          </div>
                          <ul className="space-y-2">
                              {selectedPlan.features.map(f => (
                                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                                      <span className="text-emerald-500">✓</span>{f}
                                  </li>
                              ))}
                          </ul>
                      </div>

                      {/* Pay Button */}
                      <button onClick={handlePayment} className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-all text-sm">
                          Pay ₹{selectedPlan.price} — Proceed to Payment
                      </button>

                      <p className="text-center text-xs text-zinc-600 mt-3">Secured by Razorpay</p>
                  </div>
              </div>
          )}

        </div>
    );
}

export default Dashboard;