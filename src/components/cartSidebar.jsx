import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { removeItem, addToCart, decreaseQuantity, setIsCartOpen } from '../features/cart/cartSlice';

const CartSidebar = () => {
    const dispatch = useDispatch();
    const { items, totalAmount, isCartOpen } = useSelector(state => state.cart);

    return (
        <>
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => dispatch(setIsCartOpen(false))}
                />
            )}

            <div className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                    <button
                        onClick={() => dispatch(setIsCartOpen(false))}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <span className="text-6xl mb-4">🛒</span>
                            <p>Your cart is currently empty.</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-xl bg-white dark:bg-gray-800" />

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">{item.title}</h3>
                                        <button
                                            onClick={() => dispatch(removeItem(item.id))}
                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-bold text-indigo-600 dark:text-indigo-400">${item.price.toFixed(2)}</span>

                                        <div className="flex items-center gap-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1">
                                            <button onClick={() => dispatch(decreaseQuantity(item.id))} className="text-gray-500 dark:text-gray-300 hover:text-indigo-600">
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center dark:text-white">{item.quantity}</span>
                                            <button onClick={() => dispatch(addToCart(item))} className="text-gray-500 dark:text-gray-300 hover:text-indigo-600">
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

    
                {items.length > 0 && (
                    <div className="p-5 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4 text-lg">
                            <span className="font-medium text-gray-600 dark:text-gray-300">Subtotal</span>
                            <span className="font-bold text-gray-900 dark:text-white">${totalAmount.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-600/20">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;