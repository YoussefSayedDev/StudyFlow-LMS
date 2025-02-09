import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentMyTeachersPage() {
  return (
    <main>
      <div className="container mx-auto space-y-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">My Teachers</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((teacher) => (
            <Card key={teacher}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=T${teacher}`}
                      alt={`Teacher ${teacher}`}
                    />
                    <AvatarFallback>T{teacher}</AvatarFallback>
                  </Avatar>
                  <span>Teacher {teacher}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Subject: Mathematics
                </p>
                <p className="text-sm text-muted-foreground">Classes: 3</p>
                <p className="text-sm text-muted-foreground">Students: 75</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // Mock data for current teachers
// const currentTeachers = [
//   {
//     id: 1,
//     name: "Dr. Jane Smith",
//     subject: "Mathematics",
//     email: "jane.smith@school.edu",
//     imageUrl: "/placeholder.svg?height=100&width=100",
//   },
//   {
//     id: 2,
//     name: "Prof. John Doe",
//     subject: "Physics",
//     email: "john.doe@school.edu",
//     imageUrl: "/placeholder.svg?height=100&width=100",
//   },
// ];

// export default function TeachersPage() {
//   return (
//     <div className="container mx-auto space-y-4 p-2 pt-0">
//       {currentTeachers.map((teacher) => (
//         <Card key={teacher.id}>
//           <CardHeader className="flex flex-row items-center gap-4">
//             <Avatar className="h-12 w-12">
//               <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
//               <AvatarFallback>
//                 {teacher.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <CardTitle>{teacher.name}</CardTitle>
//               <Badge variant="secondary">{teacher.subject}</Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               Email: {teacher.email}
//             </p>
//             <Button variant="link" className="mt-2 p-0">
//               View Profile
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
