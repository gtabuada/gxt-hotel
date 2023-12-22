"use client";
import { SummaryCard } from "~/components/Summary";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <SummaryCard key={i} />
          ))}
      </div>
    </div>
  );
}
