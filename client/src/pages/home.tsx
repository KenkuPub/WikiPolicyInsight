import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search } from "@/components/wiki/search";
import { Sidebar } from "@/components/wiki/sidebar";
import type { Article } from "@/types/wiki";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const { data: sections, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/sections"],
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
            <p className="text-gray-600 mb-6">
              A comprehensive analysis of Executive Orders, their constitutional implications,
              and legal considerations.
            </p>
            <Search />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-serif font-semibold text-[#102954] mb-6">
              Table of Contents
            </h2>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="grid gap-4">
                {isLoading ? (
                  Array(10).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                    </div>
                  ))
                ) : (
                  sections?.map((section) => (
                    <Link key={section.id} href={section.path}>
                      <a className="block p-3 rounded-md hover:bg-blue-50 transition-colors">
                        <h3 className="font-medium text-[#102954]">
                          {section.title}
                        </h3>
                        {section.content && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {section.content.substring(0, 150)}...
                          </p>
                        )}
                      </a>
                    </Link>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  );
}