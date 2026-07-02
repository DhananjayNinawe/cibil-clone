interface ScoreGaugeProps {
  score: number;
  min?: number;
  max?: number;
  size?: number;
}

export default function ScoreGauge({ score, min = 300, max = 900, size = 180 }: ScoreGaugeProps) {
  const fraction = Math.min(1, Math.max(0, (score - min) / (max - min)));
  const angle = -90 + fraction * 180;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size / 2 }}>
      <div
        className="absolute top-0 left-0 rounded-full bg-[conic-gradient(from_180deg,_#ef4444_0deg_60deg,_#f5c518_60deg_120deg,_#22c55e_120deg_180deg,_transparent_180deg_360deg)]"
        style={{ width: size, height: size }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{ width: size * 0.68, height: size * 0.68, top: size * 0.16, left: size * 0.16 }}
      />
      <div
        className="absolute bg-gray-700 rounded-full origin-bottom"
        style={{
          width: 3,
          height: size * 0.38,
          left: size / 2 - 1.5,
          bottom: 0,
          transform: `rotate(${angle}deg)`,
        }}
      />
      <div
        className="absolute rounded-full bg-gray-700"
        style={{ width: 10, height: 10, left: size / 2 - 5, bottom: -5 }}
      />
      <span className="absolute text-[10px] text-gray-400" style={{ left: 2, bottom: -18 }}>
        {min}
      </span>
      <span className="absolute text-[10px] text-gray-400" style={{ right: 2, bottom: -18 }}>
        {max}
      </span>
    </div>
  );
}
