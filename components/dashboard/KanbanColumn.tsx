"use client";

import { useState } from "react";
import {
  Application,
  ApplicationStatus,
} from "@/types/application";
import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

interface Props {
  title: ApplicationStatus;
  applications: Application[];
}

const VISIBLE_LIMIT = 4;

export default function KanbanColumn({
  title,
  applications,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMore = applications.length > VISIBLE_LIMIT;
  const displayedApplications = isExpanded
    ? applications
    : applications.slice(0, VISIBLE_LIMIT);

  return (
    <div className="bg-gray-100 rounded-lg p-4 min-h-75 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-md bg-slate-200 rounded-2xl px-3 py-1 text-center text-gray-700">
            {title}
          </h2>
          <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
            {applications.length}
          </span>
        </div>

        <Droppable droppableId={title}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3 flex flex-col justify-center min-h-25"
            >
              {applications.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-6">
                  No applications
                </div>
              ) : (
                displayedApplications.map(
                  (application, index) => (
                    <Draggable
                      key={application._id}
                      draggableId={application._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            bg-white
                            p-3
                            rounded-lg
                            shadow
                            transition-shadow
                            ${
                              snapshot.isDragging
                                ? "shadow-xl ring-2 ring-indigo-500"
                                : ""
                            }
                          `}
                        >
                          <h3 className="font-semibold text-slate-800 truncate">
                            {application.company}
                          </h3>

                          <p className="text-sm text-gray-600 truncate">
                            {application.role}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  )
                )
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      {/* Show More / Show Less Toggle Button */}
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full py-2 text-xs font-medium text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg border border-indigo-100 transition-colors shadow-sm"
        >
          {isExpanded
            ? "Show Less"
            : `Show More (${applications.length - VISIBLE_LIMIT} more)`}
        </button>
      )}
    </div>
  );
}