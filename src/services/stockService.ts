/**
 * This file provides services for stock-related data operations
 */
import { Stock, StockWithHistory, NewsItem } from '../types';
import { mockStocks, mockStocksWithHistory, mockNews } from './mockData';

/**
 * Fetches all available stocks
 */
export const getAllStocks = (): Promise<Stock[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStocks);
    }, 500);
  });
};

/**
 * Fetches a specific stock by its symbol
 */
export const getStockBySymbol = (symbol: string): Promise<StockWithHistory | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stock = mockStocksWithHistory.find(s => s.symbol === symbol) || null;
      resolve(stock);
    }, 500);
  });
};

/**
 * Searches stocks by name or symbol
 */
export const searchStocks = (query: string): Promise<Stock[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
        stock.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

/**
 * Fetches the latest market news
 */
export const getMarketNews = (): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNews);
    }, 700);
  });
};

/**
 * Fetches news related to a specific stock
 */
export const getStockNews = (symbol: string): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stockNews = mockNews.filter(news => 
        news.relatedSymbols.includes(symbol)
      );
      resolve(stockNews);
    }, 500);
  });
};
