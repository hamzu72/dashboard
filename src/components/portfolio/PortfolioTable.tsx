/**
 * This file contains the portfolio table component for the portfolio page
 */
import React, { useState } from 'react';
import { PortfolioItem, UserAccount } from '../../types';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';

/**
 * Props for the PortfolioTable component
 */
interface PortfolioTableProps {
  portfolio: PortfolioItem[];
  account: UserAccount | null;
  onRefresh?: () => void;
  isLoading?: boolean;
}

/**
 * Component for displaying the user's portfolio in a table with sorting and filtering
 */
const PortfolioTable: React.FC<PortfolioTableProps> = ({ 
  portfolio, 
  account, 
  onRefresh,
  isLoading = false
}) => {
  const [sortField, setSortField] = useState<keyof PortfolioItem>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filterGainers, setFilterGainers] = useState<'all' | 'gainers' | 'losers'>('all');

  /**
   * Handles sorting the portfolio table
   */
  const handleSort = (field: keyof PortfolioItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  /**
   * Calculates total portfolio metrics
   */
  const getTotalPortfolioMetrics = () => {
    if (!portfolio.length) return { totalValue: 0, totalProfit: 0, totalProfitPercent: 0 };
    
    const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);
    const totalProfit = portfolio.reduce((sum, item) => sum + item.profit, 0);
    const totalProfitPercent = totalValue > 0 ? (totalProfit / (totalValue - totalProfit)) * 100 : 0;
    
    return { totalValue, totalProfit, totalProfitPercent };
  };

  /**
   * Filters and sorts the portfolio items
   */
  const getFilteredAndSortedPortfolio = (): PortfolioItem[] => {
    return portfolio
      .filter(item => {
        if (filterGainers === 'gainers') return item.profit > 0;
        if (filterGainers === 'losers') return item.profit < 0;
        return true;
      })
      .sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];
        
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortDirection === 'asc' 
            ? valueA.localeCompare(valueB) 
            : valueB.localeCompare(valueA);
        } else {
          const numA = Number(valueA);
          const numB = Number(valueB);
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }
      });
  };

  const { totalValue, totalProfit, totalProfitPercent } = getTotalPortfolioMetrics();
  const filteredPortfolio = getFilteredAndSortedPortfolio();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">My Portfolio</h2>
          <div className="flex space-x-3 mt-3 sm:mt-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            {onRefresh && (
              <button 
                onClick={onRefresh}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div>
                <label htmlFor="performance-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Performance
                </label>
                <select
                  id="performance-filter"
                  value={filterGainers}
                  onChange={(e) => setFilterGainers(e.target.value as 'all' | 'gainers' | 'losers')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Positions</option>
                  <option value="gainers">Gainers Only</option>
                  <option value="losers">Losers Only</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sort By
                </label>
                <select
                  id="sort-by"
                  value={`${sortField}-${sortDirection}`}
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split('-');
                    setSortField(field as keyof PortfolioItem);
                    setSortDirection(direction as 'asc' | 'desc');
                  }}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="symbol-asc">Symbol (A-Z)</option>
                  <option value="symbol-desc">Symbol (Z-A)</option>
                  <option value="value-desc">Value (High-Low)</option>
                  <option value="value-asc">Value (Low-High)</option>
                  <option value="profitPercent-desc">Best Performers</option>
                  <option value="profitPercent-asc">Worst Performers</option>
                  <option value="shares-desc">Shares (High-Low)</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Portfolio Value</p>
            <div className="flex items-center mt-1">
              <span className="text-xl font-medium text-gray-900 dark:text-gray-100">${totalValue.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Profit/Loss</p>
            <div className="flex items-center mt-1">
              {totalProfit >= 0 ? (
                <ArrowUpRight className="h-5 w-5 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-500 mr-1" />
              )}
              <span className={`text-xl font-medium ${
                totalProfit >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
              }`}>
                ${Math.abs(totalProfit).toFixed(2)} ({totalProfitPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          {account && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">Available Cash</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xl font-medium text-blue-800 dark:text-blue-200">${account.balance.toFixed(2)}</span>
                <Link 
                  to="/trading" 
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Trade
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {portfolio.length === 0 ? (
        <div className="p-6 text-center">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M20 12H4M12 4v16m8-8a8 8 0 11-16 0 8 8 0 0116 0z" 
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No stocks in portfolio</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by buying your first stock.</p>
          <div className="mt-6">
            <Link
              to="/trading"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Trading
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('symbol')}
                >
                  <div className="flex items-center">
                    Symbol/Name
                    {sortField === 'symbol' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('shares')}
                >
                  <div className="flex items-center">
                    Shares
                    {sortField === 'shares' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('avgPrice')}
                >
                  <div className="flex items-center">
                    Avg. Price
                    {sortField === 'avgPrice' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('currentPrice')}
                >
                  <div className="flex items-center">
                    Current Price
                    {sortField === 'currentPrice' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center">
                    Value
                    {sortField === 'value' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('profit')}
                >
                  <div className="flex items-center">
                    Profit/Loss
                    {sortField === 'profit' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredPortfolio.map((item) => (
                <tr key={item.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/stocks/${item.symbol}`} className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">{item.symbol.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.symbol}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.name}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.shares}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${item.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${
                      item.change >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {item.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      ${item.currentPrice.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${item.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${
                      item.profit >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {item.profit >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      ${Math.abs(item.profit).toFixed(2)} ({item.profitPercent.toFixed(2)}%)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/trading?symbol=${item.symbol}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                    >
                      Trade
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PortfolioTable;
