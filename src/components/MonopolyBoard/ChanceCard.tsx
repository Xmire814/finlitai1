import React from 'react';
import { motion } from 'framer-motion';
import { X, Lightbulb, Users, Gift } from 'lucide-react';
import { FinanceCategory } from '../../types';

interface ChanceCardProps {
  card: {
    title: string;
    content: string;
    reward: string;
  };
  category: FinanceCategory;
  onClose: () => void;
}

export default function ChanceCard({ card, category, onClose }: ChanceCardProps) {
  const getCategoryColor = (category: FinanceCategory) => {
    switch (category) {
      case 'spending': return 'from-red-500 to-pink-600';
      case 'investing': return 'from-green-500 to-emerald-600';
      case 'saving': return 'from-blue-500 to-cyan-600';
      default: return 'from-purple-500 to-pink-600';
    }
  };

  const getCardIcon = () => {
    if (card.title.includes('Community')) return <Users className="h-8 w-8" />;
    return <Lightbulb className="h-8 w-8" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border-4 border-yellow-400"
      >
        {/* Card Header */}
        <div className={`bg-gradient-to-r ${getCategoryColor(category)} text-white p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-white/20 p-4 rounded-full inline-block mb-3"
            >
              {getCardIcon()}
            </motion.div>
            <h2 className="text-xl font-bold mb-2">
              {card.title.includes('Community') ? 'Community Chest' : 'Financial Tip'}
            </h2>
            <p className="text-sm opacity-90">Draw a card</p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
          {/* Card Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            {card.title}
          </h3>

          {/* Card Content */}
          <div className="bg-white rounded-lg p-4 mb-4 border-2 border-yellow-200">
            <p className="text-gray-700 leading-relaxed text-center">
              {card.content}
            </p>
          </div>

          {/* Reward */}
          <div className="bg-green-100 border-2 border-green-300 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span className="font-bold text-green-800">{card.reward}</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${getCategoryColor(category)} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
          >
            Collect Reward
          </motion.button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>
      </motion.div>
    </motion.div>
  );
}