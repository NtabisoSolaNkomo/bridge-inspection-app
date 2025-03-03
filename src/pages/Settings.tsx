
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Bridge Inspection Co.",
    signature: "",
    enableNotifications: true,
    savePhotosToGallery: true,
    highResolutionPhotos: true,
    autoGenerateReports: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to localStorage or a database
    toast.success("Settings saved successfully");
  };

  const handleClearData = () => {
    // In a real app, this would clear the app's data
    localStorage.removeItem("bridgeInspections");
    toast.success("All data has been cleared");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="heading-2 mb-6">Settings</h1>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="animate-slide-up [animation-delay:100ms]">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your information will be included in exported reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={settings.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={settings.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">Digital Signature</Label>
                <Textarea
                  id="signature"
                  name="signature"
                  placeholder="Type your signature for reports"
                  value={settings.signature}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* App Preferences */}
          <Card className="animate-slide-up [animation-delay:200ms]">
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>
                Customize how the app works for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders and updates
                  </p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleSwitchChange("enableNotifications", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="savePhotosToGallery">Save Photos to Gallery</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save inspection photos to your device
                  </p>
                </div>
                <Switch
                  id="savePhotosToGallery"
                  checked={settings.savePhotosToGallery}
                  onCheckedChange={(checked) => handleSwitchChange("savePhotosToGallery", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="highResolutionPhotos">High Resolution Photos</Label>
                  <p className="text-sm text-muted-foreground">
                    Capture and store photos in high resolution
                  </p>
                </div>
                <Switch
                  id="highResolutionPhotos"
                  checked={settings.highResolutionPhotos}
                  onCheckedChange={(checked) => handleSwitchChange("highResolutionPhotos", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoGenerateReports">Auto-Generate Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate PDF after completing an inspection
                  </p>
                </div>
                <Switch
                  id="autoGenerateReports"
                  checked={settings.autoGenerateReports}
                  onCheckedChange={(checked) => handleSwitchChange("autoGenerateReports", checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Data Management */}
          <Card className="animate-slide-up [animation-delay:300ms]">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your inspection data and app storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Clear All Data</h3>
                <p className="text-sm text-muted-foreground">
                  This will permanently delete all inspections and reports. This action cannot be undone.
                </p>
                <Button 
                  variant="destructive" 
                  className="w-fit mt-2"
                  onClick={handleClearData}
                >
                  Clear All Data
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button 
              size="lg" 
              onClick={handleSaveSettings}
              className="animate-slide-up [animation-delay:400ms]"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
