import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RoomListings from './pages/RoomListings';
import RoomDetails from './pages/RoomDetails';
import UploadRoom from './pages/UploadRoom';
import EditRoom from './pages/EditRoom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/rooms" element={<RoomListings />} />
                        <Route path="/rooms/:id" element={<RoomDetails />} />
                        <Route path="/upload" element={<UploadRoom />} />
                        <Route path="/edit/:id" element={<EditRoom />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </main>
                <footer className="bg-gray-800 text-white py-6 text-center">
                    <p>&copy; 2026 Chennai Roommate Finder. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
