import { Answer, Question, WiscarScores, AssessmentResults } from '@/types/assessment';

export const calculateScores = (answers: Answer[], questions: Question[]): AssessmentResults => {
  // Get answers by section
  const psychometricAnswers = answers.filter(a => 
    questions.find(q => q.id === a.questionId)?.section === 'psychometric'
  );
  const technicalAnswers = answers.filter(a => 
    questions.find(q => q.id === a.questionId)?.section === 'technical'
  );
  const wiscarAnswers = answers.filter(a => 
    questions.find(q => q.id === a.questionId)?.section === 'wiscar'
  );

  // Calculate psychometric fit score
  const psychometricFitScore = calculatePsychometricScore(psychometricAnswers, questions);
  
  // Calculate technical readiness score
  const technicalReadinessScore = calculateTechnicalScore(technicalAnswers, questions);
  
  // Calculate WISCAR scores
  const wiscarScores = calculateWiscarScores(wiscarAnswers, questions);
  
  // Calculate overall confidence score
  const overallConfidenceScore = Math.round(
    (psychometricFitScore * 0.3 + technicalReadinessScore * 0.3 + getWiscarAverage(wiscarScores) * 0.4)
  );

  // Generate recommendation
  const recommendation = getRecommendation(overallConfidenceScore);
  
  // Generate personalized insights
  const personalizedInsights = generateInsights(psychometricFitScore, technicalReadinessScore, wiscarScores);
  
  return {
    psychometricFitScore,
    technicalReadinessScore,
    wiscarScores,
    overallConfidenceScore,
    recommendation,
    personalizedInsights,
    nextStepsIfYes: getNextStepsIfYes(technicalReadinessScore, wiscarScores),
    nextStepsIfNo: getNextStepsIfNo(psychometricFitScore, technicalReadinessScore),
    careerRoles: [
      'Credit Risk Analyst',
      'Credit Risk Manager',
      'Risk Modelling Specialist',
      'Portfolio Risk Analyst',
      'Financial Risk Consultant'
    ],
    skillGapAreas: getSkillGaps(technicalReadinessScore, wiscarScores),
    alternatePaths: getAlternatePaths(psychometricFitScore, technicalReadinessScore)
  };
};

const calculatePsychometricScore = (answers: Answer[], questions: Question[]): number => {
  let totalScore = 0;
  let totalWeight = 0;

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && question.section === 'psychometric') {
      const normalizedScore = (Number(answer.value) / 5) * 100; // Convert 1-5 to 0-100
      totalScore += normalizedScore * question.weight;
      totalWeight += question.weight;
    }
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

const calculateTechnicalScore = (answers: Answer[], questions: Question[]): number => {
  let correctAnswers = 0;
  let totalQuestions = 0;

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && question.section === 'technical') {
      totalQuestions++;
      if (isCorrectAnswer(question.id, answer.value)) {
        correctAnswers++;
      }
    }
  });

  return totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
};

const calculateWiscarScores = (answers: Answer[], questions: Question[]): WiscarScores => {
  const categories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: WiscarScores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };

  categories.forEach(category => {
    const categoryAnswers = answers.filter(a => {
      const question = questions.find(q => q.id === a.questionId);
      return question?.category === category;
    });

    let totalScore = 0;
    let totalWeight = 0;

    categoryAnswers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        let normalizedScore: number;
        
        if (question.type === 'scenario') {
          normalizedScore = getScenarioScore(question.id, answer.value);
        } else {
          normalizedScore = (Number(answer.value) / 5) * 100;
        }
        
        totalScore += normalizedScore * question.weight;
        totalWeight += question.weight;
      }
    });

    scores[category as keyof WiscarScores] = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  });

  return scores;
};

const isCorrectAnswer = (questionId: string, answer: string | number): boolean => {
  const correctAnswers: Record<string, string> = {
    'tech1': 'To predict the probability of default',
    'tech2': 'Good creditworthiness',
    'tech3': '30',
    'tech4': 'The percentage of exposure lost if default occurs',
    'tech5': 'High debt-to-income ratio',
    'tech6': 'Evaluating performance under adverse conditions'
  };

  return correctAnswers[questionId] === answer;
};

const getScenarioScore = (questionId: string, answer: string | number): number => {
  const scenarioScores: Record<string, Record<string, number>> = {
    'realworld1': {
      'Immediately report it to your supervisor': 85,
      'Investigate further to confirm before reporting': 100,
      'Discuss with colleagues first': 60,
      'Wait to see if others notice it': 20
    },
    'realworld2': {
      'Accept the deadline and work overtime': 40,
      'Explain the risks of rushing and negotiate timeline': 100,
      'Delegate to junior staff': 30,
      'Provide a preliminary assessment only': 70
    }
  };

  return scenarioScores[questionId]?.[answer as string] || 50;
};

const getWiscarAverage = (scores: WiscarScores): number => {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, score) => sum + score, 0) / values.length);
};

const getRecommendation = (score: number): 'Yes' | 'Maybe' | 'No' => {
  if (score >= 75) return 'Yes';
  if (score >= 60) return 'Maybe';
  return 'No';
};

const generateInsights = (
  psychometric: number, 
  technical: number, 
  wiscar: WiscarScores
): string[] => {
  const insights: string[] = [];

  if (psychometric >= 75) {
    insights.push('Strong psychological fit for credit risk work - you show excellent motivation and personality alignment.');
  } else if (psychometric >= 60) {
    insights.push('Good psychological foundation with room for growth in motivation and risk mindset.');
  } else {
    insights.push('Consider developing stronger interest in analytical and risk-focused work.');
  }

  if (technical >= 75) {
    insights.push('Solid technical foundation - ready for advanced credit risk concepts.');
  } else if (technical >= 60) {
    insights.push('Good baseline knowledge, but strengthen core credit risk and statistical concepts.');
  } else {
    insights.push('Focus on building fundamental knowledge in finance, statistics, and credit risk basics.');
  }

  if (wiscar.cognitive >= 75) {
    insights.push('Excellent analytical and problem-solving abilities for complex risk scenarios.');
  }

  if (wiscar.will < 60) {
    insights.push('Consider building stronger long-term commitment and persistence for this field.');
  }

  return insights;
};

const getNextStepsIfYes = (technical: number, wiscar: WiscarScores): string[] => {
  const steps: string[] = [];

  if (technical < 80) {
    steps.push('Study credit risk fundamentals and regulatory frameworks');
    steps.push('Learn statistical modeling with Python or R');
  } else {
    steps.push('Pursue advanced credit risk modeling certifications');
    steps.push('Gain hands-on experience with real credit portfolios');
  }

  if (wiscar.skill < 70) {
    steps.push('Develop proficiency in Excel, SQL, and data analysis tools');
  }

  steps.push('Build a portfolio of credit risk analysis projects');
  steps.push('Network with credit risk professionals and join industry groups');

  return steps;
};

const getNextStepsIfNo = (psychometric: number, technical: number): string[] => {
  const steps: string[] = [];

  if (psychometric < 60) {
    steps.push('Explore roles in general finance or data analysis to build interest');
    steps.push('Consider whether analytical, detail-oriented work truly appeals to you');
  }

  if (technical < 60) {
    steps.push('Strengthen foundational math and statistics skills');
    steps.push('Take introductory finance courses to build domain knowledge');
  }

  steps.push('Consider alternative finance careers that may be a better fit');
  steps.push('Reassess your interests and career goals');

  return steps;
};

const getSkillGaps = (technical: number, wiscar: WiscarScores): string[] => {
  const gaps: string[] = [];

  if (technical < 70) {
    gaps.push('Credit risk modeling techniques');
    gaps.push('Regulatory compliance knowledge');
  }

  if (wiscar.skill < 70) {
    gaps.push('Statistical analysis software proficiency');
    gaps.push('Financial data analysis');
  }

  if (wiscar.cognitive < 70) {
    gaps.push('Advanced problem-solving methodologies');
  }

  return gaps;
};

const getAlternatePaths = (psychometric: number, technical: number): string[] => {
  const paths: string[] = [];

  if (psychometric >= 60 && technical < 60) {
    paths.push('Financial Data Analyst');
    paths.push('Compliance Officer');
  }

  if (technical >= 60 && psychometric < 60) {
    paths.push('Quantitative Analyst');
    paths.push('Data Scientist');
  }

  if (psychometric < 60 && technical < 60) {
    paths.push('General Finance Analyst');
    paths.push('Business Analyst');
    paths.push('Customer Relationship Manager');
  }

  return paths;
};