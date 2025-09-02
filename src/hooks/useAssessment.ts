import { useState, useCallback } from 'react';
import { AssessmentState, Answer, AssessmentResults } from '@/types/assessment';
import { allQuestions } from '@/data/questions';
import { calculateScores } from '@/utils/scoring';

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  answers: [],
  startTime: new Date(),
  isComplete: false
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);
  const [currentAnswer, setCurrentAnswer] = useState<string | number | null>(null);

  const getCurrentQuestion = useCallback(() => {
    if (state.currentSection === 'intro' || state.currentSection === 'results') {
      return null;
    }
    
    const sectionQuestions = allQuestions.filter(q => q.section === state.currentSection);
    return sectionQuestions[state.currentQuestionIndex] || null;
  }, [state.currentSection, state.currentQuestionIndex]);

  const getCurrentSectionQuestions = useCallback(() => {
    if (state.currentSection === 'intro' || state.currentSection === 'results') {
      return [];
    }
    return allQuestions.filter(q => q.section === state.currentSection);
  }, [state.currentSection]);

  const getTotalQuestionsInSection = useCallback(() => {
    return getCurrentSectionQuestions().length;
  }, [getCurrentSectionQuestions]);

  const startAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      currentQuestionIndex: 0,
      startTime: new Date()
    }));
    setCurrentAnswer(null);
  }, []);

  const selectAnswer = useCallback((value: string | number) => {
    setCurrentAnswer(value);
  }, []);

  const saveCurrentAnswer = useCallback(() => {
    const question = getCurrentQuestion();
    if (!question || currentAnswer === null) return;

    setState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== question.id),
        {
          questionId: question.id,
          value: currentAnswer,
          timestamp: new Date()
        }
      ]
    }));
  }, [getCurrentQuestion, currentAnswer]);

  const goToNextQuestion = useCallback(() => {
    saveCurrentAnswer();
    
    const sectionQuestions = getCurrentSectionQuestions();
    const isLastQuestionInSection = state.currentQuestionIndex >= sectionQuestions.length - 1;

    if (isLastQuestionInSection) {
      // Move to next section
      const nextSection = getNextSection(state.currentSection);
      setState(prev => ({
        ...prev,
        currentSection: nextSection,
        currentQuestionIndex: 0
      }));
    } else {
      // Move to next question in current section
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }

    setCurrentAnswer(null);
  }, [saveCurrentAnswer, getCurrentSectionQuestions, state.currentQuestionIndex, state.currentSection]);

  const goToPreviousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    } else {
      // Move to previous section
      const prevSection = getPreviousSection(state.currentSection);
      const prevSectionQuestions = allQuestions.filter(q => q.section === prevSection);
      setState(prev => ({
        ...prev,
        currentSection: prevSection,
        currentQuestionIndex: Math.max(0, prevSectionQuestions.length - 1)
      }));
    }

    setCurrentAnswer(null);
  }, [state.currentQuestionIndex, state.currentSection]);

  const completeAssessment = useCallback((): AssessmentResults => {
    saveCurrentAnswer();
    
    const results = calculateScores(state.answers, allQuestions);
    
    setState(prev => ({
      ...prev,
      currentSection: 'results',
      isComplete: true
    }));

    return results;
  }, [saveCurrentAnswer, state.answers]);

  const restartAssessment = useCallback(() => {
    setState(initialState);
    setCurrentAnswer(null);
  }, []);

  const canGoNext = currentAnswer !== null;
  const canGoPrevious = state.currentQuestionIndex > 0 || state.currentSection !== 'psychometric';

  const getOverallProgress = useCallback(() => {
    const totalQuestions = allQuestions.length;
    const answeredQuestions = state.answers.length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }, [state.answers.length]);

  const getSectionProgress = useCallback(() => {
    const sectionQuestions = getCurrentSectionQuestions();
    const totalInSection = sectionQuestions.length;
    
    if (totalInSection === 0) return 0;
    
    return Math.round(((state.currentQuestionIndex + 1) / totalInSection) * 100);
  }, [getCurrentSectionQuestions, state.currentQuestionIndex]);

  return {
    state,
    currentAnswer,
    getCurrentQuestion,
    getCurrentSectionQuestions,
    getTotalQuestionsInSection,
    startAssessment,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    completeAssessment,
    restartAssessment,
    canGoNext,
    canGoPrevious,
    getOverallProgress,
    getSectionProgress
  };
};

const getNextSection = (currentSection: AssessmentState['currentSection']): AssessmentState['currentSection'] => {
  switch (currentSection) {
    case 'psychometric': return 'technical';
    case 'technical': return 'wiscar';
    case 'wiscar': return 'results';
    default: return 'results';
  }
};

const getPreviousSection = (currentSection: AssessmentState['currentSection']): AssessmentState['currentSection'] => {
  switch (currentSection) {
    case 'technical': return 'psychometric';
    case 'wiscar': return 'technical';
    case 'results': return 'wiscar';
    default: return 'psychometric';
  }
};