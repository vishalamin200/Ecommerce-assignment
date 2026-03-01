import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Store, Sun, Moon, LogIn, LogOut, User } from 'lucide-react';

import { logout } from '../features/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setIsCartOpen } from '../features/cart/cartSlice.js';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [isDarkMode, setIsDarkMode] = useState(false);


    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);


    return (
        <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                 
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Store className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                            Lumina<span className="text-indigo-600 dark:text-indigo-400">Mart</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
             
                        <button
                            onClick={()=>setIsDarkMode(!isDarkMode)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                
                        <button
                            onClick={() => dispatch(setIsCartOpen(true))}
                            className="relative flex items-center p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {totalQuantity > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full border-2 border-white dark:border-gray-900">
                                    {totalQuantity}
                                </span>
                            )}
                        </button>

                    
                        <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                 
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2 sm:gap-3">
                           
                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 py-1.5 px-3 rounded-full border border-gray-100 dark:border-gray-700 transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {user?.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="h-7 w-7 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                            {user?.username?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block capitalize truncate max-w-[100px]">
                                        {user?.username || 'User'}
                                    </span>
                                </div>

                                <button
                                    onClick={() => dispatch(logout())}
                                    className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-500/10 dark:hover:text-red-400 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                      
                            <button
                                onClick={()=>navigate("/login")}
                                className="flex items-center gap-2 bg-gray-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg active:scale-95 ml-1"
                            >
                                <LogIn className="h-4 w-4" />
                                <span className="hidden sm:block">Login</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

