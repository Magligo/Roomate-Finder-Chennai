import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Github, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Login successful!');
                window.location.href = '/';
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
            <div className="w-full max-w-md overflow-hidden bg-white border border-gray-100 shadow-xl rounded-3xl">
                <div className="px-10 py-12">
                    <div className="mb-10 text-center">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-2xl font-bold text-white shadow-lg bg-primary-600 rounded-xl shadow-primary-200">RM</div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-gray-500">Sign in to find your ideal roommate</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="email" required
                                    className="text-white w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-bold text-gray-700">Password</label>
                                <a href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"} required
                                    className=" text-white w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button className="w-full py-4 font-bold text-white transition duration-300 shadow-lg bg-primary-600 hover:bg-primary-700 rounded-2xl shadow-primary-100">
                            Sign In
                        </button>
                    </form>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-4 text-gray-400 bg-white">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 transition border border-gray-100 rounded-2xl hover:bg-gray-50">
                            <Chrome size={20} className="text-red-500" /> <span className="text-sm font-bold text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 transition border border-gray-100 rounded-2xl hover:bg-gray-50">
                            <Github size={20} /> <span className="text-sm font-bold text-gray-700">Github</span>
                        </button>
                    </div>

                    <p className="mt-10 text-sm text-center text-gray-500">
                        Don't have an account? <Link to="/signup" className="ml-1 font-bold text-primary-600 hover:text-primary-700">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
