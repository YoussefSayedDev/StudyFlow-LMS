"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Id, KnabanColumn, Task } from "@/types";
import { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  column: KnabanColumn;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
  tasks: Task[];
}

export default function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: isEditing,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="h-[500px] w-[300px] opacity-55"
      />
    );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="flex h-[500px] w-[300px] flex-col justify-between"
    >
      <CardHeader
        {...attributes}
        {...listeners}
        className="text-sencondary-foreground m-2 h-16 rounded-lg bg-secondary px-3 py-3"
      >
        <CardTitle className="flex items-center justify-between gap-2">
          <div onDoubleClick={() => setIsEditing(true)} className="">
            {isEditing ? (
              <Input
                type="text"
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setIsEditing(false);
                }}
              />
            ) : (
              <div>{column.title}</div>
            )}
          </div>
          <div
            className="cursor-pointer rounded-md border p-2 transition-colors duration-300 hover:border-red-700 hover:text-red-700"
            onClick={() => deleteColumn(column.id)}
          >
            <Trash className="size-5" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </CardContent>
      <CardFooter>
        <Button onClick={() => createTask(column.id)} className="w-full">
          Add Task
        </Button>
      </CardFooter>
    </Card>
  );
}
