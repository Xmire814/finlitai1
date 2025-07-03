import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Trophy, X, Lightbulb, BookOpen, CheckCircle, Star, Target, Award, Play } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { QuizQuestion } from '../../types';

export default function LessonInterface() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { lessons, gameState, completeLesson, loseHeart } = useGame();
  
  const lesson = lessons.find(l => l.id === lessonId);
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(gameState.currentHearts);
  const [earnedPoints, setEarnedPoints] = useState(0);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Generate 5+ pages of content for each lesson
  const lessonPages = [
    {
      type: 'intro',
      title: `Welcome to ${lesson.title}`,
      content: lesson.description,
      icon: <BookOpen className="h-12 w-12" />,
      interactive: true
    },
    {
      type: 'concept',
      title: 'Key Concepts',
      content: `Let's explore the fundamental concepts of ${lesson.title.toLowerCase()}. Understanding these basics will help you make better financial decisions.`,
      icon: <Lightbulb className="h-12 w-12" />,
      interactive: true
    },
    {
      type: 'example',
      title: 'Real-World Example',
      content: `Here's how ${lesson.title.toLowerCase()} applies in everyday life. This practical example will help you see the immediate benefits.`,
      icon: <Target className="h-12 w-12" />,
      interactive: true
    },
    {
      type: 'strategy',
      title: 'Action Strategies',
      content: `Now let's learn specific strategies you can implement today to master ${lesson.title.toLowerCase()}.`,
      icon: <Star className="h-12 w-12" />,
      interactive: true
    },
    {
      type: 'tips',
      title: 'Pro Tips',
      content: `Here are expert tips that will accelerate your progress in ${lesson.title.toLowerCase()}.`,
      icon: <Award className="h-12 w-12" />,
      interactive: true
    },
    {
      type: 'practice',
      title: 'Practice Exercise',
      content: `Let's practice what you've learned with an interactive exercise.`,
      icon: <Play className="h-12 w-12" />,
      interactive: true
    }
  ];

  const handleNext = () => {
    if (currentPage < lessonPages.length - 1) {
      setCurrentPage(currentPage + 1);
      setEarnedPoints(prev => prev + 10); // Gamification: points for progress
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const question = lesson.quiz[0];
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setEarnedPoints(prev => prev + 50); // Bonus points for correct answer
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      loseHeart();
      
      if (newHearts <= 0) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
        return;
      }
    }
  };

  const handleComplete = () => {
    completeLesson(lesson.id);
    navigate(`/${lesson.category}`);
  };

  const getCategoryColor = () => {
    switch (lesson.category) {
      case 'spending': return 'from-red-500 to-pink-600';
      case 'investing': return 'from-green-500 to-emerald-600';
      case 'saving': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderPageContent = (page: any) => {
    const baseContent = (
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-primary-600 mb-6 flex justify-center`}
        >
          {page.icon}
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{page.title}</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">{page.content}</p>
      </div>
    );

    if (!page.interactive) return baseContent;

    // Add interactive elements based on page type
    switch (page.type) {
      case 'intro':
        return (
          <div>
            {baseContent}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">What You'll Learn:</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>Core principles and concepts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>Practical strategies you can use today</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span>Real-world examples and case studies</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'concept':
        return (
          <div>
            {baseContent}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-yellow-50 rounded-xl p-6">
                <h4 className="font-semibold text-yellow-900 mb-3">Key Point 1</h4>
                <p className="text-yellow-800">Understanding the fundamentals is crucial for long-term success.</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-green-900 mb-3">Key Point 2</h4>
                <p className="text-green-800">Consistent application leads to measurable results.</p>
              </div>
            </div>
          </div>
        );

      case 'example':
        return (
          <div>
            {baseContent}
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-purple-900 mb-3">💡 Example Scenario</h4>
              <p className="text-purple-800 mb-4">
                Meet Sarah, a 28-year-old professional who successfully applied these principles to improve her financial situation by 40% in just 6 months.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700 italic">"The strategies I learned completely transformed how I think about money. I wish I had known this earlier!"</p>
                <p className="text-gray-600 text-sm mt-2">- Sarah, Course Graduate</p>
              </div>
            </div>
          </div>
        );

      case 'strategy':
        return (
          <div>
            {baseContent}
            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: step * 0.2 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-500"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">Step {step}</h4>
                  <p className="text-gray-700">Implement this specific action to see immediate results in your financial journey.</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'tips':
        return (
          <div>
            {baseContent}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-orange-900 mb-4">🔥 Pro Tips</h4>
              <ul className="space-y-3">
                {['Start small and build momentum', 'Track your progress weekly', 'Celebrate small wins'].map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <Star className="h-5 w-5 text-orange-500 mt-0.5" />
                    <span className="text-orange-800">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'practice':
        return (
          <div>
            {baseContent}
            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-green-900 mb-4">🎯 Quick Practice</h4>
              <p className="text-green-800 mb-4">Think about your current situation and answer this question:</p>
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <p className="text-gray-700 font-medium">How will you apply what you've learned in the next 24 hours?</p>
                <textarea
                  className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Write your action plan here..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return baseContent;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getCategoryColor().replace('to-', 'to-opacity-10 to-')} to-white`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(`/${lesson.category}`)}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Board</span>
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Hearts */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`h-6 w-6 ${
                      i < hearts ? 'text-red-500 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Points */}
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                +{earnedPoints} pts
              </div>
              
              {/* Progress */}
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${getCategoryColor()} h-2 rounded-full transition-all duration-300`}
                  style={{
                    width: `${showQuiz ? 100 : ((currentPage + 1) / lessonPages.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {lesson.title}
                  </h1>
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    Page {currentPage + 1} of {lessonPages.length}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                {renderPageContent(lessonPages[currentPage])}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className={`flex items-center space-x-2 bg-gradient-to-r ${getCategoryColor()} text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                >
                  <span>{currentPage < lessonPages.length - 1 ? 'Next' : 'Take Quiz'}</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Check</h2>
                <p className="text-gray-600">Test your understanding of the lesson</p>
              </div>

              {!showResult ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {lesson.quiz[0].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {lesson.quiz[0].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleAnswerSelect(index)}
                          className={`
                            w-full text-left p-4 rounded-lg border-2 transition-all
                            ${selectedAnswer === index
                              ? `border-primary-500 bg-gradient-to-r ${getCategoryColor().replace('to-', 'to-opacity-10 to-')} to-white text-primary-900`
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }
                          `}
                        >
                          <span className="font-medium mr-3">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className={`bg-gradient-to-r ${getCategoryColor()} text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {isCorrect ? (
                    <div className="text-green-600 mb-6">
                      <Trophy className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Excellent!</h3>
                      <p className="text-lg mb-4">{lesson.quiz[0].explanation}</p>
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <p className="text-green-800 font-semibold">🎉 Bonus: +50 points for correct answer!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-red-600 mb-6">
                      <X className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Not quite right</h3>
                      <p className="text-lg">{lesson.quiz[0].explanation}</p>
                      {hearts <= 0 && (
                        <p className="text-red-700 font-semibold mt-4">
                          You're out of hearts! Returning to dashboard...
                        </p>
                      )}
                    </div>
                  )}

                  {hearts > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleComplete}
                      className={`bg-gradient-to-r ${getCategoryColor()} text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Complete Lesson (+{lesson.xpReward + earnedPoints} XP Total)
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}