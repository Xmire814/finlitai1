import { PiggyBank, TrendingUp, ShoppingCart, Target, Banknote, GitCompareArrows, Brain, Scale, ListChecks, Zap, Lightbulb, Shield } from 'lucide-react';

export type LessonPage = {
  title: string;
  content: string;
  icon?: React.ElementType;
  exercise: FillInTheBlankExercise | MultipleChoiceExercise;
}

export type FillInTheBlankExercise = {
  type: 'fill-in-the-blank';
  question: string;
  correctAnswer: string;
}

export type MultipleChoiceExercise = {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  category: 'Saving' | 'Investing' | 'Spending';
  icon: React.ElementType;
  color: string;
  description: string;
  longDescription: string;
  content: LessonPage[];
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  interactive: boolean;
  requiresAuth?: boolean;
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export const savingLessons: Lesson[] = [
  {
    id: 's1',
    title: 'The Power of Saving',
    category: 'Saving',
    icon: PiggyBank,
    color: 'from-emerald-500 to-green-600',
    description: 'Understand why saving is the foundation of financial freedom.',
    longDescription: 'This lesson introduces the core concepts of saving money, explaining how it provides financial security and opens up future opportunities. You will learn the difference between saving and investing and why both are crucial for a healthy financial life.',
    duration: 10,
    difficulty: 'Easy',
    interactive: true,
    content: [
      {
        title: 'Your Financial Superpower!',
        content: 'Think of saving like charging a superpower. The more you save, the more powerful your financial shield becomes! It protects you from unexpected costs.',
        exercise: {
          type: 'multiple-choice',
          question: 'What does saving act like?',
          options: ['A magic trick', 'A financial shield', 'A video game cheat code'],
          correctAnswerIndex: 1,
          feedback: {
            correct: "That's right! It protects you.",
            incorrect: "It's like a shield, protecting you from unexpected costs."
          }
        }
      },
      {
        title: 'Goals to Plans',
        content: 'Saving isn\'t just hiding money under your bed. It\'s about creating a clear roadmap to get the things you want.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Saving turns your goals into a ___',
          correctAnswer: 'plan',
        }
      },
      {
        title: 'Emergency? No Problem!',
        content: 'What if your phone screen cracks? With savings, you can handle it without stress. That\'s financial security!',
        exercise: {
          type: 'multiple-choice',
          question: 'What does having savings provide?',
          options: ['More friends', 'Financial security', 'A bigger house'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! Savings give you security.',
            incorrect: 'The main benefit is financial security for unexpected events.'
          }
        }
      },
      {
        title: 'Short-Term vs. Long-Term',
        content: 'You can save for short-term goals, like new shoes next month, or long-term goals, like a car in a few years. Both are important!',
        exercise: {
          type: 'multiple-choice',
          question: 'Which of these is a long-term savings goal?',
          options: ['Buying a coffee', 'A new video game this week', 'Saving for college', 'Movie tickets for Friday'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Exactly! College is a major goal that takes years of saving.',
            incorrect: 'A long-term goal is usually something that takes more than a year to save for.'
          }
        }
      },
      {
        title: 'The Cost of Choices',
        content: 'Every time you buy something, you give up the chance to use that money for something else. This is called "opportunity cost."',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The value of the next-best alternative when you make a choice is the ___ cost.',
          correctAnswer: 'opportunity',
        }
      },
      {
        title: 'A Wise Saying',
        content: '"Do not save what is left after spending, but spend what is left after saving." - Warren Buffett',
        icon: Lightbulb,
        exercise: {
          type: 'multiple-choice',
          question: 'According to Warren Buffett, when should you save?',
          options: ['After you buy your wants', 'Before you spend on anything else', 'Only if you have extra money'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s the key! Prioritize saving.',
            incorrect: 'He advises saving first, then spending what remains.'
          }
        }
      },
      {
        title: 'Pay Yourself First',
        content: 'This is the golden rule of personal finance. Before you pay bills or buy groceries, set aside a portion of your income for savings. Treat your savings like a non-negotiable bill you owe to your future self.',
        exercise: {
          type: 'multiple-choice',
          question: 'When should you "Pay Yourself First"?',
          options: ['After paying all bills', 'The moment you receive income', 'If there is money left at the end of the month'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! It should be the very first thing you do with your money.',
            incorrect: 'You should pay yourself first, as soon as you get paid.'
          }
        }
      },
      {
        title: 'Make it Automatic',
        content: 'The easiest way to save is to not think about it. Set up an automatic transfer from your checking account to your savings account every payday. This removes the temptation to spend it.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The easiest way to save consistently is to ___ it.',
          correctAnswer: 'automate'
        }
      }
    ],
    quiz: [
      {
        question: 'What is the main purpose of saving?',
        options: ['To buy whatever you want instantly', 'To prepare for emergencies and future goals', 'To show off to your friends'],
        correctAnswer: 1,
        explanation: 'Saving is primarily about building a safety net for unexpected events and working towards the things you truly want in the future.'
      }
    ]
  },
  {
    id: 's2',
    title: 'Setting Savings Goals',
    category: 'Saving',
    icon: Target,
    color: 'from-emerald-500 to-green-600',
    description: 'Learn how to set effective and motivating savings goals.',
    longDescription: 'Discover the SMART goal framework (Specific, Measurable, Achievable, Relevant, Time-bound) and how to apply it to your savings objectives. This lesson will guide you in creating clear, actionable goals that will keep you motivated on your savings journey.',
    duration: 10,
    difficulty: 'Easy',
    interactive: true,
    content: [
      {
        title: 'What are SMART Goals?',
        content: 'SMART is a powerful acronym to make your goals real. It stands for Specific, Measurable, Achievable, Relevant, and Time-bound.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'SMART is an acronym that helps you set ___ goals.',
          correctAnswer: 'effective'
        }
      },
      {
        title: 'S for Specific',
        content: 'Don\'t just say "I want to save." A specific goal is: "I want to save $500 for a new gaming console."',
        exercise: {
          type: 'multiple-choice',
          question: 'Which of the following is a "Specific" goal?',
          options: ['Save more money', 'Save for a thing', 'Save $500 for a new gaming console'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'That\'s right! A specific goal names the exact amount and the item.',
            incorrect: 'A specific goal should be as precise as possible.'
          }
        }
      },
      {
        title: 'M for Measurable',
        content: 'You need to be able to track your progress. "$500" is measurable. "A lot of money" is not. How will you know when you\'ve succeeded?',
        exercise: {
          type: 'multiple-choice',
          question: 'Which goal is measurable?',
          options: ['Save for a trip', 'Save a bunch of cash', 'Save $20 each week'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Perfect! You can easily measure if you have saved $20 each week.',
            incorrect: 'A measurable goal has a number attached so you can track it.'
          }
        }
      },
      {
        title: 'A for Achievable',
        content: 'A goal must be realistic. Saving $1 million in a year on a $50/week allowance isn\'t achievable. Saving $500 in a year is!',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'An achievable goal must be ___.',
          correctAnswer: 'realistic'
        }
      },
      {
        title: 'R for Relevant',
        content: 'Your goal should matter to you. Why do you want that gaming console? If the goal is important to you, you are more likely to stick with it.',
        exercise: {
          type: 'multiple-choice',
          question: 'A relevant goal is one that...?',
          options: ['Your friends have', 'Is popular on social media', 'Matters to you personally'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Exactly! Your goals should align with your own values and desires.',
            incorrect: 'Relevance is about your personal motivation for the goal.'
          }
        }
      },
      {
        title: 'T for Time-bound',
        content: 'Give your goal a deadline. "I will save $500 for a new gaming console in 6 months." This creates a sense of urgency.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A time-bound goal needs a ___.',
          correctAnswer: 'deadline'
        }
      },
      {
        title: 'Putting It All Together',
        content: 'Weak goal: "I want to save for a vacation." SMART goal: "I will save $100 per month for the next 12 months to have $1,200 for a trip to the beach next summer."',
        exercise: {
          type: 'multiple-choice',
          question: 'The "T" in SMART stands for...?',
          options: ['Terrific', 'Time-bound', 'Tough'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'You got it! A deadline is crucial.',
            incorrect: 'T stands for Time-bound, giving your goal a deadline.'
          }
        }
      },
      {
        title: 'Visualize Your Goal',
        content: 'To stay motivated, visualize achieving your goal. Put a picture of your goal on your wall or as your phone background. This daily reminder keeps you focused.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A daily reminder of your goal helps you stay ___.',
          correctAnswer: 'focused'
        }
      }
    ],
    quiz: [
      {
        question: 'What does "S" stand for in SMART goals?',
        options: ['Simple', 'Specific', 'Savings'],
        correctAnswer: 1,
        explanation: '"S" in SMART goals stands for Specific, meaning your goal should be clear and well-defined.'
      }
    ]
  },
  {
    id: 's3',
    title: 'Your First Savings Plan',
    category: 'Saving',
    icon: Banknote,
    color: 'from-emerald-500 to-green-600',
    description: 'Practical ways to start saving money today.',
    longDescription: 'This lesson gives you simple, powerful techniques to start saving right away. You\'ll learn the most important rule of saving and how to make it automatic and fun.',
    duration: 8,
    difficulty: 'Easy',
    interactive: true,
    content: [
      {
        title: 'The #1 Rule: Pay Yourself First',
        content: 'This means the moment you get money, you put a portion into savings *before* you spend it. Even $5 helps!',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The number one rule of saving is to "Pay Yourself ___"',
          correctAnswer: 'First'
        }
      },
      {
        title: 'Automate Your Savings',
        content: 'The easiest way to pay yourself first is to make it automatic. Set up a recurring transfer from your checking to your savings account each payday.',
        exercise: {
          type: 'multiple-choice',
          question: 'Why should you automate savings?',
          options: ['It\'s a cool trick', 'It builds discipline effortlessly', 'It impresses the bank'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! It removes the need for willpower.',
            incorrect: 'Automating builds the habit of saving without you having to think about it.'
          }
        }
      },
      {
        title: 'Find Extra Money',
        content: 'Look at your spending. Could you make coffee at home instead of buying it? That\'s the "Latte Factor". Small, daily expenses add up to big savings over time.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The idea that small, regular expenses can add up to large amounts is called the ___ Factor.',
          correctAnswer: 'Latte'
        }
      },
      {
        title: 'Choose the Right Account',
        content: 'Don\'t just stuff cash under your mattress. A savings account at a bank is safe and insured.',
        exercise: {
          type: 'multiple-choice',
          question: 'Where is the safest place for your savings?',
          options: ['In your sock drawer', 'In a piggy bank', 'In an insured bank account'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! Bank accounts are insured, meaning your money is protected.',
            incorrect: 'An insured bank account is the safest option.'
          }
        }
      },
      {
        title: 'High-Yield Savings Accounts',
        content: 'For even better results, look for a "High-Yield" savings account (HYSA). They pay much more interest than traditional savings accounts, helping your money grow faster.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the main benefit of a HYSA?',
          options: ['A cool debit card', 'Higher interest rates', 'More branch locations'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! More interest means your savings grow faster on their own.',
            incorrect: 'The key benefit is a higher interest rate on your balance.'
          }
        }
      },
      {
        title: 'Track Your Progress',
        content: 'Watching your savings balance grow is incredibly motivating! Check in on your account regularly to see how far you\'ve come. This reinforces your good habits.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Watching your savings grow is very ___.',
          correctAnswer: 'motivating'
        }
      },
      {
        title: 'Celebrate Milestones',
        content: 'When you reach a small goal (like your first $100 saved), celebrate! This doesn\'t mean spending all your savings. A small, free reward, like relaxing with a movie, can keep you going.',
        exercise: {
          type: 'multiple-choice',
          question: 'Why should you celebrate savings milestones?',
          options: ['To show off', 'To reward your good habits', 'Because you have to spend the money'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s right! Positive reinforcement helps you stick to the plan.',
            incorrect: 'Celebrating reinforces the good behavior and keeps you motivated.'
          }
        }
      },
      {
        title: 'Your Plan is a Living Thing',
        content: 'Your savings plan isn\'t set in stone. As your income or goals change, review and adjust your plan. The key is to always have one!',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'You should ___ and adjust your plan as your life changes.',
          correctAnswer: 'review'
        }
      }
    ],
    quiz: [
      {
        question: 'What is the "Pay Yourself First" rule?',
        options: ['Buy yourself a treat with every paycheck', 'Put money into savings before you spend on other things', 'Only pay for things that are for you'],
        correctAnswer: 1,
        explanation: '"Pay Yourself First" is a core savings principle. It prioritizes your future goals over immediate spending.'
      }
    ]
  },
  {
    id: 's4',
    title: 'Sinking Funds',
    category: 'Saving',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-green-600',
    description: 'Prepare for large, planned expenses without stress.',
    longDescription: 'Learn how to create "sinking funds" – dedicated savings pots for specific, foreseeable future expenses like a new phone, car repairs, or holiday gifts. This proactive strategy prevents financial shock.',
    duration: 12,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What is a Sinking Fund?',
        content: 'A sinking fund is a strategy where you save a small amount of money regularly for a specific, large purchase in the future. It turns a scary big expense into manageable small steps.',
        exercise: {
          type: 'multiple-choice',
          question: 'A sinking fund is for what kind of expenses?',
          options: ['Daily coffees', 'Unexpected emergencies', 'Specific, planned future purchases'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Exactly! It\'s for things you know are coming.',
            incorrect: 'Sinking funds are for planned, non-emergency expenses.'
          }
        }
      },
      {
        title: 'Sinking Fund vs. Emergency Fund',
        content: 'An emergency fund is for true surprises, like a job loss. A sinking fund is for planned events, like knowing you\'ll need new tires in a year. They are separate and both important.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'An emergency fund is for ___, while a sinking fund is for planned costs.',
          correctAnswer: 'surprises'
        }
      },
      {
        title: 'How to Start',
        content: '1. Identify the expense (e.g., New Laptop). 2. Determine the total cost ($1,200). 3. Set a deadline (12 months). 4. Calculate your monthly contribution ($1,200 / 12 = $100).',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the final step in setting up the fund?',
          options: ['Identify the expense', 'Set a deadline', 'Calculate the regular contribution'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! This tells you exactly how much to save each period.',
            incorrect: 'The last step is to calculate how much you need to save regularly.'
          }
        }
      },
      {
        title: 'Where to Keep It',
        content: 'It\'s best to keep your sinking funds in a separate savings account, away from your emergency fund and checking account. This reduces the temptation to spend it on other things.',
        exercise: {
          type: 'multiple-choice',
          question: 'Why keep sinking funds in a separate account?',
          options: ['To hide it from the bank', 'To earn higher interest', 'To avoid accidentally spending it'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Exactly! Separation is key to success.',
            incorrect: 'Keeping it separate helps you stay disciplined and not spend it.'
          }
        }
      },
      {
        title: 'Label Everything',
        content: 'If your bank allows, create multiple savings accounts and label them with their purpose: "Vacation Fund," "New Car Fund," "Holiday Gifts." This makes your goals tangible.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Labeling your funds makes your goals more ___.',
          correctAnswer: 'tangible'
        }
      },
      {
        title: 'Automate Contributions',
        content: 'Just like your main savings, automate the contributions to your sinking funds. Set up automatic transfers for every payday. This ensures you consistently fund your future goals.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the best way to ensure you contribute regularly?',
          options: ['Rely on memory', 'Automate the transfers', 'Use a sticky note'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! Automation builds the habit for you.',
            incorrect: 'Automating the transfers is the most reliable method.'
          }
        }
      },
      {
        title: 'Adjust as Needed',
        content: 'If the cost of your goal changes, or if your income changes, don\'t be afraid to adjust your monthly contribution. A plan that adapts is better than no plan at all.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A financial plan should be flexible enough to ___.',
          correctAnswer: 'adapt'
        }
      },
      {
        title: 'Peace of Mind',
        content: 'The biggest benefit of sinking funds is peace of mind. When the large expense finally arrives, you can pay for it in cash without stress or going into debt. You planned for it!',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the ultimate benefit of a sinking fund?',
          options: ['Getting more stuff', 'Financial peace of mind', 'Impressing your friends'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s right! It removes the stress from big purchases.',
            incorrect: 'The greatest benefit is the peace of mind it provides.'
          }
        }
      }
    ]
  },
  {
    id: 's5',
    title: 'Cutting Expenses',
    category: 'Saving',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-green-600',
    description: 'Find and eliminate spending leaks to supercharge your savings.',
    longDescription: 'This lesson provides practical strategies for auditing your spending, identifying non-essential costs, and making conscious decisions to reduce them. Learn about the "Big Three" expenses and how small changes can lead to significant savings.',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The "Aha!" Moment',
        content: 'The first step to cutting expenses is tracking your spending. When you see exactly where your money goes each month, you\'ll find surprising "spending leaks" you can easily plug.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'To find what to cut, you must first ___ your spending.',
          correctAnswer: 'track'
        }
      },
      {
        title: 'The "Big Three"',
        content: 'For most people, the three largest expense categories are housing, transportation, and food. Small reductions in these areas have a much bigger impact than cutting out tiny things.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which of these is one of the "Big Three" expenses?',
          options: ['Coffee', 'Streaming services', 'Food'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! Housing, transportation, and food are the major expense categories.',
            incorrect: 'Food is one of the "Big Three".'
          }
        }
      },
      {
        title: 'Food: The Tasty Leak',
        content: 'Eating out and food delivery are major budget-killers. Planning meals, cooking at home, and packing your lunch are the most effective ways to reduce your food spending significantly.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the best way to cut food costs?',
          options: ['Ordering from cheaper restaurants', 'Cooking at home', 'Skipping meals'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! Cooking at home gives you the most control and savings.',
            incorrect: 'Cooking your own meals is the most powerful way to save on food.'
          }
        }
      },
      {
        title: 'Subscription Audit',
        content: 'Go through your bank statements and list every recurring subscription: streaming, apps, gym memberships, etc. Cancel anything you don\'t use regularly. Be ruthless!',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'You should perform a ___ audit to find recurring charges.',
          correctAnswer: 'subscription'
        }
      },
      {
        title: 'Negotiate Your Bills',
        content: 'Many recurring bills, like for your phone or internet, are negotiable. Call the provider, tell them you are considering switching, and ask for a better rate. You\'d be surprised how often it works.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which bills can you often negotiate?',
          options: ['Your rent', 'Your electricity bill', 'Your phone bill'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! Service providers like for phone and internet often have retention deals.',
            incorrect: 'Bills for competitive services like phone, cable, and internet are often negotiable.'
          }
        }
      },
      {
        title: 'The 30-Day Rule',
        content: 'For any non-essential "want," instead of buying it, write it down and wait 30 days. After a month, the impulse will likely have faded, and you can make a more rational decision.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'For a non-essential purchase, you can try waiting ___ days.',
          correctAnswer: '30'
        }
      },
      {
        title: 'DIY & Thrifting',
        content: 'Before buying new, ask yourself: Can I repair it? Can I borrow it? Can I buy it secondhand? Adopting a thrift-first mindset can save you thousands over time.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is a "thrift-first" mindset?',
          options: ['Only buying expensive things', 'Considering secondhand before new', 'Never spending money'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s it! It\'s about being resourceful.',
            incorrect: 'It means checking if you can get the item used or for free before buying new.'
          }
        }
      },
      {
        title: 'Redirect Your Savings',
        content: 'When you successfully cut an expense, don\'t just let that money get absorbed back into your spending. Immediately set up a transfer to redirect that amount to your savings or investment account.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'You should ___ the money you save to your savings goals.',
          correctAnswer: 'redirect'
        }
      }
    ]
  },
  {
    id: 's6',
    title: 'Understanding Debt',
    category: 'Saving',
    icon: Brain,
    color: 'from-emerald-500 to-green-600',
    description: 'Learn about good debt vs. bad debt.',
    longDescription: 'Not all debt is created equal. This lesson explores the difference between "good debt" that can help you build wealth (like a mortgage) and "bad debt" that drains your wealth (like high-interest credit card debt).',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What is Debt?',
        content: 'Debt is money you owe to someone else. While it can be a useful tool, it can also be a major obstacle to your financial goals if not managed carefully.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Debt is ___ you owe to someone else.',
          correctAnswer: 'money'
        }
      },
      {
        title: 'Good Debt',
        content: 'Good debt is an investment that will grow in value or generate long-term income. Examples include a mortgage for a house or a student loan for a valuable degree.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which is an example of "good debt"?',
          options: ['A loan for a luxury car', 'A student loan for a high-paying career', 'A loan for a vacation'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! It\'s an investment in your future earning potential.',
            incorrect: 'A student loan is considered good debt if it leads to a good job.'
          }
        }
      },
      {
        title: 'Bad Debt',
        content: 'Bad debt is money borrowed to buy things that lose value and do not generate income. High-interest credit card debt for discretionary purchases is a classic example.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which is an example of "bad debt"?',
          options: ['A mortgage', 'A business loan', 'Credit card debt for a shopping spree'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! This is borrowing for consumption, which is a financial drain.',
            incorrect: 'Debt for depreciating assets or consumption is bad debt.'
          }
        }
      },
      {
        title: 'The Danger of Interest',
        content: 'When you borrow money, you pay interest. With bad debt, high interest rates can cause the amount you owe to balloon, making it very difficult to pay off.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'High ___ rates can make bad debt grow quickly.',
          correctAnswer: 'interest'
        }
      },
      {
        title: 'The Debt Snowball',
        content: 'A popular method to pay off debt is the "debt snowball." You list your debts from smallest to largest, regardless of interest rate. You make minimum payments on all but the smallest, which you attack with everything you can. Once it\'s paid off, you roll that payment into the next-smallest debt.',
        exercise: {
          type: 'multiple-choice',
          question: 'In the debt snowball method, which debt do you pay off first?',
          options: ['The one with the highest interest', 'The largest debt', 'The smallest debt'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! The quick win from paying off the smallest debt provides motivation.',
            incorrect: 'You focus on the smallest balance first to build momentum.'
          }
        }
      },
      {
        title: 'The Debt Avalanche',
        content: 'The "debt avalanche" method is mathematically faster. You list your debts by interest rate, from highest to lowest. You make minimum payments on all but the one with the highest interest rate, which you attack. This saves you the most money on interest.',
        exercise: {
          type: 'multiple-choice',
          question: 'The debt avalanche method saves you the most money on what?',
          options: ['Time', 'Interest', 'Taxes'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! By tackling the highest-rate debt first, you reduce the total interest paid.',
            incorrect: 'It saves the most money on interest payments over time.'
          }
        }
      },
      {
        title: 'Your Credit Score',
        content: 'How you manage debt is a major factor in your credit score. Paying bills on time and keeping debt levels low will increase your score, making it easier and cheaper to borrow money in the future when you need it for good debt.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Paying your bills on time helps to improve your credit ___.',
          correctAnswer: 'score'
        }
      },
      {
        title: 'Living Debt-Free',
        content: 'The ultimate goal for most personal finance is to eliminate bad debt entirely. Living without the burden of high-interest payments frees up your income to save, invest, and build the life you want.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the main advantage of being free from bad debt?',
          options: ['You have more cards', 'You have more income free for your goals', 'You never have to budget'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s right! Your money works for you, not for the bank.',
            incorrect: 'The key benefit is having more of your own money to use for your goals.'
          }
        }
      }
    ]
  },
  {
    id: 's7',
    title: 'Retirement Savings 101',
    category: 'Saving',
    icon: Brain,
    color: 'from-emerald-500 to-green-600',
    description: 'An early look at saving for the long-term future.',
    longDescription: 'It\'s never too early to learn about retirement. This lesson introduces the concept of retirement accounts like a 401(k) or an IRA and explains why starting to save in your teens or twenties is the most powerful financial decision you can make.',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What is Retirement?',
        content: 'Retirement is the point when you choose to leave the workforce permanently. To do this comfortably, you need to have saved enough money to live on for the rest of your life.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Retirement means you have enough ___ to no longer need to work.',
          correctAnswer: 'money'
        }
      },
      {
        title: 'The Power of Time',
        content: 'Because of compound interest, the earlier you start saving for retirement, the less you have to save overall. Someone who starts at 20 will have a much easier time than someone who starts at 40.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is your biggest advantage when saving for retirement young?',
          options: ['A high salary', 'Time', 'Stock market knowledge'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! Time is the magic ingredient for compound growth.',
            incorrect: 'Time is your most powerful asset.'
          }
        }
      },
      {
        title: 'What is a 401(k)?',
        content: 'A 401(k) is a retirement savings plan sponsored by an employer. It lets workers save and invest a piece of their paycheck before taxes are taken out.',
        exercise: {
          type: 'multiple-choice',
          question: 'Who sponsors a 401(k) plan?',
          options: ['The government', 'A bank', 'An employer'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! It\'s an employer-sponsored plan.',
            incorrect: 'A 401(k) is a benefit offered by an employer.'
          }
        }
      },
      {
        title: 'The Magic of the "Match"',
        content: 'Many employers offer a "401(k) match." This means if you contribute a certain percentage of your salary, your employer will contribute money for you as well. It is free money and you should always take it.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'An employer\'s 401(k) contribution is called a ___.',
          correctAnswer: 'match'
        }
      },
      {
        title: 'What is an IRA?',
        content: 'An Individual Retirement Arrangement (IRA) is an account you open on your own, separate from an employer. It\'s a great tool if you\'re self-employed or if your job doesn\'t offer a 401(k).',
        exercise: {
          type: 'multiple-choice',
          question: 'Who opens an IRA?',
          options: ['An individual', 'An employer', 'A school'],
          correctAnswerIndex: 0,
          feedback: {
            correct: 'Correct! "I" is for Individual.',
            incorrect: 'An IRA is opened by an individual.'
          }
        }
      },
      {
        title: 'Traditional vs. Roth',
        content: 'There are two main types of IRAs: Traditional and Roth. With a Traditional IRA, you get a tax break now. With a Roth IRA, you pay taxes now, and your withdrawals in retirement are tax-free. Many financial experts recommend a Roth IRA for young people.',
        exercise: {
          type: 'multiple-choice',
          question: 'With which account are withdrawals in retirement tax-free?',
          options: ['Traditional IRA', '401(k)', 'Roth IRA'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'That\'s right! Roth means you pay taxes upfront for tax-free growth.',
            incorrect: 'A Roth IRA allows for tax-free withdrawals in retirement.'
          }
        }
      },
      {
        title: 'How Much to Save?',
        content: 'A common guideline is to save 15% of your pre-tax income for retirement. This can seem like a lot, but by starting early and being consistent, you can reach this goal.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A common guideline is to save ___% of your income for retirement.',
          correctAnswer: '15'
        }
      },
      {
        title: 'Don\'t Touch It!',
        content: 'The money in your retirement accounts is for retirement. Withdrawing it early comes with heavy taxes and penalties. You should treat this money as if it is locked away until your late 50s or 60s.',
        exercise: {
          type: 'multiple-choice',
          question: 'What happens if you withdraw retirement funds early?',
          options: ['You get a bonus', 'Nothing', 'You face taxes and penalties'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. There are significant penalties for early withdrawal.',
            incorrect: 'You will have to pay taxes and penalties.'
          }
        }
      }
    ]
  },
  {
    id: 's8',
    title: 'Building an Emergency Fund',
    category: 'Saving',
    icon: Shield,
    color: 'from-emerald-500 to-green-600',
    description: 'Create a financial buffer for life\'s unexpected turns.',
    longDescription: 'This lesson explains the critical importance of an emergency fund. You will learn how much to save, where to keep the money, and what constitutes a true emergency, giving you a financial shield against the unexpected.',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What Is It?',
        content: 'An emergency fund is a stash of money set aside to cover the financial surprises life throws your way. It is your first line of defense against debt when things go wrong.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'An emergency fund is your first defense against ___.',
          correctAnswer: 'debt'
        }
      },
      {
        title: 'Why It\'s Crucial',
        content: 'Without an emergency fund, an unexpected car repair or medical bill could force you to take on high-interest credit card debt, setting your financial goals back for years.',
        exercise: {
          type: 'multiple-choice',
          question: 'An emergency fund prevents you from needing to use...?',
          options: ['Your checking account', 'High-interest debt', 'Your investment account'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! It protects you from bad debt.',
            incorrect: 'It keeps you from having to rely on high-interest debt.'
          }
        }
      },
      {
        title: 'How Much to Save?',
        content: 'A fully funded emergency fund should cover 3 to 6 months of your essential living expenses. This includes rent, utilities, food, and transportation.',
        exercise: {
          type: 'multiple-choice',
          question: 'How much should a full emergency fund cover?',
          options: ['1 month of expenses', '1 year of expenses', '3-6 months of expenses'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! This gives you a strong safety net.',
            incorrect: 'The standard advice is 3 to 6 months of essential expenses.'
          }
        }
      },
      {
        title: 'Start Small',
        content: 'Saving 3-6 months of expenses can feel daunting. The first goal should be to save a starter emergency fund of $500 or $1,000. This smaller amount can still protect you from many common mishaps.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A good starter emergency fund goal is $___.',
          correctAnswer: '1000'
        }
      },
      {
        title: 'Where to Keep It',
        content: 'Your emergency fund must be liquid, meaning you can access it quickly. A high-yield savings account is perfect. It\'s separate from your checking, but you can get the money in 1-2 days.',
        exercise: {
          type: 'multiple-choice',
          question: 'What does "liquid" mean in this context?',
          options: ['The money is wet', 'The money is invested in water stocks', 'The money is easy to access quickly'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! It needs to be readily available.',
            incorrect: 'Liquid means it can be converted to cash quickly and easily.'
          }
        }
      },
      {
        title: 'What Is a Real Emergency?',
        content: 'A real emergency is something that is unexpected, necessary, and urgent. Job loss, a medical emergency, or essential home repairs are emergencies. A sale on shoes is not.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which of these is a real emergency?',
          options: ['A surprise concert ticket', 'Your car breaking down', 'A limited-time sale'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! An essential car repair is unexpected and necessary.',
            incorrect: 'A true emergency is unexpected and essential.'
          }
        }
      },
      {
        title: 'Replenish After Use',
        content: 'If you have to use your emergency fund, that\'s what it\'s there for! Don\'t feel guilty. Your top priority after the emergency is over should be to pause other savings goals and rebuild the fund back to its previous level.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'After using your emergency fund, your top priority is to ___ it.',
          correctAnswer: 'rebuild'
        }
      },
      {
        title: 'The Foundation of Wealth',
        content: 'No matter how much you earn or how well you invest, without an emergency fund, your financial house is built on a shaky foundation. It is the bedrock of financial security.',
        exercise: {
          type: 'multiple-choice',
          question: 'An emergency fund provides financial ___',
          options: ['complexity', 'risk', 'security'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'That\'s right! It\'s your safety net.',
            incorrect: 'It provides a foundation of financial security.'
          }
        }
      }
    ]
  },
  {
    id: 's9',
    title: 'Saving for a Down Payment',
    category: 'Saving',
    icon: Target,
    color: 'from-emerald-500 to-green-600',
    description: 'Learn the steps to save for one of life\'s biggest purchases.',
    longDescription: 'Buying a house is a major financial goal for many. This lesson breaks down the process of saving for a down payment, explaining what it is, how much you need, and the types of accounts that can help you get there faster.',
    duration: 15,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What is a Down Payment?',
        content: 'A down payment is the portion of a home\'s purchase price that you pay upfront in cash. The rest is covered by a loan from a bank called a mortgage.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The part of a home purchase you pay in cash is the ___ payment.',
          correctAnswer: 'down'
        }
      },
      {
        title: 'Why It Matters',
        content: 'A larger down payment means you borrow less money. This results in a smaller monthly mortgage payment and less total interest paid over the life of the loan.',
        exercise: {
          type: 'multiple-choice',
          question: 'A larger down payment leads to...',
          options: ['A larger monthly payment', 'A smaller monthly payment', 'No monthly payment'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! You borrowed less, so you owe less each month.',
            incorrect: 'A larger down payment reduces your monthly mortgage payment.'
          }
        }
      },
      {
        title: 'The 20% Myth',
        content: 'You may have heard you need a 20% down payment to buy a house. While 20% helps you avoid an extra fee called Private Mortgage Insurance (PMI), many people buy homes with as little as 3-5% down.',
        exercise: {
          type: 'multiple-choice',
          question: 'What fee can you avoid with a 20% down payment?',
          options: ['Property Taxes', 'Homeowners Insurance', 'Private Mortgage Insurance (PMI)'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! PMI protects the lender if you have a smaller down payment.',
            incorrect: 'A 20% down payment helps you avoid PMI.'
          }
        }
      },
      {
        title: 'How Much to Save?',
        content: 'First, research home prices in your desired area. Then, decide on a target down payment percentage (e.g., 10%). If homes cost $300,000, you would need to save $30,000.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Your target amount depends on home prices and your target ___.',
          correctAnswer: 'percentage'
        }
      },
      {
        title: 'It\'s a Sinking Fund!',
        content: 'Saving for a down payment is a perfect use for a sinking fund. Create a dedicated, high-yield savings account labeled "House Fund" and set up automatic, recurring contributions.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the best type of account for a down payment fund?',
          options: ['A checking account', 'A retirement account', 'A high-yield savings account'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! It needs to be safe and liquid, but still earn some interest.',
            incorrect: 'A high-yield savings account is the ideal place for these savings.'
          }
        }
      },
      {
        title: 'Boost Your Savings Rate',
        content: 'Saving for a house is a major goal that often requires increasing your savings rate. This means making temporary sacrifices, like cutting back on vacations or dining out, to reach your goal faster.',
        exercise: {
          type: 'multiple-choice',
          question: 'Saving for a down payment often requires you to...',
          options: ['Invest more aggressively', 'Temporarily reduce other spending', 'Get a new credit card'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! It\'s a big goal that requires focus.',
            incorrect: 'It often requires making short-term spending sacrifices.'
          }
        }
      },
      {
        title: 'Don\'t Forget Closing Costs',
        content: 'In addition to the down payment, you\'ll need cash for "closing costs." These are fees for the appraisal, inspection, and legal paperwork. They typically amount to 2-5% of the home\'s purchase price.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Besides the down payment, you need cash for ___ costs.',
          correctAnswer: 'closing'
        }
      },
      {
        title: 'The Journey is Worth It',
        content: 'Saving for a down payment is a long and challenging journey. But achieving the goal of homeownership is a major milestone in building long-term wealth and stability.',
        exercise: {
          type: 'multiple-choice',
          question: 'Homeownership is a major milestone for building long-term ___',
          options: ['debt', 'stress', 'wealth'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'That\'s the goal! A house is a valuable asset.',
            incorrect: 'It is a key part of building long-term wealth.'
          }
        }
      }
    ]
  },
  {
    id: 's10',
    title: 'Financial Independence 101',
    category: 'Saving',
    icon: Target,
    color: 'from-emerald-500 to-green-600',
    description: 'Understand the concept of FI and how to calculate your number.',
    longDescription: 'This lesson introduces the concept of Financial Independence (FI) - the point at which your assets generate enough income to cover your living expenses forever. Learn about the 4% rule and how to calculate your own FI number.',
    duration: 15,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What is Financial Independence?',
        content: 'Financial Independence (FI) means you no longer *have* to work for money. Your investments and assets generate enough income to cover all of your expenses. Work becomes a choice, not a necessity.',
        exercise: {
          type: 'multiple-choice',
          question: 'What does FI allow you to do?',
          options: ['Buy anything you want', 'Stop paying taxes', 'Make work optional'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! It\'s about freedom of time.',
            incorrect: 'FI makes work optional, not a requirement.'
          }
        }
      },
      {
        title: 'FI vs. Retirement',
        content: 'Traditional retirement is often associated with an age (like 65). Financial Independence is associated with a number. You can reach FI at any age, whether it\'s 35 or 75. It\'s about when your assets can support you.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Retirement is an age, but FI is a ___.',
          correctAnswer: 'number'
        }
      },
      {
        title: 'Finding Your FI Number',
        content: 'A common way to calculate your FI number is to take your estimated annual expenses in retirement and multiply them by 25. For example, if you need $40,000 per year to live, your FI number is $1 million.',
        exercise: {
          type: 'multiple-choice',
          question: 'How do you calculate your FI number?',
          options: ['Annual expenses / 25', 'Annual expenses * 25', 'Annual income * 25'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! This is the core calculation.',
            incorrect: 'You multiply your expected annual expenses by 25.'
          }
        }
      },
      {
        title: 'The 4% Safe Withdrawal Rate',
        content: 'The "multiply by 25" rule comes from the 4% rule. This is a guideline that suggests you can safely withdraw 4% of your investment portfolio value each year in retirement without running out of money.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The FI number is based on the ___% safe withdrawal rate.',
          correctAnswer: '4'
        }
      },
      {
        title: 'The Two Levers',
        content: 'There are two ways to reach FI faster: 1. Increase your income and savings rate. 2. Decrease your annual expenses. Doing both at the same time is the fastest path.',
        exercise: {
          type: 'multiple-choice',
          question: 'What are the two levers to reach FI faster?',
          options: ['Saving more and Spending less', 'Working more and Sleeping less', 'Investing risky and Getting lucky'],
          correctAnswerIndex: 0,
          feedback: {
            correct: 'Correct! It\'s a simple, but not easy, formula.',
            incorrect: 'The two levers are increasing your savings rate and decreasing your expenses.'
          }
        }
      },
      {
        title: 'Your Savings Rate is Key',
        content: 'Your savings rate, the percentage of your income you save, is the single most important factor in how quickly you can reach FI. A higher savings rate dramatically shortens your timeline to financial freedom.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the most important factor for reaching FI?',
          options: ['Your income', 'Your investment choices', 'Your savings rate'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! A high savings rate can overcome a lower income.',
            incorrect: 'Your savings rate is the most critical variable.'
          }
        }
      },
      {
        title: 'The Journey, Not the Destination',
        content: 'The pursuit of FI is not about deprivation. It\'s about conscious spending, aligning your use of money with your values, and building a life of intention and freedom long before you reach your "number."',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The path to FI is about ___ spending.',
          correctAnswer: 'conscious'
        }
      },
      {
        title: 'What Would You Do?',
        content: 'Imagine you\'ve reached FI. What would you do with your time if you didn\'t have to work? Travel? Volunteer? Start a passion project? Having a clear "why" will motivate you on the journey.',
        exercise: {
          type: 'multiple-choice',
          question: 'Having a clear "why" provides what?',
          options: ['A guarantee of success', 'Motivation', 'More money'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! The motivation will keep you going when it gets tough.',
            incorrect: 'A clear vision for your post-FI life provides powerful motivation.'
          }
        }
      }
    ]
  },
  {
    id: 's11',
    title: 'Automating Your Finances',
    category: 'Saving',
    icon: Brain,
    color: 'from-emerald-500 to-green-600',
    description: 'Set up your finances to run on autopilot.',
    longDescription: 'This lesson shows you how to create a system where your financial goals are funded automatically. From saving to investing to paying bills, automation reduces stress and ensures you are consistently making progress.',
    duration: 12,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The Goal: Autopilot',
        content: 'The goal of financial automation is to make good financial decisions the default. You design a system once, and then it works for you in the background without requiring constant effort or willpower.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Automation makes good decisions the ___.',
          correctAnswer: 'default'
        }
      },
      {
        title: 'The Money Flow',
        content: 'A typical automated setup looks like this: Your paycheck is direct deposited. From your checking account, automatic transfers then go to your savings, investments, and to pay your bills. You are left to spend what remains.',
        exercise: {
          type: 'multiple-choice',
          question: 'In an automated system, when does your saving happen?',
          options: ['Whenever you remember', 'At the end of the month', 'Automatically after you get paid'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! This is the "Pay Yourself First" principle in action.',
            incorrect: 'Savings transfers happen automatically, right after your paycheck arrives.'
          }
        }
      },
      {
        title: 'Step 1: Direct Deposit',
        content: 'The foundation of automation is having your paycheck deposited directly into your checking account. This is the central hub for your money flow.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the foundation of an automated system?',
          options: ['A complex spreadsheet', 'Getting paid in cash', 'Direct deposit'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! This is the starting point for all other automations.',
            incorrect: 'Direct deposit is the essential first step.'
          }
        }
      },
      {
        title: 'Step 2: Automate Savings',
        content: 'Set up an automatic, recurring transfer from your checking account to your high-yield savings account. Schedule this to happen the day after your payday.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'You should schedule your savings transfer for right after ___.',
          correctAnswer: 'payday'
        }
      },
      {
        title: 'Step 3: Automate Investing',
        content: 'Similarly, set up automatic transfers to your investment accounts (like an IRA or a brokerage account). Consistent, automatic investing is a powerful way to build wealth.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the benefit of automating investments?',
          options: ['It guarantees high returns', 'It builds a consistent habit', 'It lets you time the market'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! It removes emotion and ensures consistency.',
            incorrect: 'It builds the powerful habit of consistent investing.'
          }
        }
      },
      {
        title: 'Step 4: Automate Bill Pay',
        content: 'Use your bank\'s "bill pay" feature to set up automatic payments for all your regular bills, like rent, utilities, and phone. This helps you avoid late fees and protects your credit score.',
        exercise: {
          type: 'multiple-choice',
          question: 'Automating bill payments helps you avoid what?',
          options: ['Taxes', 'High interest rates', 'Late fees'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! It\'s a simple way to avoid unnecessary fees.',
            incorrect: 'It helps you avoid costly and unnecessary late fees.'
          }
        }
      },
      {
        title: 'The "Left to Spend" Account',
        content: 'After all your automated savings, investing, and bill payments, the money left in your checking account is yours to spend guilt-free. You know all the important things have already been taken care of.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The money left over is for ___-free spending.',
          correctAnswer: 'guilt'
        }
      },
      {
        title: 'Check In Monthly',
        content: 'Automation doesn\'t mean abdication. You should still review your accounts once a month to make sure everything is running smoothly, track your progress, and make any necessary adjustments.',
        exercise: {
          type: 'multiple-choice',
          question: 'How often should you review your automated system?',
          options: ['Daily', 'Weekly', 'Monthly'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'That\'s right! A quick monthly check-up is all you need.',
            incorrect: 'A brief monthly review is a good practice.'
          }
        }
      }
    ]
  },
  {
    id: 's12',
    title: 'Psychology of Saving',
    category: 'Saving',
    icon: Brain,
    color: 'from-emerald-500 to-green-600',
    description: 'Understand the mental biases that affect your ability to save.',
    longDescription: 'This lesson explores the psychological and behavioral aspects of saving money. Learn about common mental biases like "present bias" and the "pain of paying" and discover strategies to trick your brain into becoming a better saver.',
    duration: 15,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'Your Two Brains',
        content: 'Think of your brain as having two systems: a short-sighted, impulsive system that wants immediate gratification, and a long-term, planning system. Saving is a battle between these two.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Saving is a battle between your impulsive brain and your ___ brain.',
          correctAnswer: 'planning'
        }
      },
      {
        title: 'Present Bias',
        content: 'Present bias is our natural tendency to overvalue rewards we can get now, and undervalue rewards we can get in the future. A pizza today feels much more real than a comfortable retirement in 40 years.',
        exercise: {
          type: 'multiple-choice',
          question: 'Present bias means we overvalue rewards in the ___',
          options: ['Past', 'Present', 'Future'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! The present feels much more important.',
            incorrect: 'We tend to overvalue rewards in the present.'
          }
        }
      },
      {
        title: 'Fighting Present Bias',
        content: 'Automation is the ultimate weapon against present bias. By saving money automatically the moment you\'re paid, you take the decision out of your impulsive brain\'s hands. The money is gone before you can spend it.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the best weapon against present bias?',
          options: ['Willpower', 'A strict budget', 'Automation'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! Automation makes saving the default choice.',
            incorrect: 'Automation is the most effective tool to overcome present bias.'
          }
        }
      },
      {
        title: 'The Pain of Paying',
        content: 'Studies show that physically handing over cash feels more painful than swiping a credit card. This "pain of paying" is why people tend to spend less when using cash. The transaction feels more real.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Using cash increases the "pain of ___."',
          correctAnswer: 'paying'
        }
      },
      {
        title: 'Using Pain to Your Advantage',
        content: 'If you struggle with overspending in a certain category, like dining out, try using a "cash envelope." Put your budgeted amount in an envelope for the month. When the cash is gone, it\'s gone. This makes your spending tangible.',
        exercise: {
          type: 'multiple-choice',
          question: 'A cash envelope system makes your spending more...',
          options: ['Fun', 'Abstract', 'Tangible'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Exactly! You can see and feel the money leaving.',
            incorrect: 'It makes your spending more tangible and real.'
          }
        }
      },
      {
        title: 'Choice Overload',
        content: 'When faced with too many choices, we often get overwhelmed and make no decision at all. If you have 20 different savings goals, you might not contribute to any of them. It\'s better to focus on 1-3 key priorities at a time.',
        exercise: {
          type: 'multiple-choice',
          question: 'Having too many goals can lead to...',
          options: ['Faster progress', 'Inaction', 'Better decisions'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. It\'s a paradox, but fewer choices can lead to more action.',
            incorrect: 'Choice overload often leads to paralysis and inaction.'
          }
        }
      },
      {
        title: 'Visualize Your Future Self',
        content: 'It can be hard to save for a stranger, and your future self can feel like a stranger. Take time to vividly imagine your future life. The more real your future self feels, the easier it will be to make sacrifices for them today.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Making your future self feel more ___ helps you save for them.',
          correctAnswer: 'real'
        }
      },
      {
        title: 'Gamify Your Savings',
        content: 'Turn saving into a game. Use apps that have savings challenges, or create your own. For example, every time you skip a coffee, transfer that $5 to savings. These small "wins" can keep you motivated.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the point of "gamifying" savings?',
          options: ['To make it a competition', 'To keep yourself motivated', 'To earn real prizes'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s it! Small wins and challenges keep it engaging.',
            incorrect: 'The goal is to use game mechanics to maintain motivation.'
          }
        }
      }
    ]
  },
    {
    id: 's13',
    title: 'Career and Income Growth',
    category: 'Saving',
    icon: TrendingUp,
    color: 'from-emerald-500 to-green-600',
    description: 'Focus on the other side of the savings equation: your income.',
    longDescription: 'While cutting expenses is powerful, there is a limit. Increasing your income is limitless. This lesson explores strategies for boosting your earning potential through career growth, side hustles, and negotiation.',
    duration: 12,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The Savings Equation',
        content: 'Your savings potential is simple: Income - Expenses = Savings. We often focus on the expenses side, but the income side is just as, if not more, important.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Savings = Income - ___.',
          correctAnswer: 'Expenses'
        }
      },
      {
        title: 'The Limit of Frugality',
        content: 'You can only cut your expenses so much. Eventually, you can\'t cut any more. However, the amount you can potentially earn has no theoretical limit.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which has a higher potential limit?',
          options: ['Cutting expenses', 'Increasing income', 'They are the same'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! Your income potential is vast.',
            incorrect: 'Increasing your income has a much higher ceiling than cutting expenses.'
          }
        }
      },
      {
        title: 'Invest in Yourself',
        content: 'Your skills are your greatest asset. Investing in new skills, certifications, or education can directly lead to higher-paying job opportunities. Never stop learning.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is your greatest financial asset?',
          options: ['Your first car', 'Your savings account', 'Your skills and knowledge'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! Your ability to earn is your most powerful tool.',
            incorrect: 'Your own skills are your most valuable asset.'
          }
        }
      },
      {
        title: 'The Art of Negotiation',
        content: 'Many people accept the first salary they are offered. Learning how to research your market value and negotiate your salary can increase your lifetime earnings by hundreds of thousands of dollars.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Learning to ___ your salary is a high-value skill.',
          correctAnswer: 'negotiate'
        }
      },
      {
        title: 'Climbing the Ladder',
        content: 'Look for opportunities for promotion within your company. Take on new projects, demonstrate your value, and make it known to your manager that you are interested in growing your career.',
        exercise: {
          type: 'multiple-choice',
          question: 'How can you increase your chances of promotion?',
          options: ['Doing the bare minimum', 'Taking on new challenges', 'Keeping your ambitions secret'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! Proactively seeking responsibility shows you are ready for more.',
            incorrect: 'Taking on new projects and demonstrating value are key.'
          }
        }
      },
      {
        title: 'The Power of a Side Hustle',
        content: 'A side hustle is a way to make extra money outside of your main job. This could be anything from freelance writing to dog walking. The extra income can be used to accelerate your savings goals.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is a "side hustle"?',
          options: ['A type of dance', 'A way to make extra money', 'A way to avoid taxes'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! It\'s work you do on the side of your main job.',
            incorrect: 'A side hustle is a way to earn extra income.'
          }
        }
      },
      {
        title: 'Beware Lifestyle Creep',
        content: 'When you get a raise or start a side hustle, it\'s tempting to increase your spending to match. This is "lifestyle creep." The key is to save and invest the majority of any new income you receive.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Increasing your spending as your income grows is called lifestyle ___.',
          correctAnswer: 'creep'
        }
      },
      {
        title: 'Income and Freedom',
        content: 'A higher income doesn\'t just mean more stuff. It means more options. It gives you the power to reach financial independence sooner, to be more generous, and to have a greater impact on the world.',
        exercise: {
          type: 'multiple-choice',
          question: 'Ultimately, a higher income provides more what?',
          options: ['Problems', 'Options and freedom', 'Things to worry about'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s the real goal. Money is a tool for freedom.',
            incorrect: 'The real benefit of a higher income is more freedom and options in life.'
          }
        }
      }
    ]
  }
];

export const investingLessons: Lesson[] = [
  {
    id: 'i1',
    title: 'What is Investing?',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn the difference between saving and investing.',
    longDescription: 'This lesson explains the fundamental concept of investing: using your money to potentially make more money. You will learn how investing differs from saving and why it is essential for long-term goals like retirement.',
    duration: 10,
    difficulty: 'Easy',
    interactive: true,
    content: [
      {
        title: 'Making Your Money Work',
        content: 'Investing is like planting a money tree. You put your money into assets (like stocks or bonds) that have the potential to grow over time.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Investing is the process of using money to potentially make more ___.',
          correctAnswer: 'money'
        }
      },
      {
        title: 'Saving vs. Investing',
        content: 'Saving is for short-term, safe goals (like an emergency fund). Investing is for long-term goals, and it involves taking on some risk for the potential of higher returns.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which is better for a long-term goal like retirement?',
          options: ['Saving', 'Investing', 'Both are the same'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! Investing offers the growth needed for long-term goals.',
            incorrect: 'Investing is more suitable for long-term goals due to its potential for higher growth.'
          }
        }
      },
      {
        title: 'What are Assets?',
        content: 'An asset is anything you own that has value. In investing, common assets are stocks (ownership in a company) and bonds (loaning money to a company or government).',
        exercise: {
          type: 'multiple-choice',
          question: 'Which of the following is a common investment asset?',
          options: ['A fancy car', 'Stocks', 'A designer handbag'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! Stocks are a primary type of investment asset.',
            incorrect: 'Stocks are a very common type of investment asset.'
          }
        }
      },
      {
        title: 'The Goal: Beat Inflation',
        content: 'Inflation is the rate at which the cost of goods and services increases over time. To grow your wealth, your investments need to earn a return that is higher than the rate of inflation.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Your investments must earn more than ___ to grow your real wealth.',
          correctAnswer: 'inflation'
        }
      },
      {
        title: 'Risk and Return',
        content: 'This is the fundamental trade-off in investing. Assets with the potential for higher returns usually come with higher risk. Understanding this relationship is key.',
        exercise: {
          type: 'multiple-choice',
          question: 'Higher potential returns usually mean...',
          options: ['No risk', 'Guaranteed profit', 'Higher risk'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'That\'s right. This is the core concept of risk and reward.',
            incorrect: 'This is the classic trade-off: higher potential returns typically involve higher risk.'
          }
        }
      },
      {
        title: 'Time is Your Best Friend',
        content: 'The longer your money is invested, the more time it has to grow. This is why it\'s so powerful to start investing as early as possible, even with small amounts.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The ___ your money is invested, the more it can grow.',
          correctAnswer: 'longer'
        }
      },
      {
        title: 'Don\'t Put All Eggs in One Basket',
        content: 'This is the principle of diversification. It means spreading your investments across different assets to reduce risk. If one investment does poorly, others may do well.',
        exercise: {
          type: 'multiple-choice',
          question: 'Spreading investments around is called...?',
          options: ['Concentration', 'Diversification', 'Speculation'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! Diversification is a key strategy for managing risk.',
            incorrect: 'This is called diversification.'
          }
        }
      },
      {
        title: 'It\'s a Marathon, Not a Sprint',
        content: 'Successful investing is about long-term consistency, not short-term gains. Don\'t panic during market downturns. Stick to your plan.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the mindset for successful investing?',
          options: ['Get rich quick', 'Long-term consistency', 'Timing the market perfectly'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! A long-term view is essential.',
            incorrect: 'A patient, long-term perspective is crucial for success.'
          }
        }
      }
    ]
  },
  {
    id: 'i2',
    title: 'Compound Growth',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Discover the "eighth wonder of the world."',
    longDescription: 'Albert Einstein reportedly called compound interest the eighth wonder of the world. This lesson shows you why. Learn how your money can start earning money on its own, creating a snowball effect of wealth.',
    duration: 12,
    difficulty: 'Easy',
    interactive: true,
    content: [
      {
        title: 'What is Compound Growth?',
        content: 'Compound growth is the interest you earn on your initial investment *plus* the interest you\'ve already earned. Your money starts making money for you.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Compounding is when you earn interest on your ___.',
          correctAnswer: 'interest'
        }
      },
      {
        title: 'The Snowball Effect',
        content: 'Imagine a small snowball rolling down a hill. As it rolls, it picks up more snow, getting bigger and bigger, faster and faster. Compound growth works the same way with your money.',
        exercise: {
          type: 'multiple-choice',
          question: 'Compound growth is often compared to a...?',
          options: ['Melting ice cube', 'Rolling snowball', 'Dripping faucet'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! It perfectly illustrates the accelerating growth.',
            incorrect: 'It\'s often called the snowball effect.'
          }
        }
      },
      {
        title: 'An Example',
        content: 'If you invest $100 and earn 10% interest, you have $110. The next year, you earn 10% on $110, not just the original $100. So you earn $11, and now have $121. That extra $1 is compounding in action.',
        exercise: {
          type: 'multiple-choice',
          question: 'In year two, where did the extra $1 of interest come from?',
          options: ['A bank error', 'Interest on the first year\'s interest', 'A magic trick'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'You got it! That\'s the magic of compounding.',
            incorrect: 'It came from earning interest on the $10 of interest from the first year.'
          }
        }
      },
      {
        title: 'The Two Ingredients: Time & Rate',
        content: 'The power of compounding depends on two things: how long your money is invested (time) and the rate of return it earns. The more of both you have, the more powerful the effect.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The two key ingredients for compounding are time and ___ of return.',
          correctAnswer: 'rate'
        }
      },
      {
        title: 'Why Starting Early is Crucial',
        content: 'Because of compounding, a small amount invested in your 20s can grow to be much larger than a much bigger amount invested in your 40s. Time is your most powerful ally.',
        exercise: {
          type: 'multiple-choice',
          question: 'Who has the biggest advantage with compounding?',
          options: ['The person who invests the most', 'The person who starts the earliest', 'The person who is the luckiest'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! Time is the most critical factor.',
            incorrect: 'The person who starts earliest has the most time for their money to compound.'
          }
        }
      },
      {
        title: 'The Rule of 72',
        content: 'The Rule of 72 is a quick way to estimate how long it will take for an investment to double. Just divide 72 by the annual interest rate. For example, at an 8% return, your money will double in approximately 9 years (72 / 8 = 9).',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'To estimate how long it takes for money to double, you can use the Rule of ___.',
          correctAnswer: '72'
        }
      },
      {
        title: 'Fueling the Snowball',
        content: 'You can make your snowball grow even faster by adding more money regularly. Consistent contributions plus compound growth is the recipe for long-term wealth.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the recipe for wealth?',
          options: ['Finding one hot stock', 'Compound growth alone', 'Consistent contributions plus compounding'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! Both are needed to maximize your growth.',
            incorrect: 'The combination of consistent investing and compound growth is key.'
          }
        }
      },
      {
        title: 'Patience is a Virtue',
        content: 'The most dramatic effects of compounding happen in the later years. It can feel slow at first. Patience and consistency are required to see the incredible results.',
        exercise: {
          type: 'multiple-choice',
          question: 'When does the most powerful compounding occur?',
          options: ['In the first year', 'In the middle years', 'In the later years'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Exactly! The growth becomes exponential over time.',
            incorrect: 'The most significant growth happens in the later stages of investing.'
          }
        }
      }
    ]
  },
  {
    id: 'i3',
    title: 'Understanding Risk',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn about risk tolerance and diversification.',
    longDescription: 'This lesson covers the essential topic of investment risk. You will learn about the different types of risk, how to assess your own personal risk tolerance, and how diversification can be used to manage risk without sacrificing potential returns.',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    content: [
      {
        title: 'What is Investment Risk?',
        content: 'Investment risk is the possibility that you could lose some or all of the money you\'ve invested. It\'s the "price" of potential returns.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Risk is the chance that you could ___ money on an investment.',
          correctAnswer: 'lose'
        }
      },
      {
        title: 'The Risk/Return Trade-Off',
        content: 'Generally, to get higher potential returns, you must accept a higher level of risk. A safe investment like a government bond will have low returns, while a stock has higher potential returns and higher risk.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which investment typically has the highest risk and potential return?',
          options: ['A savings account', 'A government bond', 'A stock'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. Stocks offer the highest growth potential but also the most volatility.',
            incorrect: 'Stocks are generally considered to have the highest risk and potential for high returns.'
          }
        }
      },
      {
        title: 'What is Your Risk Tolerance?',
        content: 'Your risk tolerance is your personal ability and willingness to stomach large swings in the value of your investments. It depends on your age, financial situation, and personality.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is risk tolerance?',
          options: ['How much risk an investment has', 'How much you enjoy taking risks', 'Your ability to handle investment ups and downs'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'You got it. It\'s a personal measure.',
            incorrect: 'It\'s your personal comfort level with the possibility of losing money.'
          }
        }
      },
      {
        title: 'Time Horizon Matters',
        content: 'If you are investing for a long-term goal (like retirement in 40 years), you can afford to take on more risk. You have plenty of time to recover from any market downturns. Short-term goals require less risky investments.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A longer time horizon allows you to take on more ___.',
          correctAnswer: 'risk'
        }
      },
      {
        title: 'Diversification: The Free Lunch',
        content: 'Diversification means not putting all your eggs in one basket. By spreading your money across different types of assets (stocks, bonds) and different industries, you can reduce your overall risk.',
        exercise: {
          type: 'multiple-choice',
          question: 'Why should you diversify?',
          options: ['To make money faster', 'To reduce overall risk', 'To make investing more complicated'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! It\'s the most important tool for managing risk.',
            incorrect: 'The primary goal of diversification is to reduce the overall risk of your portfolio.'
          }
        }
      },
      {
        title: 'Asset Allocation',
        content: 'Asset allocation is how you decide to split your money between major asset classes like stocks and bonds. A common starting point is the "110 rule": 110 minus your age is the percentage you should have in stocks.',
        exercise: {
          type: 'multiple-choice',
          question: 'If you are 20 years old, the "110 rule" suggests what percentage in stocks?',
          options: ['20%', '90%', '110%'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! 110 - 20 = 90%.',
            incorrect: '110 minus your age (20) would suggest 90% in stocks.'
          }
        }
      },
      {
        title: 'Volatility is Normal',
        content: 'The stock market goes up and down. This is called volatility. It\'s a normal part of investing. The key is to not panic and sell when the market is down. That\'s how you lock in losses.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The up-and-down movement of the market is called ___.',
          correctAnswer: 'volatility'
        }
      },
      {
        title: 'Risk is Not Your Enemy',
        content: 'Risk is not something to be avoided entirely. It is a tool to be managed. Without taking on some calculated risk, your money will not grow enough to meet your long-term goals.',
        exercise: {
          type: 'multiple-choice',
          question: 'How should you think about risk?',
          options: ['As something to avoid at all costs', 'As a tool to be managed', 'As a form of gambling'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s the right mindset. Risk is a necessary part of the journey.',
            incorrect: 'Risk should be seen as a tool to be managed, not something to be feared.'
          }
        }
      }
    ]
  },
  {
    id: 'i4',
    title: 'Stocks & Bonds 101',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn about the two primary building blocks of a portfolio.',
    longDescription: 'This lesson dives into the two main types of investment assets: stocks and bonds. You will learn what they represent, how they generate returns, and the role each plays in a diversified investment portfolio.',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What is a Stock?',
        content: 'Buying a stock (also called a share or equity) means you are buying a tiny piece of ownership in a public company, like Apple or Amazon. If the company does well, the value of your ownership piece can go up.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A stock represents a small piece of ___ in a company.',
          correctAnswer: 'ownership'
        }
      },
      {
        title: 'How Stocks Make Money',
        content: 'Stocks can make you money in two ways: 1. Capital Appreciation: The price of the stock goes up. 2. Dividends: The company shares a portion of its profits with you, the shareholder.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is it called when a company shares profits with stockholders?',
          options: ['A bonus', 'A dividend', 'A salary'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! Dividends are a direct cash payment to you.',
            incorrect: 'These profit-sharing payments are called dividends.'
          }
        }
      },
      {
        title: 'The Risk of Stocks',
        content: 'The primary risk of stocks is that the company could do poorly, and the value of your stock could go down, even to zero. Their prices are more volatile than bonds.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the main risk of owning a stock?',
          options: ['It might not pay a dividend', 'Its price could go down', 'The company might become too popular'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes, the value of your investment is not guaranteed and can decrease.',
            incorrect: 'The biggest risk is that the stock\'s price could fall.'
          }
        }
      },
      {
        title: 'What is a Bond?',
        content: 'Buying a bond is like giving a loan. You are loaning money to a government or a corporation. In return, they promise to pay you back the full amount on a specific date, and they pay you regular interest payments along the way.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Buying a bond is like giving a ___.',
          correctAnswer: 'loan'
        }
      },
      {
        title: 'How Bonds Make Money',
        content: 'Bonds primarily make you money through their regular interest payments, also known as "coupon payments." They are generally considered less risky than stocks.',
        exercise: {
          type: 'multiple-choice',
          question: 'What are the regular payments from a bond called?',
          options: ['Dividends', 'Interest payments', 'Paychecks'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! Bonds pay interest to the bondholders.',
            incorrect: 'They are called interest payments.'
          }
        }
      },
      {
        title: 'The Risk of Bonds',
        content: 'The main risk for a high-quality bond is "interest rate risk." If interest rates in the economy go up, newly issued bonds will pay more, making your older, lower-paying bond less valuable.',
        exercise: {
          type: 'multiple-choice',
          question: 'If interest rates rise, what happens to the value of existing bonds?',
          options: ['It goes up', 'It goes down', 'It stays the same'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly. New bonds are more attractive, so old ones are worth less.',
            incorrect: 'The value of existing bonds goes down.'
          }
        }
      },
      {
        title: 'The Role of Stocks in a Portfolio',
        content: 'Stocks are the engine of growth in a portfolio. They provide the potential for high, long-term returns that outpace inflation.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Stocks are considered the ___ of your portfolio.',
          correctAnswer: 'engine'
        }
      },
      {
        title: 'The Role of Bonds in a Portfolio',
        content: 'Bonds are the shock absorbers. They are more stable than stocks and provide a steady stream of income. They help to smooth out the ride when the stock market is volatile.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the primary role of bonds in a portfolio?',
          options: ['High growth', 'Stability and income', 'High risk speculation'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s right. They provide a stabilizing effect.',
            incorrect: 'Bonds add stability and income, acting as a balance to stocks.'
          }
        }
      }
    ]
  },
  {
    id: 'i5',
    title: 'Index Funds & ETFs',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Discover the power of passive investing.',
    longDescription: 'You don\'t have to pick individual stocks to be a successful investor. This lesson introduces index funds and Exchange-Traded Funds (ETFs), powerful tools that allow you to buy the entire market in a single transaction, providing instant diversification.',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The Problem with Picking Stocks',
        content: 'Trying to pick individual winning stocks is extremely difficult, even for professional investors. It takes a lot of time and research, and it\'s very easy to get it wrong.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Picking individual stocks is very ___.',
          correctAnswer: 'difficult'
        }
      },
      {
        title: 'A Simpler Way: Buy the Whole Market',
        content: 'Instead of trying to find the one winning needle, what if you could just buy the whole haystack? This is the core idea behind index funds.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the idea behind an index fund?',
          options: ['Finding one perfect stock', 'Buying a small piece of many stocks', 'Guessing market direction'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly! It\'s all about diversification.',
            incorrect: 'The idea is to buy a tiny piece of an entire market index.'
          }
        }
      },
      {
        title: 'What is a Stock Market Index?',
        content: 'A stock market index is a collection of stocks that represents a portion of the market. The most famous is the S&P 500, which tracks the 500 largest public companies in the U.S.',
        exercise: {
          type: 'multiple-choice',
          question: 'What does the S&P 500 track?',
          options: ['The 500 smallest companies', 'The 500 best-performing companies', 'The 500 largest U.S. companies'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. It\'s a snapshot of the largest part of the U.S. stock market.',
            incorrect: 'It tracks the 500 largest public companies in the United States.'
          }
        }
      },
      {
        title: 'How Index Funds Work',
        content: 'An S&P 500 index fund is a single fund that holds stock in all 500 of those companies. By buying one share of the fund, you are instantly diversified across all of them.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'An index fund provides instant ___.',
          correctAnswer: 'diversification'
        }
      },
      {
        title: 'Passive vs. Active Investing',
        content: 'Index funds are a form of "passive investing." You aren\'t trying to beat the market; you are trying to be the market. "Active investing" is when a fund manager tries to pick stocks to beat the market. History shows most active managers fail to do this over the long run.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which strategy aims to match the market\'s performance?',
          options: ['Passive investing', 'Active investing', 'Day trading'],
          correctAnswerIndex: 0,
          feedback: {
            correct: 'That\'s right. Passive investing aims to capture the market\'s average return.',
            incorrect: 'Passive investing seeks to match the market.'
          }
        }
      },
      {
        title: 'The Magic of Low Costs',
        content: 'Because they don\'t require expensive teams of analysts, index funds have extremely low fees (called "expense ratios"). This means more of your money stays invested and working for you.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is a major advantage of index funds?',
          options: ['High fees', 'Guaranteed returns', 'Low fees'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes! Low costs are a huge factor in their long-term success.',
            incorrect: 'A key feature is their very low fees.'
          }
        }
      },
      {
        title: 'What are ETFs?',
        content: 'Exchange-Traded Funds (ETFs) are very similar to index funds. The main difference is that they trade on the stock exchange throughout the day like a regular stock, whereas traditional index funds are priced once per day.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'ETFs trade throughout the day like a ___.',
          correctAnswer: 'stock'
        }
      },
      {
        title: 'A Simple, Powerful Strategy',
        content: 'For most investors, a simple strategy of regularly buying a low-cost, broad-market index fund or ETF and holding it for the long term is the most reliable path to building wealth.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is a reliable path to wealth for most people?',
          options: ['Picking hot stocks', 'Buying and holding low-cost index funds', 'Timing the market'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s the key takeaway. Simple, consistent, and low-cost.',
            incorrect: 'Regularly investing in broad, low-cost index funds is a proven strategy.'
          }
        }
      }
    ]
  },
  {
    id: 'i6',
    title: 'Retirement Accounts (401k & IRA)',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn about the powerful tax advantages of retirement accounts.',
    longDescription: 'This lesson explains the most powerful investment tools available: retirement accounts. Learn the details of employer-sponsored 401(k)s and Individual Retirement Arrangements (IRAs), and the massive tax benefits they offer.',
    duration: 15,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'A Supercharged Investment Account',
        content: 'Retirement accounts are special investment accounts with major tax advantages. The government created them to encourage people to save for their future.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Retirement accounts have special ___ advantages.',
          correctAnswer: 'tax'
        }
      },
      {
        title: 'The 401(k): Your Employer\'s Plan',
        content: 'A 401(k) is a retirement plan offered by an employer. You can contribute money directly from your paycheck, often before taxes are calculated, which reduces your taxable income for the year.',
        exercise: {
          type: 'multiple-choice',
          question: 'A key benefit of a traditional 401(k) is that contributions can...',
          options: ['Double your salary', 'Reduce your taxable income', 'Be withdrawn anytime'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! This provides an immediate tax benefit.',
            incorrect: 'They can lower your taxable income for the year.'
          }
        }
      },
      {
        title: 'The 401(k) Match: Free Money!',
        content: 'Many employers will "match" your contributions up to a certain percentage. For example, they might match 100% of your contributions up to 5% of your salary. This is a 100% return on your investment. Always contribute enough to get the full match.',
        exercise: {
          type: 'multiple-choice',
          question: 'What should be your first investing priority if your employer offers a match?',
          options: ['Investing in your friend\'s startup', 'Contributing enough to get the full match', 'Buying a fancy car'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! It is free money and the best return you will ever get.',
            incorrect: 'You should always contribute enough to get the full employer match.'
          }
        }
      },
      {
        title: 'The IRA: Do It Yourself',
        content: 'An Individual Retirement Arrangement (IRA) is an account you open yourself at a brokerage. It\'s a great option if your employer doesn\'t offer a 401(k), or if you want to save more than your 401(k) allows.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'An IRA stands for Individual Retirement ___.',
          correctAnswer: 'Arrangement'
        }
      },
      {
        title: 'Traditional IRA: Tax Break Now',
        content: 'With a Traditional IRA, your contributions may be tax-deductible, meaning you pay less in taxes today. You then pay taxes on the money when you withdraw it in retirement.',
        exercise: {
          type: 'multiple-choice',
          question: 'When do you pay taxes on a Traditional IRA?',
          options: ['When you contribute', 'When you withdraw in retirement', 'Never'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. You get the tax break now, but pay taxes later.',
            incorrect: 'You pay taxes on withdrawals during retirement.'
          }
        }
      },
      {
        title: 'Roth IRA: Tax Break Later',
        content: 'With a Roth IRA, you contribute with after-tax money. This means no tax break today. However, your investments grow completely tax-free, and you pay no taxes on your withdrawals in retirement. This can be incredibly powerful.',
        exercise: {
          type: 'multiple-choice',
          question: 'When do you pay taxes on a Roth IRA?',
          options: ['When you contribute', 'When you withdraw in retirement', 'Both'],
          correctAnswerIndex: 0,
          feedback: {
            correct: 'Yes! You pay taxes upfront, and then all future growth and withdrawals are tax-free.',
            incorrect: 'You pay taxes on your contributions, and then withdrawals are tax-free.'
          }
        }
      },
      {
        title: 'Why Roth is Great for the Young',
        content: 'Many experts recommend a Roth IRA for young people. You are likely in a lower tax bracket now than you will be later in your career. It\'s better to pay the taxes now while your tax rate is low.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A Roth is often recommended if you expect your ___ to be higher in the future.',
          correctAnswer: 'income'
        }
      },
      {
        title: 'Contribution Limits',
        content: 'The government sets annual limits on how much you can contribute to these accounts. For 2024, the IRA contribution limit is $7,000 for people under 50. 401(k) limits are much higher.',
        exercise: {
          type: 'multiple-choice',
          question: 'Is there a limit to how much you can put in an IRA each year?',
          options: ['No, you can invest as much as you want', 'Yes, the government sets annual limits', 'Only if you are over 50'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s right. You need to be aware of the annual contribution limits.',
            incorrect: 'Yes, there are annual contribution limits set by the IRS.'
          }
        }
      }
    ]
  },
  {
    id: 'i7',
    title: 'How to Actually Buy an Investment',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'A step-by-step guide to making your first investment.',
    longDescription: 'This lesson demystifies the process of investing. From opening a brokerage account to placing your first trade, you will learn the practical steps and terminology you need to go from a saver to an investor.',
    duration: 12,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'Step 1: Choose a Brokerage',
        content: 'A brokerage is a company that allows you to buy and sell investments like stocks, bonds, and ETFs. Think of it as a bank for your investments. Reputable, low-cost brokerages include Vanguard, Fidelity, and Charles Schwab.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A company that lets you buy and sell investments is a ___.',
          correctAnswer: 'brokerage'
        }
      },
      {
        title: 'Step 2: Open an Account',
        content: 'Opening an account is like opening a bank account. You\'ll need to provide personal information like your name, address, and Social Security Number. You\'ll also need to decide on the type of account, like a Roth IRA or a standard (taxable) brokerage account.',
        exercise: {
          type: 'multiple-choice',
          question: 'What kind of account would you open for tax-free growth for retirement?',
          options: ['A standard brokerage account', 'A checking account', 'A Roth IRA'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! A Roth IRA is a powerful retirement investing tool.',
            incorrect: 'A Roth IRA offers tax-free growth and withdrawals in retirement.'
          }
        }
      },
      {
        title: 'Step 3: Fund the Account',
        content: 'Once your account is open, you need to move money into it. You can do this with a simple electronic transfer from your checking account. Many brokerages allow you to set up automatic, recurring transfers.',
        exercise: {
          type: 'multiple-choice',
          question: 'How do you get money into your new investment account?',
          options: ['Mail cash', 'Electronic transfer from a bank', 'Take out a loan'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes, a simple electronic transfer is the standard method.',
            incorrect: 'An electronic funds transfer (EFT) from a linked bank account is the easiest way.'
          }
        }
      },
      {
        title: 'Step 4: Choose Your Investment',
        content: 'Now it\'s time to decide what to buy. For beginners, a great starting point is a broad-market, low-cost ETF, such as one that tracks the S&P 500 (e.g., VOO) or the total stock market (e.g., VTI).',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A good starting investment for a beginner is a broad-market ___.',
          correctAnswer: 'ETF'
        }
      },
      {
        title: 'Understanding Ticker Symbols',
        content: 'Every investment has a unique "ticker symbol" which is a short code used to identify it. For example, the ticker symbol for Apple stock is AAPL. The ticker for the Vanguard Total Stock Market ETF is VTI.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is a ticker symbol?',
          options: ['A stock\'s nickname', 'A short code to identify an investment', 'A measure of a stock\'s risk'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. It\'s like a unique ID for each investment.',
            incorrect: 'It\'s a unique short code for a specific security on a stock exchange.'
          }
        }
      },
      {
        title: 'Step 5: Place a "Market" Order',
        content: 'When you are ready to buy, you will place a "trade." The simplest type is a "market order." This tells your brokerage to buy the investment immediately at the best available current price.',
        exercise: {
          type: 'multiple-choice',
          question: 'What does a "market order" do?',
          options: ['Buys at a specific price you set', 'Buys immediately at the current price', 'Buys at the end of the day'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! It executes the trade as quickly as possible.',
            incorrect: 'A market order buys or sells immediately at the current market price.'
          }
        }
      },
      {
        title: 'Step 6: Don\'t Panic!',
        content: 'Congratulations, you are an investor! Now comes the hard part: doing nothing. Don\'t check your account every day. Don\'t sell if the market drops. Trust your long-term plan and continue to invest consistently.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'After you invest, you should trust your ___-term plan.',
          correctAnswer: 'long'
        }
      },
      {
        title: 'Automate for Success',
        content: 'The best way to stick to your plan is to automate it. Set up automatic transfers into your account and, if possible, automatic investments into your chosen ETF. This removes emotion and ensures consistency.',
        exercise: {
          type: 'multiple-choice',
          question: 'Why is automating your investments a good idea?',
          options: ['It removes emotion and ensures consistency', 'It\'s more exciting', 'It guarantees higher returns'],
          correctAnswerIndex: 0,
          feedback: {
            correct: 'Exactly. It\'s the key to disciplined long-term investing.',
            incorrect: 'It takes emotion out of the equation and builds a consistent habit.'
          }
        }
      }
    ]
  },
  {
    id: 'i8',
    title: 'Investor Behavior & Psychology',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn why you are your own worst enemy in investing.',
    longDescription: 'The biggest threat to your investment returns is not the market, it\'s your own brain. This lesson explores common behavioral biases that cause investors to make costly mistakes, like panic selling and chasing hot trends.',
    duration: 15,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The Behavior Gap',
        content: 'The "behavior gap" is the difference between how an investment performs and how the average investor in that investment performs. The gap is caused by emotional decision-making.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The behavior gap is caused by ___ decision-making.',
          correctAnswer: 'emotional'
        }
      },
      {
        title: 'Fear and Greed',
        content: 'These are the two most powerful emotions in investing. Greed causes investors to pile into assets when they are popular and expensive. Fear causes them to sell everything when the market is crashing.',
        exercise: {
          type: 'multiple-choice',
          question: 'What are the two most dangerous emotions in investing?',
          options: ['Joy and Sadness', 'Fear and Greed', 'Excitement and Boredom'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. These two emotions drive the worst investment decisions.',
            incorrect: 'Fear and greed are the primary drivers of poor investor behavior.'
          }
        }
      },
      {
        title: 'The Classic Mistake: Buy High, Sell Low',
        content: 'Driven by fear and greed, the average investor does the exact opposite of what they should. They get excited and buy after an asset has already gone up (buying high), and they panic and sell after it has crashed (selling low).',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the classic investor mistake?',
          options: ['Buy high, sell low', 'Buy low, sell high', 'Buy and hold'],
          correctAnswerIndex: 0,
          feedback: {
            correct: 'Yes. This is the cardinal sin of investing, driven by emotion.',
            incorrect: 'The classic mistake is to buy high and sell low.'
          }
        }
      },
      {
        title: 'FOMO: Fear of Missing Out',
        content: 'When you see a stock or cryptocurrency soaring in price, you experience FOMO. You feel like you are missing out on easy money, so you buy in, often right at the peak before a crash.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The Fear of Missing Out is also known as ___.',
          correctAnswer: 'FOMO'
        }
      },
      {
        title: 'Recency Bias',
        content: 'This is the tendency to think that what has happened recently will continue to happen. If the market has been going up for 3 years, we assume it will keep going up. This is a dangerous assumption.',
        exercise: {
          type: 'multiple-choice',
          question: 'Believing recent trends will continue indefinitely is called...?',
          options: ['Confirmation Bias', 'Hindsight Bias', 'Recency Bias'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. Our brains give too much weight to recent events.',
            incorrect: 'This is known as recency bias.'
          }
        }
      },
      {
        title: 'The Antidote: A Written Plan',
        content: 'The best way to protect yourself from your own emotional reactions is to have a simple, written investment plan. This plan should state your goals, your asset allocation, and what you will do in different market conditions (e.g., "If the market drops 20%, I will do nothing or buy more").',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the best defense against emotional investing?',
          options: ['Watching the news constantly', 'A written investment plan', 'Following a guru'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! It forces you to be logical when your brain wants to be emotional.',
            incorrect: 'A written plan is the most effective antidote.'
          }
        }
      },
      {
        title: 'Tune Out the Noise',
        content: 'Financial news media is designed to be sensational and to provoke an emotional response. For a long-term investor, the daily chatter of the market is just noise. The less you watch it, the better your results are likely to be.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'For a long-term investor, daily market news is just ___.',
          correctAnswer: 'noise'
        }
      },
      {
        title: 'Your Greatest Advantage',
        content: 'As an individual investor, you have one huge advantage over professionals: you don\'t have a boss. You don\'t have to report quarterly returns. You can be patient and focus on the long term. This is your superpower.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is an individual investor\'s biggest advantage?',
          options: ['Access to secret information', 'The ability to be patient', 'The ability to trade quickly'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly. You can ignore the short-term noise and focus on what matters.',
            incorrect: 'The ability to be patient and ignore short-term pressure is a massive advantage.'
          }
        }
      }
    ]
  },
  {
    id: 'i9',
    title: 'Asset Allocation',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn how to construct a portfolio for your goals and risk tolerance.',
    longDescription: 'Asset allocation is the most important decision you will make as an investor. This lesson explains how to blend different asset classes, like stocks and bonds from the U.S. and other countries, to build a diversified portfolio tailored to you.',
    duration: 15,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The Most Important Decision',
        content: 'Studies have shown that your asset allocation decision—the mix of stocks, bonds, and other assets in your portfolio—is responsible for over 90% of your investment returns. It\'s more important than any individual stock you pick.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Your asset allocation is responsible for the vast ___ of your returns.',
          correctAnswer: 'majority'
        }
      },
      {
        title: 'The Goal of Allocation',
        content: 'The goal of asset allocation is to create a mix of investments that matches your specific time horizon and risk tolerance. A young person will have a very different allocation from someone nearing retirement.',
        exercise: {
          type: 'multiple-choice',
          question: 'Asset allocation should be based on your...',
          options: ['Friend\'s advice', 'Time horizon and risk tolerance', 'A random guess'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. It is a personalized decision.',
            incorrect: 'It must be tailored to your personal goals and risk profile.'
          }
        }
      },
      {
        title: 'Domestic vs. International Stocks',
        content: 'It\'s wise to not only diversify across companies, but across countries. While the U.S. market is the largest, holding international stocks gives you a stake in the growth of the entire global economy.',
        exercise: {
          type: 'multiple-choice',
          question: 'Why should you own international stocks?',
          options: ['They are always safer', 'To diversify across different economies', 'Because they are cheaper'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! It reduces the risk of being too concentrated in one country\'s economy.',
            incorrect: 'It provides geographic diversification for your portfolio.'
          }
        }
      },
      {
        title: 'A Simple Three-Fund Portfolio',
        content: 'A popular and effective allocation for U.S. investors is the "three-fund portfolio." It consists of just three low-cost index funds: a U.S. Total Stock Market fund, an International Total Stock Market fund, and a U.S. Total Bond Market fund.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A simple, diversified portfolio can be built with just ___ funds.',
          correctAnswer: 'three'
        }
      },
      {
        title: 'Example Allocation',
        content: 'For a young investor, a sample three-fund portfolio might be: 60% U.S. Stocks, 30% International Stocks, and 10% Bonds. This is an aggressive allocation focused on long-term growth.',
        exercise: {
          type: 'multiple-choice',
          question: 'The example allocation is considered aggressive because it is mostly in...',
          options: ['Cash', 'Bonds', 'Stocks'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. A high allocation to stocks is geared for growth.',
            incorrect: 'It\'s considered aggressive because of its high (90%) allocation to stocks.'
          }
        }
      },
      {
        title: 'Target-Date Funds',
        content: 'If creating your own allocation seems daunting, a "target-date fund" can do it for you. You pick a fund with a year close to your expected retirement (e.g., "Target Date 2065 Fund"). The fund automatically allocates and becomes more conservative as you get closer to the target date.',
        exercise: {
          type: 'multiple-choice',
          question: 'What does a target-date fund do automatically?',
          options: ['Guarantees returns', 'Picks winning stocks', 'Manages your asset allocation over time'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Yes, it provides a "set-it-and-forget-it" allocation solution.',
            incorrect: 'It automatically manages your asset allocation for you.'
          }
        }
      },
      {
        title: 'Rebalancing',
        content: 'Over time, your portfolio\'s allocation will drift. If stocks have a great year, they might grow to be a larger percentage of your portfolio than you intended. "Rebalancing" is the process of periodically selling some of your winners and buying more of your losers to get back to your target allocation.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The process of resetting your portfolio to its target allocation is called ___.',
          correctAnswer: 'rebalancing'
        }
      },
      {
        title: 'Stay the Course',
        content: 'Once you have chosen a sensible asset allocation, the most important thing is to stick with it. Don\'t abandon your plan because of short-term market noise. Your allocation is designed for the long run.',
        exercise: {
          type: 'multiple-choice',
          question: 'The key to a successful allocation strategy is...',
          options: ['Changing it often', 'Sticking with it', 'Trying to time the market'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly. Discipline and consistency are what lead to success.',
            incorrect: 'The most important part is to "stay the course" and stick to your plan.'
          }
        }
      }
    ]
  },
  {
    id: 'i10',
    title: 'Fees and Expenses',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn how hidden costs can destroy your returns.',
    longDescription: 'Investment fees may seem small, but over a lifetime they can consume a massive portion of your nest egg. This lesson shines a light on the various fees you might encounter and shows why choosing low-cost investments is critical.',
    duration: 12,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The Silent Killer',
        content: 'Fees are a silent killer of investment returns. A fee of just 1% per year might not sound like much, but over decades it can eat up hundreds of thousands of dollars of your potential growth.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Even a small ___ can have a huge impact over time.',
          correctAnswer: 'fee'
        }
      },
      {
        title: 'Expense Ratios',
        content: 'The most common fee for a mutual fund or ETF is the "expense ratio." It\'s an annual fee, expressed as a percentage of your investment, that covers the fund\'s operating costs. You want this number to be as low as possible.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the main fee for an ETF or mutual fund?',
          options: ['A sales charge', 'An expense ratio', 'A trading commission'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. This is the primary annual fee to be aware of.',
            incorrect: 'It\'s called the expense ratio.'
          }
        }
      },
      {
        title: 'Low-Cost is Key',
        content: 'Broad-market index funds and ETFs often have expense ratios of 0.10% or less. Many actively managed funds have expense ratios of 1% or more. This difference is enormous over the long term.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which type of fund typically has lower expense ratios?',
          options: ['Actively managed funds', 'Index funds', 'Hedge funds'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes, their passive nature makes them much cheaper to operate.',
            incorrect: 'Index funds are known for their very low expense ratios.'
          }
        }
      },
      {
        title: 'The Math of a 1% Fee',
        content: 'Let\'s say you invest $100,000 for 30 years and earn an average of 7% per year. With a 0.1% fee, you\'d have about $710,000. With a 1.1% fee, you\'d have only about $540,000. That 1% fee cost you $170,000!',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Over a long time, a 1% fee can cost you a ___ amount of money.',
          correctAnswer: 'huge'
        }
      },
      {
        title: 'Trading Commissions',
        content: 'In the past, you had to pay a "commission" or fee to your broker for every trade you made. However, most major brokerages have now eliminated trading commissions for stocks and ETFs.',
        exercise: {
          type: 'multiple-choice',
          question: 'Do most major brokerages still charge commissions for ETF trades?',
          options: ['Yes, a large one', 'Yes, a small one', 'No, they are usually free'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. The move to zero-commission trading has been great for investors.',
            incorrect: 'No, most have eliminated commissions for online stock and ETF trades.'
          }
        }
      },
      {
        title: 'Advisory Fees',
        content: 'If you hire a financial advisor, they will charge a fee for their services. A common model is a fee based on "Assets Under Management" (AUM), typically around 1% per year. Make sure you are getting significant value for that fee.',
        exercise: {
          type: 'multiple-choice',
          question: 'An "AUM" fee is based on what?',
          options: ['The performance of your portfolio', 'The size of your portfolio', 'A flat monthly rate'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes, it\'s a percentage of the assets they manage for you.',
            incorrect: 'It\'s a percentage of your total assets that they manage.'
          }
        }
      },
      {
        title: 'You Get What You Don\'t Pay For',
        content: 'In investing, you get what you don\'t pay for. Every dollar you save in fees is a dollar that stays in your portfolio, compounding for your future. Minimizing costs is one of the few things you can directly control.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Minimizing ___ is one of the most important things an investor can do.',
          correctAnswer: 'costs'
        }
      },
      {
        title: 'Always Check the Label',
        content: 'Before you buy any investment product, especially a mutual fund or ETF, always look up its expense ratio. It should be clearly listed on the brokerage\'s website. Choose the cheaper option when comparing similar funds.',
        exercise: {
          type: 'multiple-choice',
          question: 'What should you always check before buying a fund?',
          options: ['Its past 1-day performance', 'Its expense ratio', 'How many news articles are about it'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s right. It\'s a critical piece of information.',
            incorrect: 'You should always check the expense ratio.'
          }
        }
      }
    ]
  },
  {
    id: 'i11',
    title: 'Tax-Efficient Investing',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn how to minimize the taxes you pay on your investment growth.',
    longDescription: 'Taxes are one of the biggest costs an investor can face. This lesson covers strategies for tax efficiency, including asset location (what to put in which account) and tax-loss harvesting.',
    duration: 15,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'The Tax Drag',
        content: 'Taxes on your investment gains, dividends, and interest can create a "drag" on your portfolio\'s growth. The goal of tax-efficient investing is to minimize this drag as much as legally possible.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Taxes can create a ___ on your portfolio\'s performance.',
          correctAnswer: 'drag'
        }
      },
      {
        title: 'Use Tax-Advantaged Accounts!',
        content: 'The most powerful tool for tax efficiency is to maximize your use of tax-advantaged accounts like 401(k)s and IRAs. The tax-deferred or tax-free growth in these accounts is a massive benefit.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is your best tool for tax-efficient investing?',
          options: ['A standard brokerage account', 'Hiding money from the IRS', 'Using retirement accounts like 401(k)s and IRAs'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct! Their special tax status makes them incredibly powerful.',
            incorrect: 'Using tax-advantaged accounts is the most important first step.'
          }
        }
      },
      {
        title: 'Asset Location',
        content: 'Asset *location* is different from asset *allocation*. It\'s the strategy of placing tax-inefficient investments in your tax-advantaged accounts, and tax-efficient investments in your taxable accounts.',
        exercise: {
          type: 'multiple-choice',
          question: 'The strategy of what to put where is called asset ___',
          options: ['Allocation', 'Location', 'Delegation'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! It\'s about placing assets in the right type of account.',
            incorrect: 'This is called asset location.'
          }
        }
      },
      {
        title: 'What Goes Where?',
        content: 'Generally, you want to hold investments that generate a lot of taxable income, like bonds or actively managed funds, inside your tax-advantaged accounts. Tax-efficient investments like broad-market index funds are good for taxable accounts.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'It\'s best to hold ___ in your tax-advantaged accounts.',
          correctAnswer: 'bonds'
        }
      },
      {
        title: 'Capital Gains Taxes',
        content: 'In a taxable brokerage account, when you sell an investment for a profit, you have to pay capital gains tax. The rate depends on how long you held the investment.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the tax on the profit from selling an investment called?',
          options: ['Income tax', 'Sales tax', 'Capital gains tax'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. This tax is triggered when you "realize" a gain by selling.',
            incorrect: 'This is called capital gains tax.'
          }
        }
      },
      {
        title: 'Long-Term vs. Short-Term',
        content: 'If you hold an investment for more than one year, you pay the lower "long-term" capital gains rate. If you hold it for one year or less, you pay the much higher "short-term" rate, which is the same as your ordinary income tax rate. This is a huge incentive to be a long-term investor.',
        exercise: {
          type: 'multiple-choice',
          question: 'To get a lower tax rate, you should hold an investment for...',
          options: ['Less than a year', 'More than one year', 'Exactly one year'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes! The tax code rewards long-term holding.',
            incorrect: 'Holding for more than a year qualifies you for the lower long-term capital gains rate.'
          }
        }
      },
      {
        title: 'Tax-Loss Harvesting',
        content: 'This is an advanced strategy where you sell an investment that has lost money in your taxable account. You can use that loss to offset other capital gains, or even up to $3,000 of your regular income, reducing your tax bill.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Selling a losing investment to reduce taxes is called tax-loss ___.',
          correctAnswer: 'harvesting'
        }
      },
      {
        title: 'Don\'t Let the Tax Tail Wag the Dog',
        content: 'While tax efficiency is important, it shouldn\'t be your only consideration. The primary goal is to have a sound investment strategy. Tax optimization is a secondary goal to make that strategy work even better.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the primary goal of investing?',
          options: ['To have the lowest possible tax bill', 'To have a sound, long-term strategy', 'To have the most complex portfolio'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly. The investment plan comes first, tax optimization second.',
            incorrect: 'A sound investment strategy should always be the primary focus.'
          }
        }
      }
    ]
  },
  {
    id: 'i12',
    title: 'Financial Advisors',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Learn when and how to hire a professional.',
    longDescription: 'This lesson covers the world of financial advisors. You will learn about the different types of advisors, how they are paid, and the crucial importance of working with a "fiduciary" who is legally obligated to act in your best interest.',
    duration: 12,
    difficulty: 'Hard',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'Do You Need an Advisor?',
        content: 'For many people with simple financial lives, a DIY approach of investing in low-cost index funds is perfectly sufficient. However, as your finances become more complex (e.g., business ownership, inheritance), an advisor can provide significant value.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'An advisor can be helpful when your finances become more ___.',
          correctAnswer: 'complex'
        }
      },
      {
        title: 'The Fiduciary Standard',
        content: 'This is the most important concept. A "fiduciary" is a professional who is legally and ethically required to act in your best interest at all times. Not all financial advisors are fiduciaries.',
        exercise: {
          type: 'multiple-choice',
          question: 'A fiduciary must act in your...',
          options: ['Own best interest', 'Best interest', 'The company\'s best interest'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. This is the gold standard.',
            incorrect: 'A fiduciary has a legal duty to act in your best interest.'
          }
        }
      },
      {
        title: 'Ask the Question',
        content: 'When interviewing a potential advisor, you must ask them directly: "Are you a fiduciary?" If they hesitate, give a confusing answer, or say no, you should walk away.',
        exercise: {
          type: 'multiple-choice',
          question: 'What should you do if an advisor is not a fiduciary?',
          options: ['Hire them anyway', 'Negotiate their fee down', 'Do not work with them'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Exactly. It is a non-negotiable requirement.',
            incorrect: 'You should only work with advisors who are fiduciaries.'
          }
        }
      },
      {
        title: 'How Advisors Get Paid: Fee-Only',
        content: 'A "fee-only" advisor is paid only by you, the client. This could be an hourly rate, a flat fee for a project, or a percentage of the assets they manage (AUM). This is the most transparent compensation model.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A "fee-only" advisor is paid only by the ___.',
          correctAnswer: 'client'
        }
      },
      {
        title: 'How Advisors Get Paid: Commission',
        content: '"Commission-based" advisors are paid to sell you specific financial products, like mutual funds or insurance policies. This creates a massive conflict of interest, as they may be incentivized to sell you an expensive product that isn\'t in your best interest.',
        exercise: {
          type: 'multiple-choice',
          question: 'Which compensation model has the biggest conflict of interest?',
          options: ['Fee-only', 'Commission-based', 'Salary-based'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes. They are salespeople, not unbiased advisors.',
            incorrect: 'Commission-based compensation creates a major conflict of interest.'
          }
        }
      },
      {
        title: '"Fee-Based" is Not "Fee-Only"',
        content: 'Beware the term "fee-based." This sounds similar to "fee-only," but it means the advisor can earn both fees from you AND commissions from selling products. You should look for an advisor who is "fee-only."',
        exercise: {
          type: 'multiple-choice',
          question: 'Which term describes the preferred type of advisor?',
          options: ['Fee-based', 'Commission-based', 'Fee-only'],
          correctAnswerIndex: 2,
          feedback: {
            correct: 'Correct. "Fee-only" is the gold standard for compensation.',
            incorrect: '"Fee-only" is the most transparent and preferred model.'
          }
        }
      },
      {
        title: 'Certified Financial Planner (CFP)',
        content: 'A Certified Financial Planner (CFP) is a professional who has passed a rigorous exam and has a fiduciary duty to their clients. Looking for the CFP designation is a good way to find a qualified advisor.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'A well-respected designation for financial advisors is the ___.',
          correctAnswer: 'CFP'
        }
      },
      {
        title: 'A Good Advisor is a Coach',
        content: 'The primary role of a good advisor is not to pick hot stocks. It is to be a financial coach who helps you define your goals, create a plan, and, most importantly, helps you stick to that plan by managing your behavior during market turmoil.',
        exercise: {
          type: 'multiple-choice',
          question: 'A good advisor acts like a...',
          options: ['A stock-picking genius', 'A financial coach', 'A tax preparer'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s right. Behavioral coaching is one of their most valuable services.',
            incorrect: 'One of the most valuable roles an advisor can play is that of a behavioral coach.'
          }
        }
      }
    ]
  },
  {
    id: 'i13',
    title: 'The Stock Market',
    category: 'Investing',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'Understand how the stock market works.',
    longDescription: 'This lesson demystifies the stock market, explaining what it is, why it exists, and the roles of stock exchanges and indexes. Learn how share prices are determined and why the market tends to go up over the long term.',
    duration: 12,
    difficulty: 'Medium',
    interactive: true,
    requiresAuth: true,
    content: [
      {
        title: 'What is "The Market"?',
        content: '"The stock market" is not a physical place. It\'s a giant, global network of economic transactions where buyers and sellers trade ownership shares of public companies.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The stock market is where people buy and sell ___ in companies.',
          correctAnswer: 'shares'
        }
      },
      {
        title: 'Why Do Companies "Go Public"?',
        content: 'A company "goes public" by selling shares on the stock market to raise money (capital) to grow the business. This could be to build new factories, hire more employees, or conduct research.',
        exercise: {
          type: 'multiple-choice',
          question: 'Why does a company sell shares to the public?',
          options: ['To give away money', 'To raise money for growth', 'Because they are forced to'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct! It\'s a way to raise capital.',
            incorrect: 'They do it to raise capital to fund their expansion and operations.'
          }
        }
      },
      {
        title: 'Stock Exchanges',
        content: 'Major stock exchanges, like the New York Stock Exchange (NYSE) or the Nasdaq, are the platforms where these trades happen. They provide a regulated and organized marketplace for trading.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is the role of a stock exchange?',
          options: ['To set stock prices', 'To provide a marketplace for trading', 'To guarantee profits'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Yes, they are the organized marketplaces.',
            incorrect: 'They provide the platform and rules for trading to occur.'
          }
        }
      },
      {
        title: 'How are Prices Determined?',
        content: 'A stock\'s price is determined by supply and demand. If more people want to buy a stock (demand) than sell it (supply), the price goes up. If more people want to sell than buy, the price goes down.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'Stock prices are set by supply and ___.',
          correctAnswer: 'demand'
        }
      },
      {
        title: 'Why Do Prices Change?',
        content: 'Supply and demand changes based on investors\' collective expectations about a company\'s future profitability. Good news (like strong earnings) increases demand, while bad news decreases it.',
        exercise: {
          type: 'multiple-choice',
          question: 'Stock prices reflect expectations about a company\'s future ___',
          options: ['Marketing', 'Profitability', 'Number of employees'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Exactly. It\'s all about future earnings potential.',
            incorrect: 'Prices are based on collective expectations of future profitability.'
          }
        }
      },
      {
        title: 'Bull vs. Bear Markets',
        content: 'A "bull market" is a period when stock prices are generally rising. A "bear market" is a period when prices are falling (typically defined as a drop of 20% or more from recent highs).',
        exercise: {
          type: 'multiple-choice',
          question: 'A period of falling prices is called a ___ market.',
          options: ['Bull', 'Bear', 'Kangaroo'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'Correct. Think of a bear swiping its paw downwards.',
            incorrect: 'It\'s called a bear market.'
          }
        }
      },
      {
        title: 'Why the Market Goes Up Over Time',
        content: 'Over the long term, the stock market has consistently trended upwards. This is because it reflects the overall growth of the economy, driven by innovation, population growth, and the natural desire of companies to succeed and become more profitable.',
        exercise: {
          type: 'fill-in-the-blank',
          question: 'The market trends upward because it reflects the growth of the ___.',
          correctAnswer: 'economy'
        }
      },
      {
        title: 'You Are Buying a Business',
        content: 'It\'s important to remember that a stock is not just a lottery ticket. It is a real ownership stake in a real business. When you invest in the stock market, you are participating in the growth of human enterprise.',
        exercise: {
          type: 'multiple-choice',
          question: 'What is a stock?',
          options: ['A piece of paper', 'An ownership stake in a business', 'A gambling chip'],
          correctAnswerIndex: 1,
          feedback: {
            correct: 'That\'s the right way to think about it.',
            incorrect: 'A stock is an ownership share in a business.'
          }
        }
      }
    ]
  }
];
export const spendingLessons: Lesson[] = [];

export const allLessons = [...savingLessons, ...investingLessons, ...spendingLessons];


