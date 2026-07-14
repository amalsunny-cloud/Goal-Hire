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
    selected,
    onChange,
}: Props) {

    const toggle = (tag: string) => {

        if (selected.includes(tag)) {

            onChange(
                selected.filter(
                    t => t !== tag
                )
            );

            return;
        }

        onChange([
            ...selected,
            tag,
        ]);
    };

    return (

        <div className="flex flex-wrap gap-2">

            {availableTags.map(tag => (

                <button
                    key={tag}
                    type="button"
                    onClick={() => toggle(tag)}
                    className={`px-3 py-1 rounded-full border
                    ${
                        selected.includes(tag)
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                    }`}
                >
                    {tag}
                </button>

            ))}

        </div>

    );
}