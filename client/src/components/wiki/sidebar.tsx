import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Article } from "@/types/wiki";

export function Sidebar() {
  const [location] = useLocation();
  const { data: articles } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
        <h2 className="font-serif font-bold text-lg text-[#102954] mb-4">
          Navigation
        </h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="space-y-1">
            {articles?.map((article) => (
              <Link key={article.id} href={article.path}>
                <div
                  className={`block px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                    location === article.path
                      ? "bg-blue-50 text-blue-900"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {article.title}
                </div>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}