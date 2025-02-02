"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import { useState } from "react";

// Mock data for popular teachers
const popularTeachers = [
  {
    id: 3,
    name: "Ms. Emily Brown",
    subject: "Literature",
    rating: 4.8,
    students: 120,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Mr. David Wilson",
    subject: "Chemistry",
    rating: 4.7,
    students: 95,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
];

export default function NewTeacherSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch}>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for new teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
      </form>

      <div>
        <h3 className="mb-3 text-xl font-semibold">Popular Teachers</h3>
        <div className="space-y-4">
          {popularTeachers.map((teacher) => (
            <Card key={teacher.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
                  <AvatarFallback>
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{teacher.name}</CardTitle>
                  <Badge variant="secondary">{teacher.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{teacher.rating}</span>
                  <span className="text-muted-foreground">
                    ({teacher.students} students)
                  </span>
                </div>
                <Button variant="link" className="mt-2 p-0">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
