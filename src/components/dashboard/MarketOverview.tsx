/**
 * This file contains the market overview component for the dashboard
 */
import React from 'react';
import { TrendingUp, TrendingDown, Percent, DollarSign } from 'lucide-react';
import { Stock } from '../../types';

/**
 * Props for the MarketOverview component
 */
interface MarketOverviewProps {
  stocks: Stock[];
}

/**
 * Component for displaying an overview of the current market status
 */
const MarketOverview: React.FC<MarketOverviewProps> = ({ stocks }) => {
  // Calculate market metrics
  const calculateMarketMetrics = () => {
    if (!stocks.length) return { gainers: 0, losers: 0, avgChange: 0, avgVolume: 0 };

    const gainers = stocks.filter(stock => stock.change > 0).length;
    const losers = stocks.filter(stock => stock.change < 0).length;
    
    const totalChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0);
    const avgChange = totalChange / stocks.length;
    
    const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
    const avgVolume = totalVolume / stocks.length;
    
    return { gainers, losers, avgChange, avgVolume };
  };

  const { gainers, losers, avgChange, avgVolume } = calculateMarketMetrics();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Market Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gainers vs Losers</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{gainers}</span>
                <span className="mx-2 text-gray-500 dark:text-gray-400">:</span>
                <TrendingDown className="h-5 w-5 text-red-500 mr-1" />
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{losers}</span>
              </div>
            </div>
            <div className={`flex items-center justify-center h-12 w-12 rounded-full ${
              gainers > losers ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
            }`}>
              {gainers > losers ? (
                <TrendingUp className="h-6 w-6 text-green-500 dark:text-green-400" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500 dark:text-red-400" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Change</p>
              <div className="flex items-center mt-1">
                <Percent className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                <span className={`text-lg font-medium ${
                  avgChange > 0 
                    ? 'text-green-500 dark:text-green-400' 
                    : 'text-red-500 dark:text-red-400'
                }`}>
                  {avgChange > 0 ? '+' : ''}{avgChange.toFixed(2)}%
                </span>
              </div>
            </div>
            <div className={`flex items-center justify-center h-12 w-12 rounded-full ${
              avgChange > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
            }`}>
              <Percent className={`h-6 w-6 ${
                avgChange > 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
              }`} />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Volume</p>
              <div className="flex items-center mt-1">
                <DollarSign className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1" />
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {avgVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
              <DollarSign className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
