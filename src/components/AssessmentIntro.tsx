import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, TrendingUp, Shield, BarChart, Users } from 'lucide-react';

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  const traits = [
    { icon: BarChart, label: 'Analytical Thinking', description: 'Strong quantitative and data analysis skills' },
    { icon: Shield, label: 'Risk Awareness', description: 'Attention to detail and cautious approach' },
    { icon: Users, label: 'Communication', description: 'Ability to explain complex concepts clearly' },
    { icon: Target, label: 'Problem Solving', description: 'Structured approach to decision-making' }
  ];

  const careerPaths = [
    'Credit Risk Analyst',
    'Credit Risk Manager', 
    'Risk Modelling Specialist',
    'Portfolio Risk Analyst',
    'Financial Risk Consultant'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent-light">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-6 py-2 text-sm font-medium">
              Career Assessment Tool
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Should I Learn Credit Risk Specialist?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover your fit for a career in credit risk management through our comprehensive assessment
            </p>
          </div>

          {/* Assessment Info Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/10 shadow-medium hover:shadow-large transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="h-6 w-6" />
                  What You'll Discover
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">Psychometric Fit</h4>
                    <p className="text-sm text-muted-foreground">Your personality and motivation alignment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">Technical Readiness</h4>
                    <p className="text-sm text-muted-foreground">Current knowledge and aptitude assessment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">WISCAR Analysis</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive framework evaluation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-medium hover:shadow-large transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Clock className="h-6 w-6" />
                  Assessment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Duration</span>
                  <Badge variant="outline">20-30 minutes</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Questions</span>
                  <Badge variant="outline">22 questions</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sections</span>
                  <Badge variant="outline">3 modules</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Results</span>
                  <Badge variant="outline">Instant feedback</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What is Credit Risk Specialist */}
          <Card className="mb-12 border-primary/10 shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">What is a Credit Risk Specialist?</CardTitle>
              <CardDescription className="text-base">
                Credit Risk Specialists analyze borrower creditworthiness, manage risk models, and help financial institutions minimize loan defaults and losses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-primary">Key Responsibilities</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Assess creditworthiness of borrowers</li>
                    <li>• Develop and maintain risk assessment models</li>
                    <li>• Monitor portfolio performance and risk metrics</li>
                    <li>• Prepare risk reports for management</li>
                    <li>• Ensure compliance with regulatory requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-primary">Career Opportunities</h4>
                  <div className="flex flex-wrap gap-2">
                    {careerPaths.map((career, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Traits */}
          <Card className="mb-12 border-primary/10 shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Traits for Success</CardTitle>
              <CardDescription>
                Key characteristics that contribute to excellence in credit risk management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {traits.map((trait, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-primary-light/50 border border-primary/10">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <trait.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">{trait.label}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{trait.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button 
              onClick={onStartAssessment}
              variant="hero"
              size="lg"
              className="px-12 py-6 text-lg"
            >
              <TrendingUp className="h-6 w-6 mr-2" />
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Takes 20-30 minutes • Get instant personalized results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;