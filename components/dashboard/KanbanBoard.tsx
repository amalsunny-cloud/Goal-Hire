"use client";

import { Application } from "@/types/application";
import KanbanColumn from "./KanbanColumn";
import {
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";

interface Props {
    applications: Application[];
    onRefresh: ()=> Promise<void>;
}

export default function KanbanBoard({
  applications,
  onRefresh,
}: Props) {

  const applied =
    applications.filter(
      (app) =>
        app.status === "Applied"
    );

  const interview =
    applications.filter(
      (app) =>
        app.status === "Interview"
    );

  const offer =
    applications.filter(
      (app) =>
        app.status === "Offer"
    );

  const rejected =
    applications.filter(
      (app) =>
        app.status === "Rejected"
    );

  const onDragEnd =
    async (
      result: DropResult
    ) => {

      const {
        destination,
        source,
        draggableId,
      } = result;

      if (!destination) {
        return;
      }

      if (
        source.droppableId ===
        destination.droppableId
      ) {
        return;
      }

      const newStatus =
        destination.droppableId;

      try {

        const response =
          await fetch(
            `/api/applications/${draggableId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                status:
                  newStatus,
              }),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to update status"
          );
        }

        console.log(
          "Status updated:",
          newStatus
        );

        // window.location.reload();
        await onRefresh();

      } catch (error) {

        console.error(
          "Drag update failed:",
          error
        );

      }
    };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-4
        "
      >

        <KanbanColumn
          title="Applied"
          applications={applied}
        />

        <KanbanColumn
          title="Interview"
          applications={interview}
        />

        <KanbanColumn
          title="Offer"
          applications={offer}
        />

        <KanbanColumn
          title="Rejected"
          applications={rejected}
        />

      </div>
    </DragDropContext>
  );
}