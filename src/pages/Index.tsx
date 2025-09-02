import { useState } from 'react';
import { useAssessment } from '@/hooks/useAssessment';
import AssessmentIntro from '@/components/AssessmentIntro';
import AssessmentQuestion from '@/components/AssessmentQuestion';
import AssessmentResults from '@/components/AssessmentResults';
import { AssessmentResults as Results } from '@/types/assessment';

const Index = () => {
  const {
    state,
    currentAnswer,
    getCurrentQuestion,
    getTotalQuestionsInSection,
    startAssessment,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    completeAssessment,
    restartAssessment,
    canGoNext,
    canGoPrevious
  } = useAssessment();

  const [assessmentResults, setAssessmentResults] = useState<Results | null>(null);

  const handleStartAssessment = () => {
    startAssessment();
  };

  const handleNextQuestion = () => {
    const currentQuestion = getCurrentQuestion();
    const sectionQuestions = getTotalQuestionsInSection();
    
    // Check if this is the last question
    if (state.currentSection === 'wiscar' && state.currentQuestionIndex >= sectionQuestions - 1) {
      const results = completeAssessment();
      setAssessmentResults(results);
    } else {
      goToNextQuestion();
    }
  };

  const handleRestartAssessment = () => {
    restartAssessment();
    setAssessmentResults(null);
  };

  // Render based on current section
  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }

  if (state.currentSection === 'results' && assessmentResults) {
    return (
      <AssessmentResults 
        results={assessmentResults} 
        onRestart={handleRestartAssessment} 
      />
    );
  }

  const currentQuestion = getCurrentQuestion();
  const totalQuestions = getTotalQuestionsInSection();

  if (!currentQuestion) {
    return <AssessmentIntro onStartAssessment={handleStartAssessment} />;
  }

  return (
    <AssessmentQuestion
      question={currentQuestion}
      currentIndex={state.currentQuestionIndex}
      totalQuestions={totalQuestions}
      selectedAnswer={currentAnswer}
      onAnswerSelect={selectAnswer}
      onNext={handleNextQuestion}
      onPrevious={goToPreviousQuestion}
      canGoNext={canGoNext}
      canGoPrevious={canGoPrevious}
      currentSection={state.currentSection}
    />
  );
};

export default Index;
