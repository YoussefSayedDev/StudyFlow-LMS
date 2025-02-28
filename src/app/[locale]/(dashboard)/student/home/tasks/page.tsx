import { Button } from "@/components/ui/button";
import { Ellipsis, EllipsisVertical } from "lucide-react";

export default function StudentTasksPage() {
  return (
    <main>
      <div className="container mx-auto p-2 pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <TaskCard title="To Do" color="bg-red-500" />
          <TaskCard title="In Progress" color="bg-blue-500" />
          <TaskCard title="Need Review" color="bg-yellow-500" />
          <TaskCard title="Done" color="bg-green-500" />
        </div>
      </div>
    </main>
  );
}

function TaskCard({ title, color }: { title: string; color?: string }) {
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`size-2 rounded-full ${color}`} />
          <h2>{title}</h2>
        </div>
        <EllipsisVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <Button className="w-full">Add New Task</Button>
      <div className="flex flex-col gap-2 overflow-hidden rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="rounded-lg bg-red-300 px-1 py-2 text-xs">
            Design
          </span>
          <EllipsisVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="py-4">
          <h3 className="text-lg font-medium">Design a new website</h3>
          <p className="text-sm text-muted-foreground">
            This task requires a lot of design work and will take a while to
            complete.
          </p>
        </div>
      </div>
    </div>
  );
}
