/*
  # Create comprehensive lessons and board system

  1. New Tables
    - `lessons`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text, not null)
      - `category` (text, not null) - spending, investing, saving
      - `difficulty` (text, not null) - beginner, intermediate, advanced
      - `estimated_time` (integer, not null) - in minutes
      - `order_index` (integer, not null) - for sequencing
      - `content_sections` (jsonb, not null) - structured lesson content
      - `quiz_questions` (jsonb, not null) - quiz data
      - `xp_reward` (integer, default 100)
      - `is_published` (boolean, default false)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `board_configurations`
      - `id` (uuid, primary key)
      - `category` (text, not null)
      - `position` (integer, not null) - 0-39 for monopoly board
      - `tile_type` (text, not null) - lesson, chance, community, corner
      - `lesson_id` (uuid, nullable, references lessons.id)
      - `title` (text, not null)
      - `description` (text)
      - `created_at` (timestamptz, default now())
    
    - `lesson_interactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `lesson_id` (uuid, references lessons.id)
      - `rating` (integer, check rating between 1 and 5)
      - `comment` (text)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Public read access for lessons and board configurations
    - Authenticated users can create interactions
    - Users can only modify their own interactions

  3. Indexes
    - Optimize for common queries (category, difficulty, order)
    - Full-text search on lesson content
*/

-- Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('spending', 'investing', 'saving')),
  difficulty text NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_time integer NOT NULL DEFAULT 10,
  order_index integer NOT NULL,
  content_sections jsonb NOT NULL DEFAULT '[]',
  quiz_questions jsonb NOT NULL DEFAULT '[]',
  xp_reward integer NOT NULL DEFAULT 100,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(category, order_index)
);

-- Create board configurations table
CREATE TABLE IF NOT EXISTS public.board_configurations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('spending', 'investing', 'saving')),
  position integer NOT NULL CHECK (position >= 0 AND position <= 39),
  tile_type text NOT NULL CHECK (tile_type IN ('lesson', 'chance', 'community', 'corner')),
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(category, position)
);

-- Create lesson interactions table
CREATE TABLE IF NOT EXISTS public.lesson_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, lesson_id)
);

-- Enable Row Level Security
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for lessons table
CREATE POLICY "Published lessons are viewable by everyone"
  ON public.lessons
  FOR SELECT
  USING (is_published = true);

-- Create policies for board configurations table
CREATE POLICY "Board configurations are viewable by everyone"
  ON public.board_configurations
  FOR SELECT
  USING (true);

-- Create policies for lesson interactions table
CREATE POLICY "Users can view all interactions"
  ON public.lesson_interactions
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own interactions"
  ON public.lesson_interactions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions"
  ON public.lesson_interactions
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions"
  ON public.lesson_interactions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER handle_lessons_updated_at
  BEFORE UPDATE ON public.lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_category ON public.lessons(category);
CREATE INDEX IF NOT EXISTS idx_lessons_difficulty ON public.lessons(difficulty);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons(category, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_published ON public.lessons(is_published);
CREATE INDEX IF NOT EXISTS idx_board_category_position ON public.board_configurations(category, position);
CREATE INDEX IF NOT EXISTS idx_interactions_lesson ON public.lesson_interactions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_interactions_user ON public.lesson_interactions(user_id);

-- Create full-text search index for lessons
CREATE INDEX IF NOT EXISTS idx_lessons_search ON public.lessons 
USING gin(to_tsvector('english', title || ' ' || description));

-- Insert sample lessons for spending category
INSERT INTO public.lessons (title, description, category, difficulty, estimated_time, order_index, content_sections, quiz_questions, xp_reward, is_published) VALUES
('Budget Basics', 'Learn to create and manage your first budget effectively', 'spending', 'beginner', 10, 1, 
'[
  {
    "id": "section-1",
    "type": "text",
    "title": "What is a Budget?",
    "content": "A budget is a plan for how you will spend your money. It helps you track income and expenses to ensure you live within your means."
  },
  {
    "id": "section-2",
    "type": "tip",
    "title": "50/30/20 Rule",
    "content": "A simple budgeting method: 50% for needs, 30% for wants, 20% for savings and debt repayment."
  }
]',
'[
  {
    "id": "q1",
    "question": "What percentage of income should go to needs in the 50/30/20 rule?",
    "options": ["30%", "50%", "20%", "40%"],
    "correctAnswer": 1,
    "explanation": "The 50/30/20 rule allocates 50% of income to needs like housing, food, and utilities."
  }
]', 100, true),

('Needs vs Wants', 'Distinguish between essential and optional expenses', 'spending', 'beginner', 8, 2,
'[
  {
    "id": "section-1",
    "type": "text",
    "title": "Understanding Needs vs Wants",
    "content": "Needs are essential for survival and basic functioning. Wants are things that improve your quality of life but are not essential."
  },
  {
    "id": "section-2",
    "type": "example",
    "title": "Examples",
    "content": "Needs: Housing, food, healthcare, transportation to work. Wants: Dining out, entertainment, luxury items."
  }
]',
'[
  {
    "id": "q1",
    "question": "Which of these is a NEED?",
    "options": ["Netflix subscription", "Groceries", "Designer clothes", "Gaming console"],
    "correctAnswer": 1,
    "explanation": "Groceries are essential for nutrition and survival, making them a need rather than a want."
  }
]', 75, true),

('Smart Shopping', 'Get more value for your money with smart shopping strategies', 'spending', 'intermediate', 12, 3,
'[
  {
    "id": "section-1",
    "type": "text",
    "title": "Smart Shopping Strategies",
    "content": "Smart shopping involves planning, comparing prices, and making informed decisions to maximize value."
  },
  {
    "id": "section-2",
    "type": "tip",
    "title": "Money-Saving Tips",
    "content": "Use the 24-hour rule for non-essential purchases. Compare prices across multiple stores. Look for sales and use coupons strategically."
  }
]',
'[
  {
    "id": "q1",
    "question": "What is the 24-hour rule?",
    "options": ["Shop for 24 hours straight", "Wait 24 hours before making non-essential purchases", "Return items within 24 hours", "Shop only during 24-hour sales"],
    "correctAnswer": 1,
    "explanation": "The 24-hour rule helps prevent impulse buying by giving you time to consider if you really need the item."
  }
]', 125, true);

-- Insert sample lessons for investing category
INSERT INTO public.lessons (title, description, category, difficulty, estimated_time, order_index, content_sections, quiz_questions, xp_reward, is_published) VALUES
('Investment Basics', 'Start your wealth building journey with fundamental concepts', 'investing', 'beginner', 15, 1,
'[
  {
    "id": "section-1",
    "type": "text",
    "title": "What is Investing?",
    "content": "Investing is putting money into assets with the expectation of generating income or profit over time."
  },
  {
    "id": "section-2",
    "type": "tip",
    "title": "Key Principle",
    "content": "Time in the market beats timing the market. Start early and invest consistently for the best results."
  }
]',
'[
  {
    "id": "q1",
    "question": "What is the main goal of investing?",
    "options": ["Spending money quickly", "Generating income or profit over time", "Keeping money in a checking account", "Avoiding all financial risk"],
    "correctAnswer": 1,
    "explanation": "The primary goal of investing is to generate income or profit over time by putting money into appreciating assets."
  }
]', 150, true),

('Stock Market 101', 'Understand how the stock market works and basic terminology', 'investing', 'beginner', 12, 2,
'[
  {
    "id": "section-1",
    "type": "text",
    "title": "What is the Stock Market?",
    "content": "The stock market is where shares of publicly traded companies are bought and sold. When you buy stock, you own a small piece of that company."
  },
  {
    "id": "section-2",
    "type": "example",
    "title": "Stock Example",
    "content": "If you buy 10 shares of Apple stock at $150 each, you invest $1,500 and own a tiny fraction of Apple Inc."
  }
]',
'[
  {
    "id": "q1",
    "question": "When you buy stock in a company, you:",
    "options": ["Loan money to the company", "Own a piece of the company", "Guarantee a fixed return", "Become an employee"],
    "correctAnswer": 1,
    "explanation": "Buying stock means you own shares in the company and become a partial owner, not a lender or employee."
  }
]', 125, true);

-- Insert sample lessons for saving category
INSERT INTO public.lessons (title, description, category, difficulty, estimated_time, order_index, content_sections, quiz_questions, xp_reward, is_published) VALUES
('Savings Goals', 'Set and achieve specific financial targets effectively', 'saving', 'beginner', 10, 1,
'[
  {
    "id": "section-1",
    "type": "text",
    "title": "Why Set Savings Goals?",
    "content": "Savings goals give you direction and motivation. They help you prioritize spending and track progress toward financial milestones."
  },
  {
    "id": "section-2",
    "type": "tip",
    "title": "SMART Goals",
    "content": "Make goals Specific, Measurable, Achievable, Relevant, and Time-bound. Example: Save $1,000 for emergency fund in 6 months."
  }
]',
'[
  {
    "id": "q1",
    "question": "What does the T in SMART goals stand for?",
    "options": ["Total", "Time-bound", "Targeted", "Trackable"],
    "correctAnswer": 1,
    "explanation": "Time-bound means setting a specific deadline for achieving your goal, which creates urgency and helps with planning."
  }
]', 100, true),

('Emergency Fund', 'Build 3-6 months of expenses for financial security', 'saving', 'intermediate', 15, 2,
'[
  {
    "id": "section-1",
    "type": "text",
    "title": "What is an Emergency Fund?",
    "content": "An emergency fund is money set aside to cover unexpected expenses like job loss, medical bills, or major repairs."
  },
  {
    "id": "section-2",
    "type": "tip",
    "title": "How Much to Save",
    "content": "Aim for 3-6 months of essential expenses. Start with $1,000 as your initial goal, then build from there."
  }
]',
'[
  {
    "id": "q1",
    "question": "How many months of expenses should an emergency fund cover?",
    "options": ["1-2 months", "3-6 months", "12 months", "24 months"],
    "correctAnswer": 1,
    "explanation": "Financial experts recommend 3-6 months of expenses to cover most emergency situations without going into debt."
  }
]', 150, true);

-- Insert board configurations for spending category
INSERT INTO public.board_configurations (category, position, tile_type, lesson_id, title, description) VALUES
('spending', 0, 'corner', NULL, 'START', 'Begin your smart spending journey!'),
('spending', 1, 'lesson', (SELECT id FROM public.lessons WHERE category = 'spending' AND order_index = 1), 'Budget Basics', 'Learn to create your first budget'),
('spending', 2, 'lesson', (SELECT id FROM public.lessons WHERE category = 'spending' AND order_index = 2), 'Needs vs Wants', 'Distinguish essential from optional expenses'),
('spending', 3, 'chance', NULL, 'FINANCIAL TIP', 'Draw a money-saving tip card'),
('spending', 4, 'lesson', (SELECT id FROM public.lessons WHERE category = 'spending' AND order_index = 3), 'Smart Shopping', 'Master strategic shopping techniques'),
('spending', 5, 'community', NULL, 'COMMUNITY CHEST', 'Learn from others experiences'),
('spending', 6, 'lesson', NULL, 'Subscription Audit', 'Cancel unused subscriptions'),
('spending', 7, 'lesson', NULL, 'Meal Planning', 'Save money on food expenses'),
('spending', 8, 'lesson', NULL, 'Transportation Costs', 'Optimize commute expenses'),
('spending', 9, 'lesson', NULL, 'Housing Decisions', 'Smart rent vs buy choices'),
('spending', 10, 'corner', NULL, 'MILESTONE', 'Quarter way to mastery!'),
('spending', 11, 'lesson', NULL, 'Insurance Basics', 'Protect your finances'),
('spending', 12, 'chance', NULL, 'FINANCIAL TIP', 'Money wisdom awaits'),
('spending', 13, 'lesson', NULL, 'Utility Bills', 'Reduce monthly costs'),
('spending', 14, 'lesson', NULL, 'Entertainment Budget', 'Fun without overspending'),
('spending', 15, 'community', NULL, 'COMMUNITY CHEST', 'Shared financial wisdom'),
('spending', 16, 'lesson', NULL, 'Clothing Budget', 'Dress well affordably'),
('spending', 17, 'lesson', NULL, 'Gift Giving', 'Thoughtful gifts on budget'),
('spending', 18, 'lesson', NULL, 'Emergency Expenses', 'Handle unexpected costs'),
('spending', 19, 'lesson', NULL, 'Seasonal Spending', 'Plan for holidays'),
('spending', 20, 'corner', NULL, 'HALFWAY', 'Halfway to spending mastery!'),
('spending', 21, 'lesson', NULL, 'Impulse Control', 'Overcome buying urges'),
('spending', 22, 'chance', NULL, 'FINANCIAL TIP', 'Smart spending strategy'),
('spending', 23, 'lesson', NULL, 'Price Comparison', 'Find the best deals'),
('spending', 24, 'lesson', NULL, 'Bulk Buying', 'When it saves money'),
('spending', 25, 'community', NULL, 'COMMUNITY CHEST', 'Community savings tips'),
('spending', 26, 'lesson', NULL, 'Quality vs Price', 'Value-based decisions'),
('spending', 27, 'lesson', NULL, 'Cashback Rewards', 'Earn while you spend'),
('spending', 28, 'lesson', NULL, 'Debt Prevention', 'Avoid overspending traps'),
('spending', 29, 'lesson', NULL, 'Financial Tracking', 'Monitor your progress'),
('spending', 30, 'corner', NULL, 'ALMOST THERE', 'Nearly a spending master!'),
('spending', 31, 'lesson', NULL, 'Advanced Budgeting', 'Zero-based budgeting'),
('spending', 32, 'chance', NULL, 'FINANCIAL TIP', 'Expert spending advice'),
('spending', 33, 'lesson', NULL, 'Lifestyle Inflation', 'Avoid spending creep'),
('spending', 34, 'lesson', NULL, 'Frugal Living', 'Live well for less'),
('spending', 35, 'community', NULL, 'COMMUNITY CHEST', 'Frugality success stories'),
('spending', 36, 'lesson', NULL, 'Spending Psychology', 'Understand money mindset'),
('spending', 37, 'lesson', NULL, 'Financial Automation', 'Automate smart spending'),
('spending', 38, 'lesson', NULL, 'Review & Adjust', 'Optimize your system'),
('spending', 39, 'lesson', NULL, 'Spending Mastery', 'Complete your journey');

-- Insert board configurations for investing category
INSERT INTO public.board_configurations (category, position, tile_type, lesson_id, title, description) VALUES
('investing', 0, 'corner', NULL, 'START', 'Begin your investment journey!'),
('investing', 1, 'lesson', (SELECT id FROM public.lessons WHERE category = 'investing' AND order_index = 1), 'Investment Basics', 'Start building wealth'),
('investing', 2, 'lesson', (SELECT id FROM public.lessons WHERE category = 'investing' AND order_index = 2), 'Stock Market 101', 'Understand stocks'),
('investing', 3, 'chance', NULL, 'FINANCIAL TIP', 'Investment wisdom'),
('investing', 4, 'lesson', NULL, 'Index Funds', 'Diversify with low costs'),
('investing', 5, 'community', NULL, 'COMMUNITY CHEST', 'Investor experiences'),
('investing', 6, 'lesson', NULL, 'Risk Tolerance', 'Find your comfort zone'),
('investing', 7, 'lesson', NULL, 'Dollar Cost Averaging', 'Invest consistently'),
('investing', 8, 'lesson', NULL, 'Retirement Accounts', '401k and IRA strategies'),
('investing', 9, 'lesson', NULL, 'Compound Interest', 'Power of compound growth'),
('investing', 10, 'corner', NULL, 'MILESTONE', 'Investment progress!'),
('investing', 11, 'lesson', NULL, 'Asset Allocation', 'Balance your portfolio'),
('investing', 12, 'chance', NULL, 'FINANCIAL TIP', 'Market insights'),
('investing', 13, 'lesson', NULL, 'Real Estate Investing', 'Property investments'),
('investing', 14, 'lesson', NULL, 'Bond Investments', 'Fixed income securities'),
('investing', 15, 'community', NULL, 'COMMUNITY CHEST', 'Investment stories'),
('investing', 16, 'lesson', NULL, 'Market Volatility', 'Stay calm in storms'),
('investing', 17, 'lesson', NULL, 'Investment Fees', 'Minimize costs'),
('investing', 18, 'lesson', NULL, 'Tax-Advantaged Accounts', 'Maximize tax benefits'),
('investing', 19, 'lesson', NULL, 'Rebalancing', 'Maintain allocation'),
('investing', 20, 'corner', NULL, 'HALFWAY', 'Halfway to investment mastery!'),
('investing', 21, 'lesson', NULL, 'Long-term Strategy', 'Build wealth over decades'),
('investing', 22, 'chance', NULL, 'FINANCIAL TIP', 'Advanced strategies'),
('investing', 23, 'lesson', NULL, 'ETFs vs Mutual Funds', 'Choose the right vehicle'),
('investing', 24, 'lesson', NULL, 'International Investing', 'Global diversification'),
('investing', 25, 'community', NULL, 'COMMUNITY CHEST', 'Global investor wisdom'),
('investing', 26, 'lesson', NULL, 'Sector Investing', 'Industry-specific investments'),
('investing', 27, 'lesson', NULL, 'Value vs Growth', 'Investment styles'),
('investing', 28, 'lesson', NULL, 'Dividend Investing', 'Income from stocks'),
('investing', 29, 'lesson', NULL, 'Alternative Investments', 'Beyond stocks and bonds'),
('investing', 30, 'corner', NULL, 'ALMOST THERE', 'Nearly an investment master!'),
('investing', 31, 'lesson', NULL, 'Portfolio Management', 'Advanced strategies'),
('investing', 32, 'chance', NULL, 'FINANCIAL TIP', 'Expert investment advice'),
('investing', 33, 'lesson', NULL, 'Market Analysis', 'Research techniques'),
('investing', 34, 'lesson', NULL, 'Risk Management', 'Protect your wealth'),
('investing', 35, 'community', NULL, 'COMMUNITY CHEST', 'Risk management stories'),
('investing', 36, 'lesson', NULL, 'Investment Psychology', 'Behavioral finance'),
('investing', 37, 'lesson', NULL, 'Tax Strategies', 'Optimize tax efficiency'),
('investing', 38, 'lesson', NULL, 'Estate Planning', 'Wealth transfer'),
('investing', 39, 'lesson', NULL, 'Investment Mastery', 'Complete your journey');

-- Insert board configurations for saving category
INSERT INTO public.board_configurations (category, position, tile_type, lesson_id, title, description) VALUES
('saving', 0, 'corner', NULL, 'START', 'Begin your saving journey!'),
('saving', 1, 'lesson', (SELECT id FROM public.lessons WHERE category = 'saving' AND order_index = 1), 'Savings Goals', 'Set financial targets'),
('saving', 2, 'lesson', (SELECT id FROM public.lessons WHERE category = 'saving' AND order_index = 2), 'Emergency Fund', 'Build financial security'),
('saving', 3, 'chance', NULL, 'FINANCIAL TIP', 'Saving strategies'),
('saving', 4, 'lesson', NULL, 'High-Yield Accounts', 'Maximize interest earnings'),
('saving', 5, 'community', NULL, 'COMMUNITY CHEST', 'Saving success stories'),
('saving', 6, 'lesson', NULL, 'Automatic Savings', 'Pay yourself first'),
('saving', 7, 'lesson', NULL, 'Vacation Fund', 'Save for dream trips'),
('saving', 8, 'lesson', NULL, 'Down Payment', 'Save for home purchase'),
('saving', 9, 'lesson', NULL, 'Sinking Funds', 'Save for known expenses'),
('saving', 10, 'corner', NULL, 'MILESTONE', 'Saving progress!'),
('saving', 11, 'lesson', NULL, 'CD Laddering', 'Maximize certificate deposits'),
('saving', 12, 'chance', NULL, 'FINANCIAL TIP', 'Advanced saving tips'),
('saving', 13, 'lesson', NULL, 'Money Market', 'Higher yield options'),
('saving', 14, 'lesson', NULL, 'Savings Challenges', 'Fun saving methods'),
('saving', 15, 'community', NULL, 'COMMUNITY CHEST', 'Challenge success stories'),
('saving', 16, 'lesson', NULL, 'Round-Up Savings', 'Save spare change'),
('saving', 17, 'lesson', NULL, 'Cashback Rewards', 'Earn while spending'),
('saving', 18, 'lesson', NULL, 'Savings Rate', 'Track your percentage'),
('saving', 19, 'lesson', NULL, 'Financial Milestones', 'Celebrate achievements'),
('saving', 20, 'corner', NULL, 'HALFWAY', 'Halfway to saving mastery!'),
('saving', 21, 'lesson', NULL, 'Retirement Savings', 'Save for golden years'),
('saving', 22, 'chance', NULL, 'FINANCIAL TIP', 'Retirement strategies'),
('saving', 23, 'lesson', NULL, 'Tax-Advantaged Saving', 'HSA and other accounts'),
('saving', 24, 'lesson', NULL, 'Education Savings', '529 plans and more'),
('saving', 25, 'community', NULL, 'COMMUNITY CHEST', 'Education funding stories'),
('saving', 26, 'lesson', NULL, 'Short-term vs Long-term', 'Different saving strategies'),
('saving', 27, 'lesson', NULL, 'Inflation Protection', 'Maintain purchasing power'),
('saving', 28, 'lesson', NULL, 'Savings Automation', 'Set and forget systems'),
('saving', 29, 'lesson', NULL, 'Interest Compounding', 'Grow your savings faster'),
('saving', 30, 'corner', NULL, 'ALMOST THERE', 'Nearly a saving master!'),
('saving', 31, 'lesson', NULL, 'Advanced Strategies', 'Optimize your approach'),
('saving', 32, 'chance', NULL, 'FINANCIAL TIP', 'Expert saving advice'),
('saving', 33, 'lesson', NULL, 'Savings Psychology', 'Understand saving behavior'),
('saving', 34, 'lesson', NULL, 'Goal Prioritization', 'Multiple savings goals'),
('saving', 35, 'community', NULL, 'COMMUNITY CHEST', 'Multi-goal success'),
('saving', 36, 'lesson', NULL, 'Savings Review', 'Regular assessment'),
('saving', 37, 'lesson', NULL, 'Lifestyle Changes', 'Boost saving capacity'),
('saving', 38, 'lesson', NULL, 'Savings Optimization', 'Fine-tune your system'),
('saving', 39, 'lesson', NULL, 'Savings Mastery', 'Complete your journey');