interface AnalyticsCardProps {
  title: string;
  value: string | number;
}

export default function AnalyticsCard({ title, value }: AnalyticsCardProps) {
  return (
    <div
      className="
        border
        rounded-lg
        p-6
        bg-white
      "
    >
      <p
        className="
          text-gray-500
          mb-2
        "
      >
        {title}
      </p>

      <h2
        className="
          text-3xl
          font-bold
        "
      >
        {value}
      </h2>
    </div>
  );
}
