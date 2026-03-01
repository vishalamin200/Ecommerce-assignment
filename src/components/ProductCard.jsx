import { useDispatch } from 'react-redux';
import { addToCart } from "../features/cart/cartSlice.js"
import { ShoppingBag, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 flex flex-col h-full">
            <div className="relative h-64 w-full bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-center overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
                />
                <div className="absolute top-3 left-3 bg-white dark:bg-gray-700 px-2 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm capitalize">
                    {product.category}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        ${product.price}
                    </span>
                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="flex items-center gap-2 bg-gray-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-colors duration-300 font-medium text-sm"
                    >
                        <ShoppingBag className="h-4 w-4" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;