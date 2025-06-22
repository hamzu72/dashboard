/**
 * This file contains the stock detail page component
 */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getStockBySymbol, getStockNews } from '../services/stockService';
import { StockWithHistory, NewsItem } from '../types';
import Navbar from '../components/layout/Navbar';
import StockDetail from '../components/stocks/StockDetail';
import { Loader2, ArrowLeft } from 'lucide-react';

/**
 * Component for displaying detailed information about a specific stock
 */
const StockDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockWithHistory | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStockData = async () => {
      if (!symbol) {
        setError('Stock symbol not provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const [stockData, newsData] = await Promise.all([
          getStockBySymbol(symbol),
          getStockNews(symbol)
        ]);

        if (!stockData) {
          setError(`Stock with symbol ${symbol} not found`);
        } else {
          setStock(stockData);
          setNews(newsData);
        }
      } catch (err) {
        console.error('Error loading stock data:', err);
        setError('Failed to load stock data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadStockData();
  }, [symbol]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center px-3 py-2 mb-6 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading stock data...</h2>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="text-center text-red-600 dark:text-red-400">
              <h2 className="text-xl font-semibold mb-2">{error}</h2>
              <button
                onClick={handleGoBack}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go back to stocks
              </button>
            </div>
          </div>
        ) : stock ? (
          <StockDetail stock={stock} relatedNews={news} />
        ) : null}
      </main>
    </div>
  );
};

export default StockDetailPage;
