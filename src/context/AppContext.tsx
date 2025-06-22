/**
 * This file provides the global application context and state management
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Stock, PortfolioItem, UserAccount } from '../types';
import { getAllStocks } from '../services/stockService';
import { getPortfolio, getUserAccount } from '../services/portfolioService';

/**
 * Interface for the application context state
 */
interface AppContextState {
  stocks: Stock[];
  portfolio: PortfolioItem[];
  userAccount: UserAccount | null;
  watchlist: Stock[];
  isLoading: boolean;
  isDarkMode: boolean;
  addToWatchlist: (stock: Stock) => void;
  removeFromWatchlist: (symbol: string) => void;
  toggleDarkMode: () => void;
  refreshData: () => Promise<void>;
}

/**
 * Default initial values for the application context
 */
const defaultContextValue: AppContextState = {
  stocks: [],
  portfolio: [],
  userAccount: null,
  watchlist: [],
  isLoading: true,
  isDarkMode: false,
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  toggleDarkMode: () => {},
  refreshData: async () => {},
};

const AppContext = createContext<AppContextState>(defaultContextValue);

/**
 * Props for the AppProvider component
 */
interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider component for the application context
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Fetches initial data when the component mounts
   */
  useEffect(() => {
    refreshData();
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode class if needed
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  /**
   * Refreshes all application data
   */
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const [stocksData, portfolioData, accountData] = await Promise.all([
        getAllStocks(),
        getPortfolio(),
        getUserAccount()
      ]);
      
      setStocks(stocksData);
      setPortfolio(portfolioData);
      setUserAccount(accountData);
      
      // Load saved watchlist
      const savedWatchlist = localStorage.getItem('watchlist');
      if (savedWatchlist) {
        const watchlistSymbols = JSON.parse(savedWatchlist);
        const watchlistStocks = stocksData.filter(stock => 
          watchlistSymbols.includes(stock.symbol)
        );
        setWatchlist(watchlistStocks);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Adds a stock to the watchlist
   */
  const addToWatchlist = (stock: Stock) => {
    if (!watchlist.some(item => item.symbol === stock.symbol)) {
      const newWatchlist = [...watchlist, stock];
      setWatchlist(newWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist.map(item => item.symbol)));
    }
  };

  /**
   * Removes a stock from the watchlist
   */
  const removeFromWatchlist = (symbol: string) => {
    const newWatchlist = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist.map(item => item.symbol)));
  };

  /**
   * Toggles dark mode
   */
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const value = {
    stocks,
    portfolio,
    userAccount,
    watchlist,
    isLoading,
    isDarkMode,
    addToWatchlist,
    removeFromWatchlist,
    toggleDarkMode,
    refreshData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Custom hook to use the application context
 */
export const useAppContext = () => useContext(AppContext);
