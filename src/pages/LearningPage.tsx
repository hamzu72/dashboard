/**
 * This file contains the learning page component
 */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import LearningResources from '../components/education/LearningResources';
import { getAllResources } from '../services/educationService';
import { EducationalResource } from '../types';
import { Loader2, GraduationCap, BookOpen, Lightbulb } from 'lucide-react';

/**
 * Component for the learning page with educational resources
 */
const LearningPage: React.FC = () => {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      setIsLoading(true);
      try {
        const resourcesData = await getAllResources();
        setResources(resourcesData);
      } catch (error) {
        console.error('Error loading educational resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Learning Center</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enhance your investment knowledge with educational resources
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-md p-3">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Articles</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Read in-depth articles about markets and investing
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Videos</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Watch tutorials and expert interviews
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-md p-3">
                <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Courses</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Take comprehensive courses on trading and investing
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading resources...</h2>
            </div>
          </div>
        ) : (
          <LearningResources resources={resources} />
        )}
      </main>
    </div>
  );
};

export default LearningPage;
