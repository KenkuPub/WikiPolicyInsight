import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditorProps {
  initialContent: string;
  onSave: (content: string) => Promise<void>;
}

export function Editor({ initialContent, onSave }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(content);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[400px] font-mono"
      />
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
