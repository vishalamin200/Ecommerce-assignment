import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/cartSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../features/products/productSlice';
import { fetchUserInfo } from '../features/auth/authSlice';

const HomePage = () => {

  const {categories, loading, products, totalProducts} = useSelector(state => state.products)


  const dispatch = useDispatch()

  const limit = 12;
  const totalPages = Math.ceil(totalProducts / limit);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
      try {
        dispatch(fetchCategories())
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
  }, [dispatch]);


  useEffect(() => {
      try {
        const skip = (currentPage - 1 )*limit
        dispatch(fetchProducts({category:selectedCategory, limit,skip}))
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  }, [currentPage,selectedCategory,dispatch]);

  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken")
    console.log("accessToken", accessToken)
    if(accessToken){
      dispatch(fetchUserInfo(accessToken))
    }
  },[dispatch])


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };



  return (
    <div className="font-sans min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <CartSidebar/>
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

    
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Discover Products
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Find the best deals on our top rated items.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm w-full md:w-auto transition-colors duration-300">
              <Filter className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-2" />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full md:w-64 border-none bg-transparent focus:ring-0 text-gray-700 dark:text-gray-200 font-medium capitalize cursor-pointer outline-none py-2"
              >
                <option
                  value="all"
                  className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200"
                >
                  All Categories
                </option>
                {categories.map((cat, index) => (
                  <option
                    key={index}
                    value={cat}
                    className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200"
                  >
                    {cat.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <span className="font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
  );
};

export default HomePage;
