interface Props {
  responded: boolean;
  responseType?: string;
}
export default function ResponseBadge({ responded, responseType }: Props) {
  if (!responded) {
    return (
      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
        Waiting
      </span>
    );
  }

  const colors = {
    Positive:"bg-green-100 text-green-700",
    Neutral:"bg-yellow-100 text-yellow-700",
    Rejected:"bg-red-100 text-red-700",
    "No Response":"bg-gray-100 text-gray-700"
  };

  return <span className={`px-3 py-1 rounded-full text-sm ${colors[responseType as keyof typeof colors]}`}>{responseType}</span>
  return <div></div>;
}
