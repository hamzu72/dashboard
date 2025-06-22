/**
 * This file contains the stock detail component for individual stock view
 */
import React from 'react';
import { StockWithHistory, NewsItem } from '../../types';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Eye, EyeOff, Calendar, Activity } from 'lucide-react';
import { StockChart } from '../ui/chart';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router';

/**
 * Props for the StockDetail component
 */
interface StockDetailProps {
  stock: StockWithHistory;
  relatedNews?: NewsItem[];
}

/**
 * Component for displaying detailed information about a stock
 */
const StockDetail: React.FC<StockDetailProps> = ({ stock, relatedNews = [] }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useAppContext();

  /**
   * Checks if the stock is in the watchlist
   */
  const isInWatchlist = (): boolean => {
    return watchlist.some(item => item.symbol === stock.symbol);
  };

  /**
   * Handles toggling the stock in the watchlist
   */
  const handleWatchlistToggle = () => {
    if (isInWatchlist()) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock);
    }
  };

  /**
   * Formats a large number with appropriate suffixes (K, M, B)
   */
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num.toString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4">
                <span className="text-lg font-bold text-indigo-800 dark:text-indigo-200">{stock.symbol.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stock.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{stock.symbol} • {stock.sector}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center text-lg ${
              stock.change >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stock.change >= 0 ? (
                <TrendingUp className="h-5 w-5 mr-1" />
              ) : (
                <TrendingDown className="h-5 w-5 mr-1" />
              )}
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
            <button
              onClick={handleWatchlistToggle}
              className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              {isInWatchlist() ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Remove from Watchlist
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Add to Watchlist
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                <div className="flex items-center mt-1">
                  <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {formatLargeNumber(stock.marketCap)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Volume</p>
                <div className="flex items-center mt-1">
                  <Activity className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {stock.volume.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sector</p>
                <div className="flex items-center mt-1">
                  <BarChart2 className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {stock.sector}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Price History</h2>
          <div className="h-80">
            <StockChart 
              data={stock.history} 
              width={800} 
              height={320} 
              lineColor={stock.change >= 0 ? '#10b981' : '#ef4444'}
              fillColor={stock.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
              showGrid={true}
              showTooltip={true}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Link 
            to={`/trading?symbol=${stock.symbol}`}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Trade This Stock
          </Link>
        </div>
      </div>
      
      {relatedNews.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Related News</h2>
          <div className="space-y-4">
            {relatedNews.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-3 transition duration-150 ease-in-out"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="h-16 w-16 object-cover rounded"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {item.source} · {formatRelativeDate(item.date)}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Formats a date string relative to the current date
 */
const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default StockDetail;
