import React from 'react';
import { MapPin, User, IndianRupee, Bed } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={room.image || 'https://via.placeholder.com/400x300?text=Room+Image'}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${room.genderPreference === 'Male' ? 'bg-blue-100 text-blue-700' :
                            room.genderPreference === 'Female' ? 'bg-pink-100 text-pink-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {room.genderPreference} Only
                    </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-primary-600 font-bold shadow-lg">
                    <div className="flex items-center">
                        <IndianRupee size={16} />
                        <span className="text-lg">{room.price}</span>
                        <span className="text-gray-500 text-xs font-normal ml-1">/mo</span>
                    </div>
                </div>
            </div>

            <div className="p-5 flex-grow">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin size={14} className="mr-1 text-primary-500" />
                    {room.location}, Chennai
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{room.title}</h3>

                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                        <Bed size={16} className="text-gray-400" />
                        {room.roomType}
                    </div>
                    <div className="flex items-center gap-1">
                        <User size={16} className="text-gray-400" />
                        {room.sharedWith || 'Private'}
                    </div>
                </div>
            </div>

            <div className="px-5 pb-5 mt-auto">
                <Link
                    to={`/rooms/${room.id}`}
                    className="block w-full text-center bg-gray-50 hover:bg-primary-600 hover:text-white text-primary-600 font-bold py-3 rounded-xl transition duration-300 border border-primary-100"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;
