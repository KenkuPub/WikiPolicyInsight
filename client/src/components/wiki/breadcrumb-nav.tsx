import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbNavProps {
  path: string;
}

export function BreadcrumbNav({ path }: BreadcrumbNavProps) {
  const segments = path.split("/").filter(Boolean);
  
  return (
    <nav className="flex items-center space-x-2 mb-6 text-sm">
      <Link href="/">
        <a className="text-blue-900 hover:text-blue-700">Home</a>
      </Link>
      
      {segments.map((segment, i) => (
        <div key={i} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link href={`/article/${segments.slice(0, i + 1).join("/")}`}>
            <a className="text-blue-900 hover:text-blue-700 capitalize">
              {segment.replace(/-/g, " ")}
            </a>
          </Link>
        </div>
      ))}
    </nav>
  );
}
