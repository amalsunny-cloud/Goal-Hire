"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  applicationId: string;
  initialNotes: string;
}

export default function ApplicationNotes({
  applicationId,
  initialNotes,
}: Props) {

  const [notes, setNotes] =
    useState(initialNotes);

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const saveNotes =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            `/api/applications/${applicationId}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                notes,
              }),
            }
          );

        if (!response.ok) {
          throw new Error();
        }

        toast.success(
          "Notes saved"
        );

        setEditing(false);

      } catch (error) {

        toast.error(
          "Failed to save notes"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <div
      className="
        border
        rounded-lg
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Notes
      </h2>

      {editing ? (
        <>
          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
            rows={6}
            className="
              border
              w-full
              p-2
              rounded
            "
          />

          <div
            className="
              mt-3
              flex
              gap-2
            "
          >

            <button
              onClick={saveNotes}
              disabled={loading}
              className="
                bg-black
                text-white
                px-4
                py-2
                rounded
              "
            >
              Save
            </button>

            <button
              onClick={() =>
                setEditing(false)
              }
              className="
                border
                px-4
                py-2
                rounded
              "
            >
              Cancel
            </button>

          </div>
        </>
      ) : (
        <>
          <p
            className="
              whitespace-pre-wrap
              mb-4
            "
          >
            {notes ||
              "No notes added."}
          </p>

          <button
            onClick={() =>
              setEditing(true)
            }
            className="
              border
              px-4
              py-2
              rounded
            "
          >
            Edit Notes
          </button>
        </>
      )}
    </div>
  );
}