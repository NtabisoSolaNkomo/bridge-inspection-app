
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Edit2, Trash2 } from 'lucide-react';

export interface Comment {
  id: string;
  text: string;
  severity: 'minor' | 'moderate' | 'critical';
  priority: 'low' | 'medium' | 'high';
}

interface CommentCardProps {
  comment: Comment;
  onUpdate: (comment: Comment) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function CommentCard({ comment, onUpdate, onDelete, className }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'critical'>(comment.severity);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(comment.priority);

  const handleSave = () => {
    onUpdate({
      ...comment,
      text,
      severity,
      priority
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={cn("p-4 rounded-lg border bg-card animate-scale-in", className)}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="comment-text">Comment</Label>
            <Textarea
              id="comment-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe the issue..."
              className="mt-1 resize-none"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="severity">Severity</Label>
              <Select value={severity} onValueChange={(val: any) => setSeverity(val)}>
                <SelectTrigger id="severity">
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
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(val: any) => setPriority(val)}>
                <SelectTrigger id="priority">
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
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4 rounded-lg border bg-card", className)}>
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <SeverityBadge severity={comment.severity} />
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            priority === "low" && "bg-blue-100 text-blue-800",
            priority === "medium" && "bg-purple-100 text-purple-800",
            priority === "high" && "bg-orange-100 text-orange-800"
          )}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </span>
        </div>
        <div className="flex space-x-1">
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onDelete(comment.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="mt-2 text-sm text-foreground/90">{comment.text}</p>
    </div>
  );
}
