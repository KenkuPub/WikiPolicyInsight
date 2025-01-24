import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import type { Article } from "@/types/wiki";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScoreCard } from "@/components/wiki/score-card";
import { Sidebar } from "@/components/wiki/sidebar";

export default function Home() {
  const { data: sections } = useQuery<Article[]>({
    queryKey: ["/api/sections"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex gap-6">
        <Sidebar />

        <main className="flex-1">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold text-[#102954] mb-4">
              Executive Orders Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive analysis platform providing insights into Executive Orders,
              their constitutional implications, and legislative impact.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-serif font-semibold mb-2 text-[#102954]">
                  Constitutional Analysis
                </h3>
                <p className="text-gray-600">
                  In-depth evaluation of Executive Orders' alignment with constitutional principles
                  and precedents.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-serif font-semibold mb-2 text-[#102954]">
                  Legal Impact
                </h3>
                <p className="text-gray-600">
                  Assessment of legal implications and potential challenges to implementation
                  across jurisdictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-serif font-semibold mb-2 text-[#102954]">
                  Implementation Tracking
                </h3>
                <p className="text-gray-600">
                  Real-time monitoring of execution progress and effectiveness metrics
                  across agencies.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Dashboard */}
          <Card className="mb-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-semibold text-[#102954] mb-6">
                Executive Orders Analysis Dashboard
              </h2>
              <ScoreCard
                sentimentScore={0.75}
                constitutionalityScore={0.82}
                legalRiskScore={0.35}
                implementationRiskScore={0.28}
              />
              <p className="text-gray-600 mt-4">
                This dashboard provides a high-level overview of our analysis across all Executive Orders.
                The scores represent aggregated metrics from our comprehensive assessment framework.
              </p>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-semibold text-[#102954] mb-6">
                Recent Executive Orders
              </h2>
              <ScrollArea className="h-[400px]">
                <div className="grid gap-4">
                  {sections?.slice(0, 5).map((section) => (
                    <div
                      key={section.id}
                      className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="font-medium text-[#102954]">
                        {section.title}
                      </h3>
                      {section.content && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {section.content.substring(0, 150)}...
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}