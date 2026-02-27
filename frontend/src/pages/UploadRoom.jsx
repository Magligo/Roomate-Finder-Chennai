import React, { useState } from 'react';
import { Upload, X, MapPin, IndianRupee, Image as ImageIcon, CheckCircle, Info, PlusCircle, Shield } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadRoom = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        roomType: 'Private',
        genderPreference: 'Any',
        contactInfo: ''
    });

    const areas = ['OMR', 'Velachery', 'T Nagar', 'Tambaram', 'Adyar', 'Anna Nagar', 'Guindy', 'Porur', 'Perungudi'];

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages([...images, ...newImages]);
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login first to list a room');
            navigate('/login');
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('location', formData.location);
            data.append('price', formData.price);
            data.append('type', formData.roomType);
            data.append('gender_preference', formData.genderPreference);
            data.append('contact', formData.contactInfo);

            images.forEach((img) => {
                data.append('images', img.file);
            });

            const response = await axios.post('http://localhost:5000/rooms', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                alert('Room listing uploaded successfully!');
                navigate('/rooms');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert(error.response?.data?.message || 'Failed to upload room. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-primary-600 p-8 text-white relative">
                        <h2 className="text-3xl font-bold mb-2">List Your Room</h2>
                        <p className="text-primary-100">Fill in the details to find your perfect roommate.</p>
                        <div className="absolute top-8 right-8 bg-primary-500/30 p-4 rounded-full">
                            <PlusCircle size={40} className="text-white/80" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Left Column: Details */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                                        Room Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text" required
                                        placeholder="e.g., Spacious AC room with balcony"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-4 top-3.5 text-gray-400" />
                                        <select
                                            required
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition outline-none appearance-none bg-white"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            disabled={loading}
                                        >
                                            <option value="">Select Area in Chennai</option>
                                            {areas.map(area => <option key={area} value={area}>{area}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Rent (₹)</label>
                                        <div className="relative">
                                            <IndianRupee size={18} className="absolute left-4 top-3.5 text-gray-400" />
                                            <input
                                                type="number" required
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                                placeholder="5000"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Room Type</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                                            value={formData.roomType}
                                            onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                                            disabled={loading}
                                        >
                                            <option value="Private">Private</option>
                                            <option value="Shared">Shared</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender Preference</label>
                                    <div className="flex gap-4">
                                        {['Any', 'Male', 'Female'].map(g => (
                                            <button
                                                key={g} type="button"
                                                onClick={() => setFormData({ ...formData, genderPreference: g })}
                                                disabled={loading}
                                                className={`flex-grow py-3 rounded-xl border font-medium transition ${formData.genderPreference === g
                                                    ? 'bg-primary-50 border-primary-600 text-primary-600'
                                                    : 'bg-white border-gray-200 text-gray-500 hover:border-primary-200'
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Images & Desc */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Upload Room Images</label>
                                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition ${images.length > 0 ? 'border-primary-300 bg-primary-50/30' : 'border-gray-200 hover:border-primary-400'
                                        }`}>
                                        <input
                                            type="file" multiple accept="image/*"
                                            id="img-upload" className="hidden"
                                            onChange={handleImageChange}
                                            disabled={loading}
                                        />
                                        <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center">
                                            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-3">
                                                <Upload size={24} />
                                            </div>
                                            <p className="text-gray-900 font-bold">Click to upload images</p>
                                            <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB (Max 5 images)</p>
                                        </label>

                                        {images.length > 0 && (
                                            <div className="grid grid-cols-4 gap-2 mt-6">
                                                {images.map((img, idx) => (
                                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                                                        <img src={img.preview} className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            disabled={loading}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 shadow-lg"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                                        placeholder="Tell us about the house, amenities, and what kind of roommate you are looking for..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        disabled={loading}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Info</label>
                                    <input
                                        type="text" required
                                        placeholder="Mobile number or Email"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                        value={formData.contactInfo}
                                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Shield size={16} className="text-green-500" />
                                Your data is stored securely.
                            </div>
                            <button
                                disabled={loading}
                                className={`bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-primary-200 transition-all flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <>Publishing...</>
                                ) : (
                                    <><CheckCircle size={20} /> Publish Listing</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadRoom;
