/**
 * This file contains the portfolio summary component for the dashboard
 */
import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, ArrowDownRight, DollarSign, Briefcase } from 'lucide-react';
import { PortfolioItem, UserAccount } from '../../types';

/**
 * Props for the PortfolioSummary component
 */
interface PortfolioSummaryProps {
  portfolio: PortfolioItem[];
  account: UserAccount | null;
}

/**
 * Component for displaying a summary of the user's portfolio
 */
const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ portfolio, account }) => {
  // Calculate portfolio metrics
  const calculateMetrics = () => {
    if (!portfolio.length) return { totalValue: 0, totalProfit: 0, totalProfitPercent: 0 };
    
    const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);
    const totalProfit = portfolio.reduce((sum, item) => sum + item.profit, 0);
    const totalProfitPercent = (totalProfit / (totalValue - totalProfit)) * 100;
    
    return { totalValue, totalProfit, totalProfitPercent };
  };

  const { totalValue, totalProfit, totalProfitPercent } = calculateMetrics();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Portfolio Summary</h2>
        <Link to="/portfolio" className="text-indigo-600 dark:text-indigo-400 text-sm flex items-center hover:text-indigo-500">
          View portfolio <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      {!portfolio.length ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <Briefcase className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-gray-500 dark:text-gray-400 mb-3">You don't have any stocks in your portfolio</p>
          <Link 
            to="/trading" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Trading
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <div className="flex items-center mt-1">
                <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-1" />
                <span className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  ${totalValue.toFixed(2)}
                </span>
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
                  ${Math.abs(totalProfit).toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Profit Percentage</p>
              <div className="flex items-center mt-1">
                {totalProfitPercent >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span className={`text-xl font-medium ${
                  totalProfitPercent >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                }`}>
                  {totalProfitPercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Top Holdings</h3>
          <div className="overflow-hidden">
            <div className="overflow-x-auto -mx-6">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Shares</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {portfolio
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3)
                    .map((item) => (
                      <tr key={item.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/stocks/${item.symbol}`} className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-indigo-800 dark:text-indigo-200">{item.symbol.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.symbol}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{item.name}</div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.shares}
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {account && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Available Cash</p>
                <p className="text-lg font-medium text-blue-800 dark:text-blue-200">${account.balance.toFixed(2)}</p>
              </div>
              <Link 
                to="/trading" 
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Trade Now
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PortfolioSummary;
