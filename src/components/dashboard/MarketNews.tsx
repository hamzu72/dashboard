/**
 * This file contains the market news component for the dashboard
 */
import React from 'react';
import { NewsItem } from '../../types';
import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

/**
 * Props for the MarketNews component
 */
interface MarketNewsProps {
  news: NewsItem[];
}

/**
 * Component for displaying market news articles
 */
const MarketNews: React.FC<MarketNewsProps> = ({ news }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Market News</h2>
        <Link to="/news" className="text-indigo-600 dark:text-indigo-400 text-sm flex items-center hover:text-indigo-500">
          View all news <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      {news.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <Newspaper className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-gray-500 dark:text-gray-400">No market news available at the moment</p>
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition duration-150 ease-in-out"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="h-32 w-full sm:w-48 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.source} · {formatDate(item.date)}
                      </p>
                    </div>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                      <span className="text-xs">Read more</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                  {item.relatedSymbols.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.relatedSymbols.map(symbol => (
                        <Link 
                          key={symbol} 
                          to={`/stocks/${symbol}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                        >
                          {symbol}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Formats a date string to a more readable format
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default MarketNews;
