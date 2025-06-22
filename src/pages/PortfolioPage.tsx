/**
 * This file contains the portfolio page component
 */
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/layout/Navbar';
import PortfolioTable from '../components/portfolio/PortfolioTable';
import TradeHistory from '../components/portfolio/TradeHistory';
import { getTradeHistory } from '../services/portfolioService';
import { Trade } from '../types';
import { Loader2 } from 'lucide-react';

/**
 * Component for the portfolio page showing user's holdings and trade history
 */
const PortfolioPage: React.FC = () => {
  const { portfolio, userAccount, isLoading, refreshData } = useAppContext();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isTradesLoading, setIsTradesLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadTradeHistory();
  }, []);

  /**
   * Loads the user's trade history
   */
  const loadTradeHistory = async () => {
    setIsTradesLoading(true);
    try {
      const tradeData = await getTradeHistory();
      setTrades(tradeData);
    } catch (error) {
      console.error('Error loading trade history:', error);
    } finally {
      setIsTradesLoading(false);
    }
  };

  /**
   * Refreshes the portfolio and trade data
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      await loadTradeHistory();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading your portfolio...</h2>
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Portfolio</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your investments and track your performance
          </p>
        </div>
        
        <div className="space-y-8">
          <PortfolioTable 
            portfolio={portfolio} 
            account={userAccount} 
            onRefresh={handleRefresh}
            isLoading={isRefreshing}
          />
          
          {isTradesLoading ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
          ) : (
            <TradeHistory trades={trades} />
          )}
        </div>
      </main>
    </div>
  );
};

export default PortfolioPage;
