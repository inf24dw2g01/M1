import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-8">
            Welcome to ShopApp
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Your one-stop shop for everything you need. Browse our extensive collection of products and enjoy a seamless shopping experience.
          </p>

          {user ? (
            <div className="space-y-6">
              <p className="text-lg text-gray-700 bg-blue-50 inline-block px-6 py-2 rounded-full shadow-sm">
                <span className="font-medium">Welcome back, </span>
                <span className="font-bold text-blue-600">{user.name}!</span>
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Browse Products
                </Link>
                <Link
                  to="/orders"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  View Orders
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 mx-auto">
          <div className="col-span-3 flex justify-center gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102 transition-transform duration-300">
              <div className="text-5xl mb-6 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto text-blue-600">🛍️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Wide Selection</h3>
              <p className="text-gray-600">Browse through our extensive catalog of products from various categories</p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102 transition-transform duration-300">
              <div className="text-5xl mb-6 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto text-green-600">🔒</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Shopping</h3>
              <p className="text-gray-600">Your data and transactions are always protected with state-of-the-art security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
