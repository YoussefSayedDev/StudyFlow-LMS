"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Id, Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DivideSquare, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

export default function TaskCard({
  task,
  deleteTask,
  updateTask,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: isEditing,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex min-h-[100px] w-full cursor-grab items-center justify-between rounded-md bg-destructive text-left text-destructive-foreground opacity-55 hover:ring-2 hover:ring-rose-300"
      />
    );

  if (isEditing) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex w-full items-center gap-2"
      >
        <Textarea
          className="w-full resize-none"
          onChange={(e) => updateTask(task.id, e.target.value)}
          autoFocus
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) setIsEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex min-h-[100px] w-full cursor-grab items-center justify-between rounded-md bg-destructive text-left text-destructive-foreground hover:ring-2 hover:ring-rose-300"
    >
      <div
        onDoubleClick={() => setIsEditing(true)}
        className="flex items-center gap-2"
      >
        <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.content}
        </p>
      </div>
      <Button onClick={() => deleteTask(task.id)} variant="outline">
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
