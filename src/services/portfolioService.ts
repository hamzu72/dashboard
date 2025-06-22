/**
 * This file provides services for portfolio management
 */
import { PortfolioItem, Trade, UserAccount } from '../types';
import { mockPortfolio, mockTrades, mockUserAccount } from './mockData';

/**
 * Fetches the user's portfolio
 */
export const getPortfolio = (): Promise<PortfolioItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPortfolio);
    }, 500);
  });
};

/**
 * Fetches the user's trade history
 */
export const getTradeHistory = (): Promise<Trade[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrades);
    }, 600);
  });
};

/**
 * Executes a buy trade
 */
export const executeBuyTrade = (symbol: string, shares: number, price: number): Promise<Trade> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stock = mockPortfolio.find(item => item.symbol === symbol);
      const newTrade: Trade = {
        id: `trade-${Date.now()}`,
        symbol,
        name: stock?.name || symbol,
        type: 'buy',
        shares,
        price,
        total: shares * price,
        date: new Date().toISOString().split('T')[0]
      };
      
      resolve(newTrade);
    }, 800);
  });
};

/**
 * Executes a sell trade
 */
export const executeSellTrade = (symbol: string, shares: number, price: number): Promise<Trade> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stock = mockPortfolio.find(item => item.symbol === symbol);
      const newTrade: Trade = {
        id: `trade-${Date.now()}`,
        symbol,
        name: stock?.name || symbol,
        type: 'sell',
        shares,
        price,
        total: shares * price,
        date: new Date().toISOString().split('T')[0]
      };
      
      resolve(newTrade);
    }, 800);
  });
};

/**
 * Fetches the user's account information
 */
export const getUserAccount = (): Promise<UserAccount> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserAccount);
    }, 400);
  });
};
