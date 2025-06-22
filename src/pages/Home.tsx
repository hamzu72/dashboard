/**
 * This file contains the home page component with dashboard
 */
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/layout/Navbar';
import MarketOverview from '../components/dashboard/MarketOverview';
import WatchlistCard from '../components/dashboard/WatchlistCard';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import MarketNews from '../components/dashboard/MarketNews';
import { getMarketNews } from '../services/stockService';
import { NewsItem } from '../types';
import { Loader2 } from 'lucide-react';

/**
 * Component for the home page with dashboard
 */
const Home: React.FC = () => {
  const { stocks, portfolio, userAccount, isLoading, refreshData } = useAppContext();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await getMarketNews();
        setNews(newsData);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setIsNewsLoading(false);
      }
    };

    loadNews();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading your dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MarketOverview stocks={stocks} />
            <PortfolioSummary portfolio={portfolio} account={userAccount} />
          </div>
          <div className="space-y-6">
            <WatchlistCard stocks={stocks} />
          </div>
        </div>
        
        <div className="mt-6">
          {isNewsLoading ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
          ) : (
            <MarketNews news={news} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
