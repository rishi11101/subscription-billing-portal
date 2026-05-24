import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async () => {
          try {
              const response = await api.post('/auth/register', { name, email, password });

              // auto login after register
              const loginResponse = await api.post('/auth/login', { email, password });
              login(loginResponse.data.user, loginResponse.data.token);

              navigate('/dashboard');

          } catch (err) {
              console.log(err);
              alert('Registration failed. Try again.');
          }
    };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 selection:bg-emerald-500/30 relative overflow-hidden">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Register Card */}
        <div className="relative z-10 bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            
            {/* Logo */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black tracking-tighter text-white">
                    Plan<span className="text-emerald-500">Vault</span>
                </h1>
                <p className="text-sm text-zinc-400 mt-2">Create your account to get started.</p>
            </div>

            {/* Form */}
            <div className="space-y-5">
                <div>
                    <label className="text-sm font-medium text-zinc-300 block mb-1.5">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="Your Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-950/50 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-zinc-300 block mb-1.5">Email address</label>
                    <input 
                        type="email" 
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-950/50 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-zinc-300 block mb-1.5">Password</label>
                    <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2.5 bg-zinc-950/50 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" 
                    />
                </div>
                <button onClick={handleRegister} className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-all shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)] text-sm mt-2">
                    Create account
                </button>
            </div>

            {/* Footer link */}
            <p className="text-center text-sm text-zinc-500 mt-8">
                Already have an account?{' '}
                <span onClick={() => navigate('/login')} className="text-emerald-500 font-semibold cursor-pointer hover:text-emerald-400 transition-colors">
                    Log in
                </span>
            </p>

        </div>
    </div>
  )
}

export default Register;