"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateKanbanColumnId } from "@/lib/helpers/generateKanbanColumnId";
import { Id, KnabanColumn, Task } from "@/types";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";

const initialColumns: Task[] = [
  {
    id: "todo",
    columnId: "To Do",
    content: "Complete Math Homework",
  },
  {
    id: "in-progress",
    columnId: "In Progress",
    content: "Write Physics Lab Report",
    // tasks: [
    //   {
    //     id: "task-3",
    //     content: "Write Physics Lab Report",
    //     category: "PHYS102",
    //   },
    // ],
  },
  {
    id: "done",
    columnId: "Done",
    content: "Study for Chemistry Test",
  },
];

export default function KanbanBoard() {
  ////////////////////
  // States Variables
  ////////////////////
  const [columns, setColumns] = useState<KnabanColumn[]>([]);
  const [activeColumn, setActiveColumn] = useState<KnabanColumn | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[] | []>(initialColumns);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  ////////////////////
  // Variables
  //////////////////
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // Handler to create a new column
  const createNewColumn = () => {
    const columnToAdd: KnabanColumn = {
      id: generateKanbanColumnId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  // Handler to delete a column
  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  };

  // Handler to update a column
  const updateColumn = (id: Id, title: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === id ? { ...col, title } : col,
    );
    setColumns(updatedColumns);
  };

  // Handler to create a new task
  const createTask = (columnId: Id) => {
    const taskToAdd: Task = {
      id: generateKanbanColumnId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, taskToAdd]);
  };

  // Handler to delete a task
  const deleteTask = (id: Id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Handler to update a task
  const updateTask = (id: Id, content: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, content } : task,
    );
    setTasks(updatedTasks);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column")
      setActiveColumn(event.active.data.current.column);

    if (event.active.data.current?.type === "Task")
      setActiveTask(event.active.data.current.task);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId,
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId,
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // [1] Dropping a task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeColumnId,
        );
        const overTaskIndex = tasks.findIndex(
          (task) => task.id === overColumnId,
        );

        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // [2] Dropping a task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex(
          (task) => task.id === activeColumnId,
        );

        tasks[activeTaskIndex].columnId = overColumnId;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      });
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-lg font-medium">Tasks Board</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={createNewColumn}
                  variant="outline"
                  className="ml-auto flex size-8 items-center justify-center"
                >
                  <Plus className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add New Column</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="flex flex-wrap items-center gap-4 overflow-hidden">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <div key={col.id} className="flex items-center gap-4">
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id,
                  )}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
              {activeTask && (
                <TaskCard
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </CardContent>
    </Card>
  );
}
