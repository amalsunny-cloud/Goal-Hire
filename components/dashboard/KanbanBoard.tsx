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
      <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm sm:p-5">
        {/* Board Header */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Application Pipeline
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Drag applications between stages to update their status
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />

            <span className="text-xs font-semibold text-slate-600">
              {applications.length} Applications
            </span>
          </div>
        </div>

        {/* Kanban Columns */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          <div className="min-w-0">
            <KanbanColumn
              title="Applied"
              applications={applied}
            />
          </div>

          <div className="min-w-0">
            <KanbanColumn
              title="Interview"
              applications={interview}
            />
          </div>

          <div className="min-w-0">
            <KanbanColumn
              title="Offer"
              applications={offer}
            />
          </div>

          <div className="min-w-0">
            <KanbanColumn
              title="Rejected"
              applications={rejected}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}