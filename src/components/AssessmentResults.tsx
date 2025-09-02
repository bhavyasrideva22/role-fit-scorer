import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults as Results } from '@/types/assessment';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  BarChart3,
  Brain,
  Target,
  Star,
  BookOpen,
  Users,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="h-8 w-8 text-success" />;
      case 'Maybe': return <AlertCircle className="h-8 w-8 text-warning" />;
      case 'No': return <XCircle className="h-8 w-8 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'success';
      case 'Maybe': return 'warning';
      case 'No': return 'destructive';
      default: return 'secondary';
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <TrendingUp className="h-5 w-5 text-success" />;
    if (score >= 60) return <Minus className="h-5 w-5 text-warning" />;
    return <TrendingDown className="h-5 w-5 text-destructive" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const wiscarData = [
    { subject: 'Will', value: results.wiscarScores.will, fullMark: 100 },
    { subject: 'Interest', value: results.wiscarScores.interest, fullMark: 100 },
    { subject: 'Skill', value: results.wiscarScores.skill, fullMark: 100 },
    { subject: 'Cognitive', value: results.wiscarScores.cognitive, fullMark: 100 },
    { subject: 'Ability', value: results.wiscarScores.ability, fullMark: 100 },
    { subject: 'Real-World', value: results.wiscarScores.realWorld, fullMark: 100 },
  ];

  const overallScoreData = [
    { name: 'Score', value: results.overallConfidenceScore, color: 'hsl(var(--primary))' },
    { name: 'Remaining', value: 100 - results.overallConfidenceScore, color: 'hsl(var(--muted))' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-6 py-2 text-sm font-medium">
              Assessment Complete
            </Badge>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Your Credit Risk Specialist Assessment Results
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              {getRecommendationIcon(results.recommendation)}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {results.overallConfidenceScore}%
                </div>
                <Badge 
                  variant={getRecommendationColor(results.recommendation) as any}
                  className="px-4 py-2 text-lg font-semibold"
                >
                  {results.recommendation === 'Yes' ? 'Highly Recommended' : 
                   results.recommendation === 'Maybe' ? 'Moderately Recommended' : 
                   'Not Recommended at This Time'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Overall Score Visualization */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/10 shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="h-6 w-6" />
                  Overall Confidence Score
                </CardTitle>
                <CardDescription>
                  Comprehensive assessment based on all evaluation criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={overallScoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        {overallScoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">
                        {results.overallConfidenceScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Confidence Score
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BarChart3 className="h-6 w-6" />
                  Score Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed analysis across key assessment areas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Psychometric Fit</span>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(results.psychometricFitScore)}
                      <span className={`font-bold ${getScoreColor(results.psychometricFitScore)}`}>
                        {results.psychometricFitScore}%
                      </span>
                    </div>
                  </div>
                  <Progress value={results.psychometricFitScore} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(results.technicalReadinessScore)}
                      <span className={`font-bold ${getScoreColor(results.technicalReadinessScore)}`}>
                        {results.technicalReadinessScore}%
                      </span>
                    </div>
                  </div>
                  <Progress value={results.technicalReadinessScore} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">WISCAR Average</span>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}
                      <span className={`font-bold ${getScoreColor(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}`}>
                        {Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Radar Chart */}
          <Card className="mb-12 border-primary/10 shadow-large">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Brain className="h-6 w-6" />
                WISCAR Framework Analysis
              </CardTitle>
              <CardDescription>
                Comprehensive evaluation across six key dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={wiscarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" className="text-sm" />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      className="text-xs"
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {Object.entries(results.wiscarScores).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-primary-light/20 rounded-lg">
                    <div className="font-semibold text-primary capitalize">
                      {key === 'realWorld' ? 'Real-World' : key}
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(value)}`}>
                      {value}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights and Recommendations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/10 shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Star className="h-6 w-6" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.personalizedInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-primary-light/10 rounded-lg border border-primary/10">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <BookOpen className="h-6 w-6" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.recommendation !== 'No' && (
                    <div>
                      <h4 className="font-semibold text-success mb-3">If You Proceed:</h4>
                      <div className="space-y-2">
                        {results.nextStepsIfYes.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <ArrowRight className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.recommendation !== 'Yes' && (
                    <div>
                      <h4 className="font-semibold text-warning mb-3">Alternative Considerations:</h4>
                      <div className="space-y-2">
                        {results.nextStepsIfNo.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <ArrowRight className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Paths and Skill Gaps */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/10 shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Users className="h-6 w-6" />
                  Relevant Career Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {results.careerRoles.map((role, index) => (
                    <div key={index} className="p-3 bg-primary-light/10 rounded-lg border border-primary/10">
                      <div className="font-medium text-primary">{role}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="h-6 w-6" />
                  Areas for Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.skillGapAreas.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Skill Gaps to Address:</h4>
                      <div className="space-y-2">
                        {results.skillGapAreas.map((gap, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {gap}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.alternatePaths.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Alternative Career Paths:</h4>
                      <div className="space-y-2">
                        {results.alternatePaths.map((path, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">
                              {path}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Results
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share Results
              </Button>
              <Button 
                onClick={onRestart}
                variant="secondary" 
                size="lg"
              >
                Take Assessment Again
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Results are personalized based on your responses and current industry standards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;