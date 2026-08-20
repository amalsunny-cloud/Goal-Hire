"use client";

interface Props {
  selected: string[];
  onChange: (tags: string[]) => void;
}

const availableTags = [
  "HR",
  "Technical",
  "Startup",
  "MNC",
  "Agency",
  "Remote",
  "Priority",
  "Interview",
  "Offer",
  "Rejected",
];

export default function RecruiterTagSelector({
  selected = [],
  onChange,
}: Props) {
  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
      return;
    }

    onChange([...selected, tag]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableTags.map((tag) => {
        const isSelected = selected.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-150 border cursor-pointer select-none ${
              isSelected
                ? "bg-slate-800 text-white border-slate-800 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            {isSelected ? `✓ ${tag}` : `+ ${tag}`}
          </button>
        );
      })}
    </div>
  );
}
