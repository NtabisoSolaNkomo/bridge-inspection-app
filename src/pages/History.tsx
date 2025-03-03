
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, MapPin } from "lucide-react";

const History = () => {
  // Mock history data - this would typically come from a database or localStorage
  const recentInspections = [
    {
      id: "insp-1",
      bridgeName: "Main Street Bridge",
      date: "2023-05-15",
      time: "10:30 AM",
      location: "Portland, OR"
    },
    {
      id: "insp-2",
      bridgeName: "Harbor Bridge",
      date: "2023-05-10",
      time: "2:15 PM",
      location: "Seattle, WA"
    },
    {
      id: "insp-3",
      bridgeName: "River Crossing",
      date: "2023-05-05",
      time: "9:00 AM",
      location: "Vancouver, BC"
    }
  ];
  
  const recentReports = [
    {
      id: "rep-1",
      bridgeName: "Main Street Bridge",
      date: "2023-05-16",
      time: "4:45 PM",
      type: "PDF Export"
    },
    {
      id: "rep-2",
      bridgeName: "Harbor Bridge",
      date: "2023-05-11",
      time: "10:30 AM",
      type: "PDF Export"
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-2 mb-6">Activity History</h1>
        
        <Tabs defaultValue="inspections" className="animate-fade-in">
          <TabsList className="mb-6">
            <TabsTrigger value="inspections">Recent Inspections</TabsTrigger>
            <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inspections" className="space-y-4">
            {recentInspections.map((inspection, index) => (
              <Card 
                key={inspection.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{inspection.bridgeName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{new Date(inspection.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{inspection.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{inspection.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default History;
