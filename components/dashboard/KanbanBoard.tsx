"use client";

import { Application, ApplicationStatus } from "@/types/application";
import KanbanColumn from "./KanbanColumn";
import {
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";
import toast from "react-hot-toast";

interface KanbanBoardProps {
  applications: Application[];
  onStatusChange: (
    id: string,
    status: ApplicationStatus,
  ) => Promise<boolean>;
}

const statuses: ApplicationStatus[] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export default function KanbanBoard({
  applications,
  onStatusChange,
}: KanbanBoardProps) {
  const applied = applications.filter(
    (app) => app.status === "Applied",
  );

  const interview = applications.filter(
    (app) => app.status === "Interview",
  );

  const offer = applications.filter(
    (app) => app.status === "Offer",
  );

  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  );

  const onDragEnd = async (result: DropResult) => {
    const {
      destination,
      source,
      draggableId,
    } = result;

    // User dropped outside a column
    if (!destination) {
      return;
    }

    // Nothing changed
    if (
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const newStatus =
      destination.droppableId as ApplicationStatus;

    // Make sure the destination is valid
    if (!statuses.includes(newStatus)) {
      console.error(
        "Invalid Kanban destination:",
        destination.droppableId,
      );

      toast.error("Invalid application status");

      return;
    }

    try {
      const success = await onStatusChange(
        draggableId,
        newStatus,
      );

      if (!success) {
        toast.error(
          "Failed to update application status",
        );
      }
    } catch (error) {
      console.error(
        "Kanban status update failed:",
        error,
      );

      toast.error(
        "Failed to update application status",
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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