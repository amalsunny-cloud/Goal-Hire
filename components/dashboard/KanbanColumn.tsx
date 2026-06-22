import { Application } from "@/types/application";
import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

interface Props {
  title: string;
  applications: Application[];
}

export default function KanbanColumn({
  title,
  applications,
}: Props) {
  return (
    <div
      className="
        bg-gray-100
        rounded-lg
        p-4
        min-h-[300px]
      "
    >
      <h2
        className="
          font-bold
          text-lg
          mb-4
        "
      >
        {title}
      </h2>

      <Droppable droppableId={title}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {applications.map(
              (app, index) => (
                <Draggable
                  key={app._id}
                  draggableId={app._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={
                        provided.innerRef
                      }
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="
                        bg-white
                        p-3
                        rounded-lg
                        shadow
                      "
                    >
                      <h3 className="font-semibold">
                        {app.company}
                      </h3>

                      <p>{app.role}</p>
                    </div>
                  )}
                </Draggable>
              )
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}