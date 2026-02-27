import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, IndianRupee, Bed, User, ShieldCheck, Mail, Phone, MessageSquare, ArrowLeft, Trash2 } from 'lucide-react';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }

        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/rooms/${id}`);
                setRoom(response.data);
            } catch (err) {
                console.error('Error fetching room:', err);
                setError('Failed to load room details.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoom();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Room deleted successfully');
            navigate('/rooms');
        } catch (err) {
            console.error('Error deleting room:', err);
            alert(err.response?.data?.message || 'Failed to delete room');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
    );

    if (error || !room) return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Room not found'}</h2>
            <Link to="/rooms" className="text-primary-600 font-bold hover:underline">Back to Listings</Link>
        </div>
    );

    const isOwner = currentUser && room.user_id === currentUser.id;

    const newLocal = "font-bold";
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/rooms" className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium transition w-fit">
                        <ArrowLeft size={18} /> Back to Search
                    </Link>
                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold transition border border-red-100"
                        >
                            <Trash2 size={18} /> Delete Room
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Image Gallery */}
                        <div className="grid grid-cols-4 gap-4 h-[400px]">
                            <div className="col-span-4 md:col-span-3 bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
                                {room.RoomImages && room.RoomImages.length > 0 ? (
                                    <img
                                        src={`http://localhost:5000/${room.RoomImages[0].image_url.replace(/\\/g, '/')}`}
                                        alt={room.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">No Image Available</div>
                                )}
                            </div>
                            <div className="hidden md:flex flex-col gap-4">
                                {room.RoomImages && room.RoomImages.slice(1, 3).map((img, idx) => (
                                    <div key={idx} className="h-1/2 bg-gray-200 rounded-3xl overflow-hidden shadow-sm">
                                        <img
                                            src={`http://localhost:5000/${img.image_url.replace(/\\/g, '/')}`}
                                            alt={`Room side view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                                {(!room.RoomImages || room.RoomImages.length <= 1) && (
                                    <>
                                        <div className="h-1/2 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-400 text-xs text-center p-2">No more images</div>
                                        <div className="h-1/2 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-400 text-xs text-center p-2">No more images</div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{room.title}</h1>
                                    <p className="flex items-center text-gray-500 gap-2">
                                        <MapPin size={18} className="text-primary-600" /> {room.location}
                                    </p>
                                </div>
                                <div className="bg-primary-50 px-6 py-3 rounded-2xl flex items-center gap-2 border border-primary-100">
                                    <IndianRupee size={24} className="text-primary-600" />
                                    <span className="text-3xl font-extrabold text-primary-600">{room.price}</span>
                                    <span className="text-primary-400 text-sm">/mo</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 bg-gray-50 p-6 rounded-2xl gap-6 mb-8 border border-gray-100">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Bed size={24} className="text-gray-400 mb-2" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Room Type</span>
                                    <p className="text-gray-900 font-bold">{room.type}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center border-l border-gray-200">
                                    <User size={24} className="text-gray-400 mb-2" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Preference</span>
                                    <p className="text-gray-900 font-bold">{room.gender_preference}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center border-l border-gray-200">
                                    <Calendar size={24} className="text-gray-400 mb-2" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Posted</span>
                                    <p className="text-gray-900 font-bold">{new Date(room.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center text-center border-l border-gray-200">
                                    <ShieldCheck size={24} className="text-gray-400 mb-2" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Verified</span>
                                    <p className="text-gray-900 font-bold">Yes</p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-primary-600 pl-4">Description</h3>
                                <p className="text-gray-600 leading-loose">
                                    {room.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-primary-600 pl-4">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <Phone size={20} className="text-primary-600" />
                                        <span className="font-medium">{room.contact}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <Mail size={20} className="text-primary-600" />
                                        <span className={newLocal}>Owner</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Contact Card */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 font-bold text-2xl">
                                    {room.user_id}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Room Owner</h4>
                                    <p className="text-gray-400 text-sm">Chennai</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <button className="w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-primary-100">
                                    <MessageSquare size={20} /> Chat with Owner
                                </button>
                                <div className="flex gap-4">
                                    <a href={`mailto:owner@example.com`} className="flex-grow flex items-center justify-center gap-2 border border-gray-100 hover:bg-gray-50 font-bold py-3.5 rounded-2xl transition text-center">
                                        <Mail size={18} className="text-primary-600" /> Email
                                    </a>
                                    <a href={`tel:${room.contact}`} className="flex-grow flex items-center justify-center gap-2 border border-gray-100 hover:bg-gray-50 font-bold py-3.5 rounded-2xl transition text-center">
                                        <Phone size={18} className="text-green-600" /> Call
                                    </a>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 text-center leading-relaxed">
                                    Never pay any amount before visiting the property and meeting the owner in person.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
