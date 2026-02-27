import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Account created successfully!');
                navigate('/');
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-10 py-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-500">Join thousands of people in Chennai</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="text" required
                                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
                                    placeholder="John Doe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type="email" required
                                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-700 mb-2 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"} required
                                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 py-2">
                            <input type="checkbox" id="terms" required className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-gray-300" />
                            <label htmlFor="terms" className="text-xs text-gray-500">
                                I agree to the <a href="#" className="font-bold text-primary-600">Terms of Service</a> and <a href="#" className="font-bold text-primary-600">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary-100 transition duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Creating Account...' : <><ShieldCheck size={20} /> Create My Account</>}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Already have an account? <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 ml-1">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
