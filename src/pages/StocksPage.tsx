/**
 * This file contains the stocks page component
 */
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/layout/Navbar';
import StockList from '../components/stocks/StockList';
import { Loader2 } from 'lucide-react';

/**
 * Component for the stocks page showing all available stocks
 */
const StocksPage: React.FC = () => {
  const { stocks, isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading stocks...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Stock Market</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Browse, search and track stocks from various sectors
          </p>
        </div>
        
        <StockList stocks={stocks} />
      </main>
    </div>
  );
};

export default StocksPage;
