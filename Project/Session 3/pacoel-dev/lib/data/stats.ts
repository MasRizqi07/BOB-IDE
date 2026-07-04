/**
 * Stat data — animated counters displayed in the About section.
 */
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const STATS: StatItem[] = [
  {
    value: 5,
    suffix: "+",
    label: "Years",
    description: "Professional experience",
  },
  {
    value: 30,
    suffix: "+",
    label: "Projects",
    description: "Shipped to production",
  },
  {
    value: 12,
    suffix: "+",
    label: "Technologies",
    description: "Across the full stack",
  },
  {
    value: 100,
    suffix: "%",
    label: "Committed",
    description: "To clean, tested code",
  },
];
