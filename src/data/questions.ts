import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'psych1',
    text: 'I enjoy analyzing complex data to identify patterns and trends.',
    type: 'likert',
    section: 'psychometric',
    category: 'analytical_interest',
    weight: 1.2
  },
  {
    id: 'psych2',
    text: 'I prefer working with structured processes and clear guidelines.',
    type: 'likert',
    section: 'psychometric',
    category: 'structure_preference',
    weight: 1.1
  },
  {
    id: 'psych3',
    text: 'I am comfortable making decisions with incomplete information.',
    type: 'likert',
    section: 'psychometric',
    category: 'risk_tolerance',
    weight: 1.3
  },
  {
    id: 'psych4',
    text: 'I pay close attention to details and rarely make careless errors.',
    type: 'likert',
    section: 'psychometric',
    category: 'attention_to_detail',
    weight: 1.4
  },
  {
    id: 'psych5',
    text: 'I enjoy communicating complex findings to different stakeholders.',
    type: 'likert',
    section: 'psychometric',
    category: 'communication',
    weight: 1.0
  },
  {
    id: 'psych6',
    text: 'When facing setbacks, I persist and find alternative approaches.',
    type: 'likert',
    section: 'psychometric',
    category: 'resilience',
    weight: 1.2
  },
  {
    id: 'psych7',
    text: 'I am naturally cautious and prefer to minimize risks.',
    type: 'likert',
    section: 'psychometric',
    category: 'risk_aversion',
    weight: 1.1
  },
  {
    id: 'psych8',
    text: 'I find satisfaction in preventing problems before they occur.',
    type: 'likert',
    section: 'psychometric',
    category: 'preventive_mindset',
    weight: 1.2
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 'tech1',
    text: 'What is the primary purpose of a credit risk model?',
    type: 'multiple-choice',
    options: [
      'To maximize lending profits',
      'To predict the probability of default',
      'To set interest rates',
      'To approve all loan applications'
    ],
    section: 'technical',
    category: 'basic_concepts',
    weight: 1.0
  },
  {
    id: 'tech2',
    text: 'If a borrower has a credit score of 720, what does this typically indicate?',
    type: 'multiple-choice',
    options: [
      'High risk of default',
      'Average creditworthiness',
      'Good creditworthiness',
      'Insufficient information to assess'
    ],
    section: 'technical',
    category: 'credit_scoring',
    weight: 1.1
  },
  {
    id: 'tech3',
    text: 'Calculate: If a portfolio has 1000 loans and the expected default rate is 3%, how many defaults are expected?',
    type: 'multiple-choice',
    options: ['3', '30', '300', '3000'],
    section: 'technical',
    category: 'basic_math',
    weight: 1.2
  },
  {
    id: 'tech4',
    text: 'What does "Loss Given Default (LGD)" represent?',
    type: 'multiple-choice',
    options: [
      'The probability a borrower will default',
      'The percentage of exposure lost if default occurs',
      'The total amount lent to a borrower',
      'The interest rate charged to risky borrowers'
    ],
    section: 'technical',
    category: 'risk_metrics',
    weight: 1.3
  },
  {
    id: 'tech5',
    text: 'Which factor would MOST likely increase credit risk?',
    type: 'multiple-choice',
    options: [
      'Stable employment history',
      'High debt-to-income ratio',
      'Diversified income sources',
      'Strong cash reserves'
    ],
    section: 'technical',
    category: 'risk_factors',
    weight: 1.1
  },
  {
    id: 'tech6',
    text: 'In credit risk management, what is stress testing used for?',
    type: 'multiple-choice',
    options: [
      'Testing computer systems',
      'Evaluating performance under adverse conditions',
      'Training new employees',
      'Calculating daily profits'
    ],
    section: 'technical',
    category: 'risk_management',
    weight: 1.2
  }
];

export const wiscarQuestions: Question[] = [
  // Will
  {
    id: 'will1',
    text: 'I am committed to developing expertise in financial risk analysis over the next 3-5 years.',
    type: 'likert',
    section: 'wiscar',
    category: 'will',
    weight: 1.0
  },
  {
    id: 'will2',
    text: 'I would continue studying credit risk concepts even if the learning becomes challenging.',
    type: 'likert',
    section: 'wiscar',
    category: 'will',
    weight: 1.1
  },
  
  // Interest
  {
    id: 'interest1',
    text: 'I actively seek out articles and news about financial markets and banking.',
    type: 'likert',
    section: 'wiscar',
    category: 'interest',
    weight: 1.0
  },
  {
    id: 'interest2',
    text: 'I find the concept of predicting financial outcomes intellectually stimulating.',
    type: 'likert',
    section: 'wiscar',
    category: 'interest',
    weight: 1.1
  },
  
  // Skill
  {
    id: 'skill1',
    text: 'I am comfortable using spreadsheet software for data analysis.',
    type: 'likert',
    section: 'wiscar',
    category: 'skill',
    weight: 1.0
  },
  {
    id: 'skill2',
    text: 'I have experience with statistical concepts like probability and correlation.',
    type: 'likert',
    section: 'wiscar',
    category: 'skill',
    weight: 1.2
  },
  
  // Cognitive
  {
    id: 'cognitive1',
    text: 'I can effectively break down complex problems into manageable parts.',
    type: 'likert',
    section: 'wiscar',
    category: 'cognitive',
    weight: 1.1
  },
  {
    id: 'cognitive2',
    text: 'I enjoy puzzles and logical reasoning challenges.',
    type: 'likert',
    section: 'wiscar',
    category: 'cognitive',
    weight: 1.0
  },
  
  // Ability to Learn
  {
    id: 'ability1',
    text: 'I actively seek feedback to improve my performance.',
    type: 'likert',
    section: 'wiscar',
    category: 'ability',
    weight: 1.0
  },
  {
    id: 'ability2',
    text: 'I adapt quickly to new tools and methodologies.',
    type: 'likert',
    section: 'wiscar',
    category: 'ability',
    weight: 1.1
  },
  
  // Real-world Alignment
  {
    id: 'realworld1',
    text: 'You discover a potential error in a risk model that could affect lending decisions. What do you do?',
    type: 'scenario',
    options: [
      'Immediately report it to your supervisor',
      'Investigate further to confirm before reporting',
      'Discuss with colleagues first',
      'Wait to see if others notice it'
    ],
    section: 'wiscar',
    category: 'realWorld',
    weight: 1.3
  },
  {
    id: 'realworld2',
    text: 'A business unit requests a risk assessment with an unrealistic deadline. How do you respond?',
    type: 'scenario',
    options: [
      'Accept the deadline and work overtime',
      'Explain the risks of rushing and negotiate timeline',
      'Delegate to junior staff',
      'Provide a preliminary assessment only'
    ],
    section: 'wiscar',
    category: 'realWorld',
    weight: 1.2
  }
];

export const allQuestions = [...psychometricQuestions, ...technicalQuestions, ...wiscarQuestions];

export const likertScale = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];