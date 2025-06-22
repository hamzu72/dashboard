/**
 * This file contains the trading page component
 */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { getAllStocks } from '../services/stockService';
import { executeBuyTrade, executeSellTrade } from '../services/portfolioService';
import { Stock } from '../types';
import Navbar from '../components/layout/Navbar';
import TradingForm from '../components/trading/TradingForm';
import { Search, Loader2 } from 'lucide-react';

/**
 * Component for the trading page where users can buy and sell stocks
 */
const TradingPage: React.FC = () => {
  const { portfolio, userAccount, refreshData } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get symbol from URL if available
  const urlSymbol = searchParams.get('symbol');

  useEffect(() => {
    const loadStocks = async () => {
      setIsLoading(true);
      try {
        const stocksData = await getAllStocks();
        setStocks(stocksData);
        setFilteredStocks(stocksData);
        
        // If a symbol is provided in the URL, select that stock
        if (urlSymbol) {
          const stockFromUrl = stocksData.find(stock => stock.symbol === urlSymbol);
          if (stockFromUrl) {
            setSelectedStock(stockFromUrl);
            setSearchQuery(stockFromUrl.symbol);
          }
        }
      } catch (error) {
        console.error('Error loading stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStocks();
  }, [urlSymbol]);

  /**
   * Filters stocks based on search query
   */
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter(
        stock => 
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [searchQuery, stocks]);

  /**
   * Handles selecting a stock for trading
   */
  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setSearchQuery(stock.symbol);
    
    // Update URL with selected stock symbol
    navigate(`/trading?symbol=${stock.symbol}`);
  };

  /**
   * Handles buying shares of a stock
   */
  const handleBuy = async (symbol: string, shares: number, price: number) => {
    setIsProcessing(true);
    try {
      await executeBuyTrade(symbol, shares, price);
      await refreshData();
    } catch (error) {
      console.error('Error executing buy trade:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handles selling shares of a stock
   */
  const handleSell = async (symbol: string, shares: number, price: number) => {
    setIsProcessing(true);
    try {
      await executeSellTrade(symbol, shares, price);
      await refreshData();
    } catch (error) {
      console.error('Error executing sell trade:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trade Stocks</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Buy and sell stocks in your portfolio
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Select a Stock</h2>
            
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by symbol or name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {filteredStocks.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No stocks found matching your search
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredStocks.map((stock) => (
                      <li 
                        key={stock.symbol}
                        onClick={() => handleSelectStock(stock)}
                        className={`px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md ${
                          selectedStock?.symbol === stock.symbol ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{stock.symbol}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{stock.name}</div>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            ${stock.price.toFixed(2)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          
          <div className="lg:col-span-2">
            {selectedStock ? (
              <TradingForm 
                stock={selectedStock}
                portfolio={portfolio}
                account={userAccount}
                onBuy={handleBuy}
                onSell={handleSell}
                isProcessing={isProcessing}
              />
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-full text-center">
                <Search className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Select a stock to trade</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Search for a stock by symbol or name to start trading
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradingPage;
