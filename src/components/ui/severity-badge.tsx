
import { cn } from "@/lib/utils";

type SeverityLevel = "minor" | "moderate" | "critical";

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        severity === "minor" && "bg-green-100 text-green-800",
        severity === "moderate" && "bg-yellow-100 text-yellow-800",
        severity === "critical" && "bg-red-100 text-red-800",
        className
      )}
    >
      {severity === "minor" && "Minor"}
      {severity === "moderate" && "Moderate"}
      {severity === "critical" && "Critical"}
    </div>
  );
}
