/**
 * This file provides services for educational resources
 */
import { EducationalResource } from '../types';
import { mockEducationalResources } from './mockData';

/**
 * Fetches all educational resources
 */
export const getAllResources = (): Promise<EducationalResource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEducationalResources);
    }, 500);
  });
};

/**
 * Fetches resources filtered by level
 */
export const getResourcesByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): Promise<EducationalResource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredResources = mockEducationalResources.filter(resource => resource.level === level);
      resolve(filteredResources);
    }, 300);
  });
};

/**
 * Fetches resources filtered by type
 */
export const getResourcesByType = (type: 'article' | 'video' | 'course'): Promise<EducationalResource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredResources = mockEducationalResources.filter(resource => resource.type === type);
      resolve(filteredResources);
    }, 300);
  });
};

/**
 * Searches resources by title or description
 */
export const searchResources = (query: string): Promise<EducationalResource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockEducationalResources.filter(resource => 
        resource.title.toLowerCase().includes(query.toLowerCase()) || 
        resource.description.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 400);
  });
};
