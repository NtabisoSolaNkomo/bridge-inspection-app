import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Plus, Search, Calendar, MapPin, User, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { generateInspectionPDF, downloadPDF } from '@/utils/pdfGenerator';

// Type definition for inspection data
export interface InspectionReport {
  id: string;
  bridgeName: string;
  location: string;
  inspectorName: string;
  date: string;
  notes: string;
  createdAt: string;
  items: {
    id: string;
    title: string;
    description: string;
    category: string;
    photoUrl: string | null;
    comments: {
      id: string;
      text: string;
      severity: 'minor' | 'moderate' | 'critical';
      priority: 'low' | 'medium' | 'high';
    }[];
  }[];
}

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<InspectionReport[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState<InspectionReport[]>([]);

  useEffect(() => {
    const savedInspections = JSON.parse(localStorage.getItem('bridgeInspections') || '[]');
    setReports(savedInspections);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReports(reports);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = reports.filter(report => 
        report.bridgeName.toLowerCase().includes(term) ||
        report.location.toLowerCase().includes(term) ||
        report.inspectorName.toLowerCase().includes(term)
      );
      setFilteredReports(filtered);
    }
  }, [searchTerm, reports]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const generatePDF = (report: InspectionReport) => {
    try {
      const doc = generateInspectionPDF(report);
      const filename = `${report.bridgeName.replace(/\s+/g, '_')}_inspection_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(doc, filename);
      toast.success(`PDF report for ${report.bridgeName} has been downloaded`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const countIssuesBySeverity = (report: InspectionReport) => {
    const counts = { minor: 0, moderate: 0, critical: 0 };
    
    report.items.forEach(item => {
      item.comments.forEach(comment => {
        counts[comment.severity]++;
      });
    });
    
    return counts;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="heading-2">Inspection Reports</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button 
              onClick={() => navigate('/new-inspection')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Inspection
            </Button>
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <Card className="animate-fade-in">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              {reports.length === 0 ? (
                <>
                  <h3 className="text-lg font-medium mb-2">No Inspection Reports Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by creating your first bridge inspection.
                  </p>
                  <Button 
                    onClick={() => navigate('/new-inspection')} 
                    className="mt-2"
                  >
                    Create Your First Inspection
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium mb-2">No Matching Reports</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')} 
                    className="mt-2"
                  >
                    Clear Search
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report, index) => {
              const issueCounts = countIssuesBySeverity(report);
              const totalPhotos = report.items.filter(item => item.photoUrl).length;
              
              return (
                <Card 
                  key={report.id} 
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle>{report.bridgeName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <span>{report.inspectorName}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-3">
                      <div className="bg-secondary/80 px-3 py-1 rounded-md text-sm">
                        {report.items.length} Sections
                      </div>
                      <div className="bg-secondary/80 px-3 py-1 rounded-md text-sm">
                        {totalPhotos} Photos
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {issueCounts.critical > 0 && (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-100 text-red-800 text-sm">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {issueCounts.critical} Critical
                          </div>
                        )}
                        {issueCounts.moderate > 0 && (
                          <div className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-800 text-sm">
                            {issueCounts.moderate} Moderate
                          </div>
                        )}
                        {issueCounts.minor > 0 && (
                          <div className="px-3 py-1 rounded-md bg-green-100 text-green-800 text-sm">
                            {issueCounts.minor} Minor
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-end gap-2 pt-2">
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => generatePDF(report)}
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
