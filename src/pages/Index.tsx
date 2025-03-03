
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { FileText, Camera, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Professional Bridge Inspection Tool
          </div>
          <h1 className="heading-1">Bridge Scan Pro</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your bridge inspections with comprehensive documentation, 
            detailed reports, and professional analysis.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => navigate('/new-inspection')}
            >
              <Camera className="h-4 w-4" />
              New Inspection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate('/reports')}
            >
              <FileText className="h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="animate-slide-up [animation-delay:200ms]">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Capture Photos</h3>
              <p className="text-muted-foreground">
                Take high-resolution images of bridge components and annotate them directly.
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:300ms]">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M8 6h13"></path>
                  <path d="M8 12h13"></path>
                  <path d="M8 18h13"></path>
                  <path d="M3 6h.01"></path>
                  <path d="M3 12h.01"></path>
                  <path d="M3 18h.01"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Add Comments</h3>
              <p className="text-muted-foreground">
                Document conditions with detailed comments, severity ratings, and priority levels.
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up [animation-delay:400ms]">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate Reports</h3>
              <p className="text-muted-foreground">
                Export professional PDF reports with all photos, comments, and findings.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-secondary rounded-xl p-6 mt-8 animate-slide-up [animation-delay:500ms]">
          <h2 className="heading-3 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-3">
                1
              </div>
              <h4 className="font-medium mb-1">Start Inspection</h4>
              <p className="text-sm text-muted-foreground">Create a new bridge inspection</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-3">
                2
              </div>
              <h4 className="font-medium mb-1">Capture Evidence</h4>
              <p className="text-sm text-muted-foreground">Take photos of bridge components</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-3">
                3
              </div>
              <h4 className="font-medium mb-1">Add Details</h4>
              <p className="text-sm text-muted-foreground">Document findings with comments</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-3">
                4
              </div>
              <h4 className="font-medium mb-1">Generate Report</h4>
              <p className="text-sm text-muted-foreground">Export as professional PDF</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6">
          <Button 
            onClick={() => navigate('/new-inspection')} 
            className="group"
          >
            Start a New Inspection 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
