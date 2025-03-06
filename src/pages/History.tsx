
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText } from "lucide-react";

const History = () => {
  // Mock reports data - this would typically come from a database or localStorage
  const recentReports = [
    
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-2 mb-6">Generated Reports</h1>
        
        <div className="space-y-4 animate-fade-in">
          {recentReports.map((report, index) => (
            <Card 
              key={report.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{report.bridgeName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{report.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>{report.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default History;
