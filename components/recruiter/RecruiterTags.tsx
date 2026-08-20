"use client";

interface Props {
    tags?: string[];
}

export default function RecruiterTags({
    tags = [],
}: Props) {

    if (tags.length === 0) {

        return null;

    }

    return (

        <div className="flex justify-center flex-wrap gap-2 mt-4 space-y-1.5">

            {tags.map(tag => (

                <span
                    key={tag}
                    className="
                    bg-gray-100
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    "
                >
                    {tag}
                </span>

            ))}

        </div>

    );

}