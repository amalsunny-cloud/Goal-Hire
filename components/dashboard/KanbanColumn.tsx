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

export default function KanbanColumn({
  title,
  applications,
}: Props) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 min-h-75">
      <h2 className="font-bold text-lg mb-4">
        {title}
      </h2>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-50"
          >
            {applications.map(
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
                            ? "shadow-xl"
                            : ""
                        }
                      `}
                    >
                      <h3 className="font-semibold">
                        {application.company}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {application.role}
                      </p>
                    </div>
                  )}
                </Draggable>
              ),
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}