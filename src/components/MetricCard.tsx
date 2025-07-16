import React, { type ReactNode } from "react";
import Tilt from "react-parallax-tilt";

interface MetricCardProps {
  icon: ReactNode;
  value: ReactNode;
  title: string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  title,
  description,
}) => {
  return (
    <Tilt
      tiltMaxAngleX={20}
      tiltMaxAngleY={20}
      glareEnable={true}
      glareMaxOpacity={0.1}
      scale={1.05}
      transitionSpeed={300}
      className="w-full"
    >
      <div className="card w-full bg-base-100 shadow-xl !p-4 flex flex-col gap-2 rounded-lg border border-base-300 h-full">
        <div className="flex justify-between items-center gap-4">
          <div>{icon}</div>
          <div className="text-2xl font-bold text-base-content">{value}</div>
        </div>
        <div>
          <p className="font-semibold text-base-content">{title}</p>
          <p className="text-base-content opacity-70">{description}</p>
        </div>
      </div>
    </Tilt>
  );
};

export default MetricCard;
