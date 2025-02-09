"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ListTodo, Plus } from "lucide-react";
import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete Math homework", completed: false },
    { id: 2, text: "Read History chapter", completed: true },
    { id: 3, text: "Prepare for Physics quiz", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">To-Do List</CardTitle>
        <ListTodo className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <Input
            type="text"
            placeholder="Add new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow"
          />
          <Button size="sm" onClick={addTodo}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-grow text-sm ${todo.completed ? "text-muted-foreground line-through" : ""}`}
              >
                {todo.text}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
