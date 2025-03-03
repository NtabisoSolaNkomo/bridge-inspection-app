
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { InspectionItemCard, InspectionItem } from '@/components/inspection-item';
import { Plus, FilePlus, FileText } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const NewInspection = () => {
  const navigate = useNavigate();
  const [inspectionData, setInspectionData] = useState({
    bridgeName: '',
    location: '',
    inspectorName: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [inspectionItems, setInspectionItems] = useState<InspectionItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInspectionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewItem = () => {
    const newItem: InspectionItem = {
      id: uuidv4(),
      title: '',
      description: '',
      category: 'superstructure',
      photoUrl: null,
      comments: [],
    };
    
    setInspectionItems((prev) => [...prev, newItem]);
  };

  const updateItem = (updatedItem: InspectionItem) => {
    setInspectionItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteItem = (id: string) => {
    setInspectionItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveInspection = () => {
    // Validate required fields
    if (!inspectionData.bridgeName.trim() || !inspectionData.location.trim() || !inspectionData.inspectorName.trim()) {
      toast.error('Please fill out all required fields');
      return;
    }

    if (inspectionItems.length === 0) {
      toast.error('Please add at least one inspection item');
      return;
    }

    // Prepare inspection data for saving
    const inspection = {
      id: uuidv4(),
      ...inspectionData,
      items: inspectionItems,
      createdAt: new Date().toISOString(),
    };

    // In a real app, this would save to localStorage, a database, etc.
    // For now, we'll just show a success message and navigate
    console.log('Saving inspection:', inspection);
    
    // Mock saving to localStorage for demo purposes
    const savedInspections = JSON.parse(localStorage.getItem('bridgeInspections') || '[]');
    savedInspections.push(inspection);
    localStorage.setItem('bridgeInspections', JSON.stringify(savedInspections));
    
    toast.success('Inspection saved successfully');
    navigate('/reports');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-2 mb-6">New Bridge Inspection</h1>
        
        {/* Inspection Details Card */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle>Inspection Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bridgeName" className="required">Bridge Name</Label>
                <Input
                  id="bridgeName"
                  name="bridgeName"
                  value={inspectionData.bridgeName}
                  onChange={handleInputChange}
                  placeholder="e.g., Main Street Bridge"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="required">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={inspectionData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., City, State"
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspectorName" className="required">Inspector Name</Label>
                <Input
                  id="inspectorName"
                  name="inspectorName"
                  value={inspectionData.inspectorName}
                  onChange={handleInputChange}
                  placeholder="e.g., John Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="required">Inspection Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={inspectionData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={inspectionData.notes}
                onChange={handleInputChange}
                placeholder="Additional context or information about the inspection..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Inspection Items Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-3">Inspection Items ({inspectionItems.length})</h2>
            <Button onClick={addNewItem} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </div>
          
          {inspectionItems.length === 0 ? (
            <Card className="animate-fade-in">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <FilePlus className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Inspection Items Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add sections for different parts of the bridge such as deck, superstructure, substructure, etc.
                </p>
                <Button onClick={addNewItem} className="mt-2">Add Your First Section</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {inspectionItems.map((item) => (
                <InspectionItemCard
                  key={item.id}
                  item={item}
                  onUpdate={updateItem}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveInspection}
            className="flex items-center gap-2"
            disabled={inspectionItems.length === 0}
          >
            <FileText className="h-4 w-4" />
            Save Inspection
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NewInspection;
