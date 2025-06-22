/**
 * This file contains mock data for the application to simulate API responses
 */
import { Stock, PortfolioItem, Trade, NewsItem, EducationalResource, StockWithHistory, PricePoint } from '../types';

/**
 * Generate random price points for historical data
 */
const generatePriceHistory = (basePrice: number, days: number): PricePoint[] => {
  const history: PricePoint[] = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random price fluctuation between -3% and 3%
    const change = currentPrice * (Math.random() * 0.06 - 0.03);
    currentPrice += change;
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 500000
    });
  }
  
  return history;
};

/**
 * Mock stocks data
 */
export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.72,
    change: 2.35,
    changePercent: 1.33,
    volume: 48572100,
    marketCap: 2812000000000,
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 328.79,
    change: 1.41,
    changePercent: 0.43,
    volume: 21256700,
    marketCap: 2445000000000,
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.65,
    change: -0.30,
    changePercent: -0.21,
    volume: 20123400,
    marketCap: 1791000000000,
    sector: 'Technology'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 145.68,
    change: 1.68,
    changePercent: 1.17,
    volume: 32145600,
    marketCap: 1507000000000,
    sector: 'Consumer Cyclical'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 237.49,
    change: -3.28,
    changePercent: -1.36,
    volume: 97123800,
    marketCap: 753000000000,
    sector: 'Automotive'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 334.92,
    change: 3.74,
    changePercent: 1.13,
    volume: 15628900,
    marketCap: 859000000000,
    sector: 'Technology'
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    price: 615.12,
    change: 10.23,
    changePercent: 1.69,
    volume: 6782300,
    marketCap: 267000000000,
    sector: 'Entertainment'
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    price: 248.36,
    change: 0.89,
    changePercent: 0.36,
    volume: 5421900,
    marketCap: 506000000000,
    sector: 'Financial Services'
  }
];

/**
 * Generate stocks with historical data
 */
export const mockStocksWithHistory: StockWithHistory[] = mockStocks.map(stock => ({
  ...stock,
  history: generatePriceHistory(stock.price, 30)
}));

/**
 * Mock portfolio data
 */
export const mockPortfolio: PortfolioItem[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 10,
    avgPrice: 165.32,
    currentPrice: 178.72,
    change: 2.35,
    changePercent: 1.33,
    value: 1787.20,
    profit: 133.40,
    profitPercent: 8.11
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 5,
    avgPrice: 305.67,
    currentPrice: 328.79,
    change: 1.41,
    changePercent: 0.43,
    value: 1643.95,
    profit: 115.60,
    profitPercent: 7.56
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    shares: 3,
    avgPrice: 252.33,
    currentPrice: 237.49,
    change: -3.28,
    changePercent: -1.36,
    value: 712.47,
    profit: -44.52,
    profitPercent: -5.88
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 8,
    avgPrice: 135.27,
    currentPrice: 145.68,
    change: 1.68,
    changePercent: 1.17,
    value: 1165.44,
    profit: 83.28,
    profitPercent: 7.70
  }
];

/**
 * Mock trades data
 */
export const mockTrades: Trade[] = [
  {
    id: 'trade-001',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'buy',
    shares: 5,
    price: 162.34,
    total: 811.70,
    date: '2023-06-10'
  },
  {
    id: 'trade-002',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'buy',
    shares: 5,
    price: 168.30,
    total: 841.50,
    date: '2023-07-15'
  },
  {
    id: 'trade-003',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'buy',
    shares: 5,
    price: 305.67,
    total: 1528.35,
    date: '2023-08-22'
  },
  {
    id: 'trade-004',
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    type: 'buy',
    shares: 3,
    price: 252.33,
    total: 756.99,
    date: '2023-09-05'
  },
  {
    id: 'trade-005',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    type: 'buy',
    shares: 8,
    price: 135.27,
    total: 1082.16,
    date: '2023-10-17'
  }
];

/**
 * Mock news data
 */
export const mockNews: NewsItem[] = [
  {
    id: 'news-001',
    title: 'Apple Unveils New iPhone 15 with Advanced AI Features',
    summary: 'Apple\'s latest iPhone includes groundbreaking AI capabilities and improved battery life.',
    source: 'Tech Today',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/2caae43e-729a-48c6-bfb6-31c90acb6ea5.jpg',
    date: '2023-11-01',
    relatedSymbols: ['AAPL']
  },
  {
    id: 'news-002',
    title: 'Tesla Reports Record Q3 Deliveries Despite Supply Chain Challenges',
    summary: 'Tesla beats delivery estimates and maintains its growth trajectory despite ongoing supply chain issues.',
    source: 'Auto Insights',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/8c396c37-072b-43c9-a8f4-9a7dcc3be433.jpg',
    date: '2023-10-28',
    relatedSymbols: ['TSLA']
  },
  {
    id: 'news-003',
    title: 'Microsoft Expands Cloud Services with New AI Integration',
    summary: 'New AI-driven features coming to Microsoft Azure as the company strengthens its cloud offerings.',
    source: 'Cloud Computing News',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/be64f002-f651-4907-ab45-bd7f7bde11d6.jpg',
    date: '2023-10-25',
    relatedSymbols: ['MSFT']
  },
  {
    id: 'news-004',
    title: 'Amazon Announces New Fulfillment Centers to Support Holiday Season',
    summary: 'Amazon expands its logistics network with new facilities ahead of expected record holiday sales.',
    source: 'Retail Business Weekly',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/4756d160-3ab3-40b5-8437-457cc44714cf.jpg',
    date: '2023-10-22',
    relatedSymbols: ['AMZN']
  }
];

/**
 * Mock educational resources
 */
export const mockEducationalResources: EducationalResource[] = [
  {
    id: 'edu-001',
    title: 'Understanding Stock Market Basics',
    description: 'Learn the fundamentals of how the stock market works, key terminology, and basic investment strategies.',
    type: 'article',
    level: 'beginner',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/4420236a-a443-4f52-bd16-7f14bb43c622.jpg',
    duration: '10 min read'
  },
  {
    id: 'edu-002',
    title: 'Technical Analysis for Beginners',
    description: 'Introduction to reading charts, recognizing patterns, and using technical indicators to make trading decisions.',
    type: 'video',
    level: 'beginner',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/3c3a3edd-a79f-4cb4-8db1-305d807792b8.jpg',
    duration: '25 min'
  },
  {
    id: 'edu-003',
    title: 'Fundamental Analysis: Evaluating Company Health',
    description: 'How to analyze financial statements, understand key metrics, and evaluate a company\'s long-term potential.',
    type: 'course',
    level: 'intermediate',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/37c9679e-5f66-49f3-963d-9fc224bb46ff.jpg',
    duration: '1.5 hours'
  },
  {
    id: 'edu-004',
    title: 'Portfolio Diversification Strategies',
    description: 'Learn how to balance risk and reward through proper diversification across asset classes and sectors.',
    type: 'article',
    level: 'intermediate',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/765779ea-32ed-4d84-b542-f8dbfe2420e7.jpg',
    duration: '15 min read'
  },
  {
    id: 'edu-005',
    title: 'Advanced Options Trading Techniques',
    description: 'Explore complex options strategies for generating income and hedging risk in various market conditions.',
    type: 'course',
    level: 'advanced',
    url: '#',
    imageUrl: 'https://pub-cdn.sider.ai/u/U0E5HL6G32W/web-coder/68566df8d4661edfdb03fedb/resource/4a938acc-e1a0-4576-bf06-b09d6ff23eb6.jpg',
    duration: '3 hours'
  }
];

/**
 * Mock user account data
 */
export const mockUserAccount = {
  balance: 10000.00,
  portfolioValue: 5309.06,
  totalProfit: 287.76,
  totalProfitPercent: 5.73
};
