import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/assessment';
import { likertScale } from '@/data/questions';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AssessmentQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | number | null;
  onAnswerSelect: (value: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentSection: string;
}

const AssessmentQuestion = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  currentSection
}: AssessmentQuestionProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'psychometric': return 'Psychometric Assessment';
      case 'technical': return 'Technical Knowledge';
      case 'wiscar': return 'WISCAR Framework';
      default: return 'Assessment';
    }
  };

  const getSectionDescription = (section: string) => {
    switch (section) {
      case 'psychometric': return 'Evaluating your personality fit and motivation';
      case 'technical': return 'Testing your technical knowledge and aptitude';
      case 'wiscar': return 'Comprehensive framework analysis';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  {getSectionTitle(currentSection)}
                </h1>
                <p className="text-muted-foreground">
                  {getSectionDescription(currentSection)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">
                  Question {currentIndex + 1} of {totalQuestions}
                </div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="border-primary/10 shadow-large mb-8">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {question.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {question.type === 'likert' && (
                <RadioGroup
                  value={selectedAnswer?.toString() || ''}
                  onValueChange={(value) => onAnswerSelect(parseInt(value))}
                  className="space-y-4"
                >
                  {likertScale.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-primary/10 hover:bg-primary-light/30 transition-colors">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`option-${option.value}`}
                        className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label
                        htmlFor={`option-${option.value}`}
                        className="flex-1 cursor-pointer font-medium"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {(question.type === 'multiple-choice' || question.type === 'scenario') && question.options && (
                <RadioGroup
                  value={selectedAnswer?.toString() || ''}
                  onValueChange={(value) => onAnswerSelect(value)}
                  className="space-y-4"
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-primary/10 hover:bg-primary-light/30 transition-colors">
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                        className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer font-medium leading-relaxed"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Progress:</span>
              <div className="flex gap-1">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= currentIndex ? 'bg-primary' : 'bg-primary/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={onNext}
              disabled={!canGoNext}
              variant="default"
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuestion;