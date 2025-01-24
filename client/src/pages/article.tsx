import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { BreadcrumbNav } from "@/components/wiki/breadcrumb-nav";
import { Sidebar } from "@/components/wiki/sidebar";
import { Editor } from "@/components/wiki/editor";
import { ScoreCard } from "@/components/wiki/score-card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import type { Article } from "@/types/wiki";
import { useState } from "react";

export default function ArticlePage() {
  const [location] = useLocation();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles${location}`],
  });

  const updateMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(`/api/articles${location}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 flex gap-6">
        <Sidebar />

        <main className="flex-1">
          <BreadcrumbNav path={article.path} />

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-serif font-bold text-[#102954]">
                {article.title}
              </h1>
              {user?.isEditor && (
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              )}
            </div>

            <ScoreCard
              sentimentScore={article.sentimentScore}
              constitutionalityScore={article.constitutionalityScore}
              legalRiskScore={article.legalRiskScore}
              implementationRiskScore={article.implementationRiskScore}
            />

            {isEditing ? (
              <Editor
                initialContent={article.content}
                onSave={async (content) => {
                  await updateMutation.mutateAsync(content);
                  setIsEditing(false);
                }}
              />
            ) : (
              <div className="prose max-w-none">
                {article.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}