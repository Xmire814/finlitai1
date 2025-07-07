import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot, MessageCircle, Send, Lightbulb, DollarSign, TrendingUp, PiggyBank, CreditCard, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const quickPrompts = [
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: "Budget Help",
    prompt: "Help me create my first budget. I earn $4,000 per month and want to save for an emergency fund."
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Investment Advice",
    prompt: "I'm 25 years old with $5,000 to invest. What's the best way to start investing for long-term growth?"
  },
  {
    icon: <PiggyBank className="h-5 w-5" />,
    title: "Emergency Fund",
    prompt: "How much should I save for an emergency fund and what's the best account to keep it in?"
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Debt Strategy",
    prompt: "I have $15,000 in credit card debt across 3 cards. What's the best strategy to pay them off?"
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: "Home Buying",
    prompt: "I want to buy my first home in 2 years. How much should I save for a down payment and what steps should I take?"
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Financial Goals",
    prompt: "Help me set realistic financial goals for the next 5 years. I want to be financially independent."
  }
];

export default function AIBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Financial Coach. I'm here to help you with budgeting, investing, saving, debt management, and any other financial questions you might have. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Budget-related responses
    if (lowerMessage.includes('budget') || lowerMessage.includes('budgeting')) {
      return "Great question about budgeting! Here's my recommendation:\n\n1. **Start with the 50/30/20 rule**: 50% for needs (rent, groceries, utilities), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment.\n\n2. **Track your expenses** for a month to see where your money actually goes.\n\n3. **Use budgeting apps** like Mint, YNAB, or even a simple spreadsheet.\n\n4. **Review and adjust monthly** - budgets aren't set in stone!\n\nBased on your $4,000 monthly income, that would be:\n- $2,000 for needs\n- $1,200 for wants\n- $800 for savings/debt\n\nWould you like me to help you break down any of these categories further?";
    }
    
    // Investment-related responses
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment') || lowerMessage.includes('stock')) {
      return "Excellent! Starting to invest at 25 is one of the smartest financial decisions you can make. Here's my advice for your $5,000:\n\n1. **Emergency fund first**: Make sure you have 3-6 months of expenses saved before investing.\n\n2. **Start with index funds**: Consider low-cost broad market index funds like VTSAX or VTI for diversification.\n\n3. **Use tax-advantaged accounts**: Max out your 401(k) match first, then consider a Roth IRA.\n\n4. **Dollar-cost averaging**: Invest consistently over time rather than all at once.\n\n5. **Stay the course**: Don't panic during market downturns - time in the market beats timing the market.\n\nFor your $5,000, I'd suggest:\n- $3,000 in a total stock market index fund\n- $1,500 in an international index fund\n- $500 in bonds for stability\n\nWant me to explain any of these concepts in more detail?";
    }
    
    // Emergency fund responses
    if (lowerMessage.includes('emergency') || lowerMessage.includes('emergency fund')) {
      return "An emergency fund is crucial for financial security! Here's what I recommend:\n\n**How much to save:**\n- Start with $1,000 as your initial goal\n- Build up to 3-6 months of essential expenses\n- If you have irregular income, aim for 6-12 months\n\n**Best accounts for emergency funds:**\n- High-yield savings account (currently earning 4-5% APY)\n- Money market account\n- Short-term CDs (if you won't need the money soon)\n\n**Top high-yield savings options:**\n- Marcus by Goldman Sachs\n- Ally Bank\n- Capital One 360\n- Discover Bank\n\n**Pro tips:**\n- Keep it separate from your checking account\n- Automate transfers to build it gradually\n- Only use for true emergencies (job loss, medical bills, major repairs)\n\nHow much are your monthly essential expenses? I can help you calculate your target emergency fund amount!";
    }
    
    // Debt-related responses
    if (lowerMessage.includes('debt') || lowerMessage.includes('credit card') || lowerMessage.includes('pay off')) {
      return "Let's tackle that $15,000 credit card debt strategically! Here are two proven methods:\n\n**Debt Avalanche Method (saves most money):**\n1. Pay minimums on all cards\n2. Put extra money toward highest interest rate card first\n3. Once paid off, move to next highest rate\n\n**Debt Snowball Method (builds momentum):**\n1. Pay minimums on all cards\n2. Put extra money toward smallest balance first\n3. Once paid off, move to next smallest balance\n\n**Additional strategies:**\n- Consider a balance transfer to a 0% APR card\n- Call your credit card companies to negotiate lower rates\n- Stop using credit cards while paying them off\n- Consider a side hustle to accelerate payments\n\n**Sample plan for $15,000 debt:**\n- If you can pay $500/month extra: 2.5-3 years\n- If you can pay $750/month extra: 1.5-2 years\n- If you can pay $1,000/month extra: 1-1.5 years\n\nWhat are the interest rates and balances on each card? I can create a specific payoff plan for you!";
    }
    
    // Home buying responses
    if (lowerMessage.includes('home') || lowerMessage.includes('house') || lowerMessage.includes('buy') || lowerMessage.includes('down payment')) {
      return "Buying your first home is exciting! Here's a comprehensive 2-year plan:\n\n**Down Payment Savings:**\n- Conventional loan: 10-20% down (ideal)\n- FHA loan: 3.5% down (first-time buyers)\n- VA loan: 0% down (veterans)\n- USDA loan: 0% down (rural areas)\n\n**Additional costs to save for:**\n- Closing costs: 2-5% of home price\n- Moving expenses: $1,000-$3,000\n- Immediate repairs/furniture: $5,000-$10,000\n\n**Steps for the next 2 years:**\n1. **Improve credit score** (aim for 740+ for best rates)\n2. **Save aggressively** in high-yield savings\n3. **Get pre-approved** 3-6 months before buying\n4. **Research neighborhoods** and home prices\n5. **Find a good realtor** and lender\n\n**Monthly savings needed:**\n- For $300K home (20% down): Save $3,000/month\n- For $300K home (10% down): Save $1,750/month\n- For $200K home (20% down): Save $2,000/month\n\nWhat's your target home price range? I can create a specific savings plan!";
    }
    
    // Financial goals responses
    if (lowerMessage.includes('goal') || lowerMessage.includes('financial independence') || lowerMessage.includes('retire')) {
      return "Financial independence is an amazing goal! Let's create a 5-year roadmap:\n\n**Year 1-2: Foundation Building**\n- Build 6-month emergency fund\n- Pay off high-interest debt\n- Establish good credit (750+ score)\n- Start investing 15-20% of income\n\n**Year 3-4: Wealth Acceleration**\n- Increase income through skills/career growth\n- Max out retirement accounts ($23,000 401k + $7,000 IRA)\n- Consider real estate or side business\n- Invest 25-30% of income\n\n**Year 5: Advanced Strategies**\n- Diversify income streams\n- Optimize tax strategies\n- Consider early retirement planning\n- Aim for 1-2x annual income in investments\n\n**Key milestones by age:**\n- 30: 1x annual salary saved\n- 35: 2x annual salary saved\n- 40: 3x annual salary saved\n- 50: 6x annual salary saved\n- 60: 8x annual salary saved\n\n**Financial Independence Formula:**\n- Save 25x your annual expenses\n- Follow the 4% withdrawal rule\n- Multiple income streams reduce risk\n\nWhat's your current age and income? I can create a personalized timeline for you!";
    }
    
    // Default response
    return "That's a great question! I'm here to help with all aspects of personal finance including:\n\n• **Budgeting & Expense Tracking**\n• **Investment Strategies**\n• **Debt Management**\n• **Emergency Fund Planning**\n• **Home Buying Preparation**\n• **Retirement Planning**\n• **Credit Score Improvement**\n• **Tax Optimization**\n• **Insurance Planning**\n• **Side Hustle Ideas**\n\nCould you provide more details about your specific situation? For example:\n- Your age and income level\n- Current financial goals\n- Any existing debt or savings\n- Timeline for your goals\n\nThe more context you give me, the better I can tailor my advice to your unique situation!";
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputMessage.trim();
    if (!content) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate and add bot response
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: generateBotResponse(content),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FINLIT AI - Your Personal Financial Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized financial advice, explore scenarios, and receive expert guidance tailored to your unique situation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Prompts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Start Topics
              </h3>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-600 group-hover:text-purple-700">
                        {prompt.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {prompt.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {prompt.prompt.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl flex flex-col h-[700px]">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">FINLIT AI Coach</h3>
                    <p className="text-sm opacity-90">Your personal financial mentor</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                        {message.isBot && (
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm text-gray-600">AI Coach</span>
                          </div>
                        )}
                        <div
                          className={`p-4 rounded-2xl ${
                            message.isBot
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </div>
                          <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-white/70'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">AI Coach</span>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl ml-10">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about budgeting, investing, saving, or financial planning..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={2}
                      disabled={isTyping}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-500">
                    💡 Try the quick start topics on the left or ask me anything about personal finance!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Availability</h3>
            <p className="text-gray-600 text-sm">Get financial guidance whenever you need it, day or night.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Advice</h3>
            <p className="text-gray-600 text-sm">Receive tailored recommendations based on your unique situation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expert Knowledge</h3>
            <p className="text-gray-600 text-sm">Access comprehensive financial expertise in an easy-to-understand format.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}