import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Lock, CheckCircle } from 'lucide-react';
import { Lesson, FinanceCategory } from '../../types';

interface CategorySectionProps {
  category: FinanceCategory;
  color: string;
  icon: string;
  lessons: Lesson[];
}

export default function CategorySection({ category, color, icon, lessons }: CategorySectionProps) {
  const completedLessons = lessons.filter(l => l.isCompleted).length;
  const availableLessons = lessons.filter(l => !l.isLocked).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`${color} p-3 rounded-full text-2xl`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 capitalize">
              {category}
            </h3>
            <p className="text-sm text-gray-600">
              {completedLessons}/{lessons.length} completed
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-3 rounded-full ${color}`}
          />
        </div>
      </div>

      {/* Lesson Grid Preview */}
      <div className="grid grid-cols-10 gap-1 mb-6">
        {lessons.slice(0, 50).map((lesson, index) => (
          <motion.div
            key={lesson.id}
            whileHover={{ scale: 1.2 }}
            className={`
              aspect-square rounded-sm flex items-center justify-center text-xs
              ${lesson.isCompleted
                ? 'bg-green-500 text-white'
                : lesson.isLocked
                ? 'bg-gray-200 text-gray-400'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }
            `}
            title={`Lesson ${index + 1}: ${lesson.title}`}
          >
            {lesson.isCompleted ? (
              <CheckCircle className="h-3 w-3" />
            ) : lesson.isLocked ? (
              <Lock className="h-2 w-2" />
            ) : (
              <Play className="h-2 w-2" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <Link
        to={`/category/${category}`}
        className={`
          w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
          ${color} text-white font-semibold hover:opacity-90 transition-opacity
        `}
      >
        <Play className="h-4 w-4" />
        <span>Continue Learning</span>
      </Link>

      {/* Stats */}
      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>{availableLessons} available</span>
        <span>{lessons.length - availableLessons} locked</span>
      </div>
    </motion.div>
  );
}