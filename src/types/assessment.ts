export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options?: string[];
  section: 'psychometric' | 'technical' | 'wiscar';
  category: string;
  weight: number;
}

export interface Answer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: Date;
  isComplete: boolean;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResults {
  psychometricFitScore: number;
  technicalReadinessScore: number;
  wiscarScores: WiscarScores;
  overallConfidenceScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  personalizedInsights: string[];
  nextStepsIfYes: string[];
  nextStepsIfNo: string[];
  careerRoles: string[];
  skillGapAreas: string[];
  alternatePaths: string[];
}

export interface CareerRole {
  title: string;
  description: string;
  keySkills: string[];
  salaryRange?: string;
  growthPotential?: string;
}