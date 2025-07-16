import React from "react";
import { useTheme } from "../contexts/ThemeContext";

interface DonutCircleProps {
  grade: string;
}

const gradeToIndex: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
};

const lightColors = [
  "#10B981",
  "#84cc16",
  "#facc15",
  "#f87171",
  "#ef4444",
  "#b91c1c",
];

const darkColors = [
  "#22c55e",
  "#a3e635",
  "#fde047",
  "#fb7185",
  "#f87171",
  "#dc2626",
];

function getColorForGrade(grade: string, isDark: boolean): string {
  const index = gradeToIndex[grade.toUpperCase()] ?? 5; // default to F
  const colors = isDark ? darkColors : lightColors;
  return colors[index] || colors[5];
}

const DonutCircle: React.FC<DonutCircleProps> = ({ grade }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const strokeColor = getColorForGrade(grade, isDark);
  const textColor = isDark ? "#F3F4F6" : "#111827";

  return (
    <svg width="64" height="64" viewBox="0 0 36 36" className="block mx-auto">
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke={isDark ? "#374151" : "#e5e7eb"}
        strokeWidth="3"
      />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill={textColor}
        style={{ userSelect: "none" }}
      >
        {grade.toUpperCase()}
      </text>
    </svg>
  );
};

export default DonutCircle;
