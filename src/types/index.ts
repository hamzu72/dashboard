/**
 * This file contains all the TypeScript interfaces used throughout the application
 */

/**
 * Represents a stock with its basic information
 */
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

/**
 * Represents a stock with its historical price data
 */
export interface StockWithHistory extends Stock {
  history: PricePoint[];
}

/**
 * Represents a single price point in time
 */
export interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

/**
 * Represents a stock position in a user's portfolio
 */
export interface PortfolioItem {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  value: number;
  profit: number;
  profitPercent: number;
}

/**
 * Represents a trade transaction
 */
export interface Trade {
  id: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  total: number;
  date: string;
}

/**
 * Represents a watchlist item
 */
export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

/**
 * Represents a news article
 */
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl: string;
  date: string;
  relatedSymbols: string[];
}

/**
 * Represents an educational resource
 */
export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course';
  level: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  imageUrl: string;
  duration: string;
}

/**
 * Represents the user's account
 */
export interface UserAccount {
  balance: number;
  portfolioValue: number;
  totalProfit: number;
  totalProfitPercent: number;
}
