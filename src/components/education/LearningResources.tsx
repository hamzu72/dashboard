/**
 * This file contains the learning resources component for the education page
 */
import React, { useState } from 'react';
import { EducationalResource } from '../../types';
import { Book, Video, Layers, Filter, Search, Clock, ExternalLink } from 'lucide-react';

/**
 * Props for the LearningResources component
 */
interface LearningResourcesProps {
  resources: EducationalResource[];
}

/**
 * Component for displaying educational resources with filtering and search
 */
const LearningResources: React.FC<LearningResourcesProps> = ({ resources }) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  /**
   * Filters resources based on type, level, and search query
   */
  const getFilteredResources = (): EducationalResource[] => {
    return resources.filter(resource => {
      const matchesType = typeFilter === 'all' || resource.type === typeFilter;
      const matchesLevel = levelFilter === 'all' || resource.level === levelFilter;
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesType && matchesLevel && matchesSearch;
    });
  };

  /**
   * Returns the icon component based on resource type
   */
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Book className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'course':
        return <Layers className="h-5 w-5" />;
      default:
        return <Book className="h-5 w-5" />;
    }
  };

  /**
   * Returns the appropriate color class based on resource level
   */
  const getLevelColorClass = (level: string): string => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredResources = getFilteredResources();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Learning Resources</h2>
        
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="flex space-x-3">
            <div className="relative inline-block">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Types</option>
                  <option value="article">Articles</option>
                  <option value="video">Videos</option>
                  <option value="course">Courses</option>
                </select>
              </div>
            </div>
            
            <div className="relative inline-block">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="block pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredResources.length === 0 ? (
        <div className="p-8 text-center">
          <Book className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No resources found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria to find resources.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredResources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getLevelColorClass(resource.level)}`}>
                    {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
                  </span>
                  <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {resource.duration}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                    {getResourceIcon(resource.type)}
                    <span className="ml-1 text-sm">
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningResources;
