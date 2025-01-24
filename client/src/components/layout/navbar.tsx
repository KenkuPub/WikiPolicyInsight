import { Link, useLocation } from "wouter";
import { Search } from "@/components/wiki/search";

export function Navbar() {
  const [location] = useLocation();
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="font-serif text-xl font-bold text-[#102954] cursor-pointer">
                Executive Orders Analysis
              </div>
            </Link>
          </div>
          
          <div className="flex-1 max-w-xl mx-8">
            <Search />
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                Editor Login
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
