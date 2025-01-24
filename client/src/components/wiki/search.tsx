import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { SearchResult } from "@/types/wiki";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";

export function Search() {
  const [query, setQuery] = useState("");

  const { data: results } = useQuery<SearchResult[]>({
    queryKey: ["/api/search", query],
    enabled: query.length > 2,
  });

  return (
    <div className="relative">
      <Command className="rounded-lg border shadow-sm">
        <CommandInput
          placeholder="Search executive orders..."
          value={query}
          onValueChange={setQuery}
        />
        {query.length > 2 && (
          <CommandList>
            {results?.map((result) => (
              <CommandItem key={result.id}>
                <Link href={`/article${result.path}`}>
                  <a className="block p-2 hover:bg-gray-50">
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-gray-600">{result.excerpt}</div>
                  </a>
                </Link>
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
