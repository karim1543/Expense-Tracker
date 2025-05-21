import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Update path if needed

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
                Expense Tracker
            </Link>

            <div className="space-x-4">
                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;