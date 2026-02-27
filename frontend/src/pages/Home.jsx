import React, { useState } from 'react';
import { Shield, MapPin, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const areas = ['OMR', 'Velachery', 'T Nagar', 'Tambaram', 'Adyar', 'Anna Nagar', 'Guindy', 'Porur', 'Perungudi'];

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/rooms?location=${location}`);
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-transparent"></div>
                    {/* Placeholder for real hero image */}
                    <div className="bg-gray-700 w-full h-full"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Find Your Perfect Roommate in <span className="text-primary-400">Chennai</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-gray-300">
                        Thousands of listings across OMR, Velachery, and all major areas. Browse verified profiles and safe rooms.
                    </p>

                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 bg-white p-2 rounded-xl shadow-2xl max-w-2xl mx-auto">
                        <div className="flex-grow flex items-center px-4 py-3 text-gray-800">
                            <MapPin className="text-primary-600 mr-2" />
                            <select
                                className="w-full bg-transparent border-none outline-none focus:ring-0 text-gray-700 font-medium"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Select Location</option>
                                {areas.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>
                        <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition-all flex items-center justify-center">
                            Search Now
                        </button>
                    </form>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Verified Profiles</h3>
                            <p className="text-gray-600 leading-relaxed">Safety is our priority. We verify user identity and room details to ensure a trustable experience.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Compatible Match</h3>
                            <p className="text-gray-600 leading-relaxed">Filter by habits, profession and lifestyle to find person you'll love living with.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Quick Move-in</h3>
                            <p className="text-gray-600 leading-relaxed">Direct contact with owners and current tenants. No brokerage, no hidden charges.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
