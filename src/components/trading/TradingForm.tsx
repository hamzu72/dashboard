/**
 * This file contains the trading form component for buying and selling stocks
 */
import React, { useState, useEffect } from 'react';
import { Stock, PortfolioItem, UserAccount } from '../../types';
import { TrendingUp, TrendingDown, DollarSign, Info, AlertCircle } from 'lucide-react';

/**
 * Props for the TradingForm component
 */
interface TradingFormProps {
  stock: Stock;
  portfolio: PortfolioItem[];
  account: UserAccount | null;
  onBuy: (symbol: string, shares: number, price: number) => Promise<void>;
  onSell: (symbol: string, shares: number, price: number) => Promise<void>;
  isProcessing: boolean;
}

/**
 * Component for trading stocks (buy/sell)
 */
const TradingForm: React.FC<TradingFormProps> = ({ 
  stock, 
  portfolio, 
  account, 
  onBuy, 
  onSell, 
  isProcessing 
}) => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [shares, setShares] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Get current position for this stock
  const currentPosition = portfolio.find(item => item.symbol === stock.symbol);
  const sharesOwned = currentPosition?.shares || 0;
  const cashBalance = account?.balance || 0;

  /**
   * Calculate total based on shares input
   */
  useEffect(() => {
    const sharesNum = parseFloat(shares);
    if (!isNaN(sharesNum) && sharesNum > 0) {
      setTotal(sharesNum * stock.price);
    } else {
      setTotal(0);
    }
  }, [shares, stock.price]);

  /**
   * Handle trade type change
   */
  const handleTradeTypeChange = (type: 'buy' | 'sell') => {
    setTradeType(type);
    setShares('');
    setError(null);
    setSuccessMessage(null);
  };

  /**
   * Handle shares input change
   */
  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setShares(value);
      setError(null);
    }
  };

  /**
   * Validate the trade
   */
  const validateTrade = (): boolean => {
    const sharesNum = parseFloat(shares);
    
    if (isNaN(sharesNum) || sharesNum <= 0) {
      setError('Please enter a valid number of shares');
      return false;
    }
    
    if (tradeType === 'buy' && total > cashBalance) {
      setError('Insufficient funds for this purchase');
      return false;
    }
    
    if (tradeType === 'sell' && sharesNum > sharesOwned) {
      setError('You cannot sell more shares than you own');
      return false;
    }
    
    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    if (!validateTrade()) return;
    
    const sharesNum = parseFloat(shares);
    
    try {
      if (tradeType === 'buy') {
        await onBuy(stock.symbol, sharesNum, stock.price);
        setSuccessMessage(`Successfully purchased ${sharesNum} shares of ${stock.symbol}`);
      } else {
        await onSell(stock.symbol, sharesNum, stock.price);
        setSuccessMessage(`Successfully sold ${sharesNum} shares of ${stock.symbol}`);
      }
      setShares('');
    } catch (error) {
      setError('An error occurred while processing your trade');
      console.error('Trade error:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Trade {stock.symbol}</h2>
          <div className="flex items-center mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{stock.name}</span>
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
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">${stock.price.toFixed(2)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Current Price</div>
        </div>
      </div>
      
      <div className="flex mb-6">
        <button
          type="button"
          className={`flex-1 py-2 text-center text-sm font-medium rounded-l-md focus:outline-none ${
            tradeType === 'buy' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleTradeTypeChange('buy')}
        >
          Buy
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-center text-sm font-medium rounded-r-md focus:outline-none ${
            tradeType === 'sell' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => handleTradeTypeChange('sell')}
        >
          Sell
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
          <div className="text-sm text-gray-500 dark:text-gray-400">Available Cash</div>
          <div className="text-lg font-medium text-gray-900 dark:text-gray-100">${cashBalance.toFixed(2)}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
          <div className="text-sm text-gray-500 dark:text-gray-400">Shares Owned</div>
          <div className="text-lg font-medium text-gray-900 dark:text-gray-100">{sharesOwned}</div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="shares" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Shares
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="shares"
              value={shares}
              onChange={handleSharesChange}
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Enter number of shares"
              disabled={isProcessing}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total:</span>
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-red-800 dark:text-red-300">{error}</span>
            </div>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex">
              <Info className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-green-800 dark:text-green-300">{successMessage}</span>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            tradeType === 'buy' 
              ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
              : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
          } ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
        </button>
      </form>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p className="flex items-center">
          <Info className="h-3 w-3 mr-1" />
          Market orders are executed at the current price.
        </p>
      </div>
    </div>
  );
};

export default TradingForm;
