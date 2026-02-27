import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import { SlidersHorizontal, Search as SearchIcon, MapPin, X } from 'lucide-react';

const RoomListings = () => {
    const query = new URLSearchParams(useLocation().search);
    const initialLocation = query.get('location') || '';

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        location: initialLocation === 'All Locations' ? '' : initialLocation,
        priceRange: 25000,
        gender: 'Any',
        type: 'Any'
    });

    const areas = ['All Locations', 'OMR', 'Velachery', 'T Nagar', 'Tambaram', 'Adyar', 'Anna Nagar', 'Guindy', 'Porur', 'Perungudi'];

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const params = {};
                if (filters.location && filters.location !== 'All Locations') params.location = filters.location;
                if (filters.gender && filters.gender !== 'Any') params.gender = filters.gender;
                if (filters.type && filters.type !== 'Any') params.type = filters.type;
                params.maxPrice = filters.priceRange;

                const response = await axios.get('http://localhost:5000/rooms', { params });

                // Map backend fields to frontend props
                const mappedRooms = response.data.map(room => ({
                    id: room.id,
                    title: room.title,
                    location: room.location,
                    price: room.price,
                    roomType: room.type,
                    genderPreference: room.gender_preference,
                    image: room.RoomImages && room.RoomImages.length > 0
                        ? `http://localhost:5000/${room.RoomImages[0].image_url.replace(/\\/g, '/')}`
                        : null
                }));

                setRooms(mappedRooms);
                setError(null);
            } catch (err) {
                console.error('Error fetching rooms:', err);
                setError('Failed to load listings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [filters]);

    const filteredRooms = rooms; // Filtering is now handled by the API

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <SlidersHorizontal size={18} className="text-primary-600" /> Filters
                                </h3>
                                <button
                                    onClick={() => setFilters({ location: '', priceRange: 15000, gender: 'Any', type: 'Any' })}
                                    className="text-xs text-gray-400 hover:text-primary-600 font-medium"
                                >
                                    Reset All
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Location</label>
                                    <select
                                        className="w-full bg-gray-50 border-gray-200 rounded-lg p-2.5 text-sm focus:ring-primary-500 focus:border-primary-500"
                                        value={filters.location}
                                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                    >
                                        {areas.map(area => <option key={area} value={area}>{area}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Max Price: ₹{filters.priceRange}</label>
                                    <input
                                        type="range" min="2000" max="25000" step="500"
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                        value={filters.priceRange}
                                        onChange={(e) => setFilters({ ...filters, priceRange: parseInt(e.target.value) })}
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Gender Preference</label>
                                    <div className="space-y-2">
                                        {['Any', 'Male', 'Female'].map(g => (
                                            <label key={g} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio" name="gender"
                                                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                                                    checked={filters.gender === g}
                                                    onChange={() => setFilters({ ...filters, gender: g })}
                                                />
                                                <span className="text-sm text-gray-600 group-hover:text-primary-600 transition">{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Room Type</label>
                                    <div className="space-y-2">
                                        {['Any', 'Private', 'Shared'].map(t => (
                                            <label key={t} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="radio" name="type"
                                                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                                                    checked={filters.type === t}
                                                    onChange={() => setFilters({ ...filters, type: t })}
                                                />
                                                <span className="text-sm text-gray-600 group-hover:text-primary-600 transition">{t}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Listings Area */}
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {loading ? 'Finding rooms...' : `${filteredRooms.length} ${filteredRooms.length === 1 ? 'Listing' : 'Listings'} in ${filters.location || 'Chennai'}`}
                            </h2>
                            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                                Sort by: <span className="text-gray-900 font-semibold cursor-pointer">Relevance</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 opacity-50">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white h-96 rounded-2xl animate-pulse border border-gray-100"></div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 p-10 rounded-3xl text-center border border-red-100">
                                <h3 className="text-red-800 font-bold mb-2">Error</h3>
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : filteredRooms.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredRooms.map(room => (
                                    <RoomCard key={room.id} room={room} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-20 rounded-3xl text-center shadow-sm border border-gray-100">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <SearchIcon size={40} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No listings found</h3>
                                <p className="text-gray-500">Try adjusting your filters to find more results.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomListings;
