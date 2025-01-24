import { Card, CardContent } from "@/components/ui/card";
import type { ScoreCardProps } from "@/types/wiki";

const getScoreColor = (score: number) => {
  if (score >= 0.7) return "text-green-600";
  if (score >= 0.4) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBackground = (score: number) => {
  if (score >= 0.7) return "bg-green-50";
  if (score >= 0.4) return "bg-yellow-50";
  return "bg-red-50";
};

const ScoreIndicator = ({ label, score }: { label: string; score: number }) => (
  <div className={`p-4 rounded-lg ${getScoreBackground(score)}`}>
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
      {(score * 100).toFixed(0)}%
    </div>
  </div>
);

export function ScoreCard({
  sentimentScore,
  constitutionalityScore,
  legalRiskScore,
  implementationRiskScore,
}: ScoreCardProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-serif font-semibold mb-4 text-[#102954]">
          Analysis Scores
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ScoreIndicator label="Sentiment" score={sentimentScore} />
          <ScoreIndicator label="Constitutionality" score={constitutionalityScore} />
          <ScoreIndicator label="Legal Risk" score={1 - legalRiskScore} />
          <ScoreIndicator label="Implementation Risk" score={1 - implementationRiskScore} />
        </div>
      </CardContent>
    </Card>
  );
}
