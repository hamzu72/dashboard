/**
 * This file contains the watchlist card component for the dashboard
 */
import React from 'react';
import { Stock } from '../../types';
import { Eye, EyeOff, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router';

/**
 * Props for the WatchlistCard component
 */
interface WatchlistCardProps {
  stocks: Stock[];
}

/**
 * Component for displaying and managing the user's stock watchlist
 */
const WatchlistCard: React.FC<WatchlistCardProps> = ({ stocks }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useAppContext();

  /**
   * Checks if a stock is in the watchlist
   */
  const isInWatchlist = (symbol: string): boolean => {
    return watchlist.some(item => item.symbol === symbol);
  };

  /**
   * Handles toggling a stock in the watchlist
   */
  const handleWatchlistToggle = (stock: Stock, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (isInWatchlist(stock.symbol)) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">My Watchlist</h2>
        <Link to="/stocks" className="text-indigo-600 dark:text-indigo-400 text-sm flex items-center hover:text-indigo-500">
          View all stocks <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      {watchlist.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <Eye className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-gray-500 dark:text-gray-400 mb-3">Your watchlist is empty</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add stocks to your watchlist to track their performance</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto -mx-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {watchlist.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/stocks/${stock.symbol}`} className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-indigo-800 dark:text-indigo-200">{stock.symbol.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{stock.symbol}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">${stock.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${
                        stock.change >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={(e) => handleWatchlistToggle(stock, e)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                      >
                        {isInWatchlist(stock.symbol) ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {watchlist.length === 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggested stocks to watch:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stocks.slice(0, 4).map((stock) => (
              <div 
                key={stock.symbol}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-indigo-800 dark:text-indigo-200">{stock.symbol.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{stock.symbol}</div>
                    <div className={`text-xs ${
                      stock.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleWatchlistToggle(stock, e)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistCard;
