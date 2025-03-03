
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommentCard, Comment } from '@/components/comment-card';
import { PhotoCapture } from '@/components/photo-capture';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface InspectionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  photoUrl: string | null;
  comments: Comment[];
}

interface InspectionItemCardProps {
  item: InspectionItem;
  onUpdate: (item: InspectionItem) => void;
  onDelete: (id: string) => void;
}

export function InspectionItemCard({ item, onUpdate, onDelete }: InspectionItemCardProps) {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newSeverity, setNewSeverity] = useState<'minor' | 'moderate' | 'critical'>('minor');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('low');

  const handlePhotoCapture = (file: File) => {
    // Create a temporary URL for the captured image
    const url = URL.createObjectURL(file);
    
    // Update the inspection item with the new photo URL
    onUpdate({
      ...item,
      photoUrl: url,
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    const comment: Comment = {
      id: uuidv4(),
      text: newComment,
      severity: newSeverity,
      priority: newPriority,
    };

    onUpdate({
      ...item,
      comments: [...item.comments, comment],
    });

    // Reset the form
    setNewComment('');
    setNewSeverity('minor');
    setNewPriority('low');
    setIsAddingComment(false);
    toast.success('Comment added successfully');
  };

  const handleUpdateComment = (updatedComment: Comment) => {
    const updatedComments = item.comments.map(comment => 
      comment.id === updatedComment.id ? updatedComment : comment
    );
    
    onUpdate({
      ...item,
      comments: updatedComments,
    });
    
    toast.success('Comment updated successfully');
  };

  const handleDeleteComment = (commentId: string) => {
    onUpdate({
      ...item,
      comments: item.comments.filter(comment => comment.id !== commentId),
    });
    
    toast.success('Comment deleted');
  };

  return (
    <Card className="w-full animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <Label htmlFor={`item-title-${item.id}`} className="text-sm text-muted-foreground">Section Title</Label>
            <Input
              id={`item-title-${item.id}`}
              value={item.title}
              onChange={(e) => onUpdate({ ...item, title: e.target.value })}
              className="mt-1 text-lg font-semibold"
              placeholder="e.g., Deck Surface, Support Beams"
            />
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(item.id)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-2">
          <Label htmlFor={`item-category-${item.id}`} className="text-sm text-muted-foreground">Category</Label>
          <Select 
            value={item.category} 
            onValueChange={(value) => onUpdate({ ...item, category: value })}
          >
            <SelectTrigger id={`item-category-${item.id}`} className="mt-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="superstructure">Superstructure</SelectItem>
              <SelectItem value="substructure">Substructure</SelectItem>
              <SelectItem value="deck">Deck</SelectItem>
              <SelectItem value="joints">Joints</SelectItem>
              <SelectItem value="bearings">Bearings</SelectItem>
              <SelectItem value="drainage">Drainage</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2">
          <Label htmlFor={`item-desc-${item.id}`} className="text-sm text-muted-foreground">Description</Label>
          <Textarea
            id={`item-desc-${item.id}`}
            value={item.description}
            onChange={(e) => onUpdate({ ...item, description: e.target.value })}
            className="mt-1 resize-none"
            placeholder="Describe this section of the bridge..."
            rows={2}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Photo Section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Photo Evidence</h3>
          {item.photoUrl ? (
            <div className="relative rounded-lg overflow-hidden border h-48">
              <img 
                src={item.photoUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 opacity-80 hover:opacity-100"
                onClick={() => onUpdate({ ...item, photoUrl: null })}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <PhotoCapture onCapture={handlePhotoCapture} />
          )}
        </div>

        {/* Comments Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Comments ({item.comments.length})</h3>
            {!isAddingComment && (
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => setIsAddingComment(true)}
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Comment</span>
              </Button>
            )}
          </div>

          {isAddingComment && (
            <div className="p-4 rounded-lg border mb-3 animate-slide-up">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-comment">Comment</Label>
                  <Textarea
                    id="new-comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe the issue..."
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="new-severity">Severity</Label>
                    <Select 
                      value={newSeverity} 
                      onValueChange={(val: any) => setNewSeverity(val)}
                    >
                      <SelectTrigger id="new-severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="new-priority">Priority</Label>
                    <Select 
                      value={newPriority} 
                      onValueChange={(val: any) => setNewPriority(val)}
                    >
                      <SelectTrigger id="new-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingComment(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddComment}>Add Comment</Button>
                </div>
              </div>
            </div>
          )}

          {item.comments.length > 0 ? (
            <div className="space-y-3">
              {item.comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onUpdate={handleUpdateComment}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No comments yet. Add a comment to document issues.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
