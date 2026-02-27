import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const EditRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: 'Spacious AC room in OMR',
        description: 'Existing room description...',
        location: 'OMR',
        price: '9500',
        roomType: 'Private',
        genderPreference: 'Male'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Listing updated!');
        navigate(`/rooms/${id}`);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-8 hover:text-gray-800">
                    <ArrowLeft size={18} /> Cancel Editing
                </button>
                <h2 className="text-2xl font-bold mb-8">Edit Room Listing #{id}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                        <input
                            type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Rent (₹)</label>
                            <input
                                type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Room Type</label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500" value={formData.roomType}>
                                <option value="Private">Private</option>
                                <option value="Shared">Shared</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                        <textarea
                            rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                            value={formData.description}
                        ></textarea>
                    </div>
                    <button className="w-full bg-primary-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-700 transition shadow-lg shadow-primary-100">
                        <Save size={20} /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditRoom;
