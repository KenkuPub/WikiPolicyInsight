import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search } from "@/components/wiki/search";
import { Sidebar } from "@/components/wiki/sidebar";
import type { Article } from "@/types/wiki";

export default function Home() {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 flex gap-6">
        <Sidebar />
        
        <main className="flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-[#102954] mb-4">
              Executive Orders Analysis Wiki
            </h1>
            <Search />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-100 rounded mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              articles?.map((article) => (
                <Link key={article.id} href={`/article${article.path}`}>
                  <a className="block">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="font-serif">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {article.content.substring(0, 150)}...
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
