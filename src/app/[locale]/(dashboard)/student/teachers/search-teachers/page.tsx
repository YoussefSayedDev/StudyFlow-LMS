import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, SearchIcon } from "lucide-react";

export default function StudentSearchTeacherPage() {
  return (
    <main>
      <div className="container mx-auto space-y-6 px-4 pt-0">
        <h1 className="text-2xl font-bold">Search Teachers</h1>
        <Card>
          <CardHeader>
            <CardTitle>Search for New Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex space-x-2">
              <Input
                placeholder="Search by name, subject, or expertise"
                className="flex-1"
              />
              <Button>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Popular Teachers</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((teacher) => (
                    <Card key={`popular-${teacher}`}>
                      <CardContent className="flex items-center space-x-4 p-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&text=T${teacher}`}
                            alt={`Popular Teacher ${teacher}`}
                          />
                          <AvatarFallback>T{teacher}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">Dr. Smith {teacher}</h4>
                          <p className="text-sm text-muted-foreground">
                            Physics Expert
                          </p>
                          <p className="text-sm text-muted-foreground">
                            4.9 ⭐ (120 reviews)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  Teachers Related to Your Interests
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((teacher) => (
                    <Card key={`related-${teacher}`}>
                      <CardContent className="flex items-center space-x-4 p-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&text=R${teacher}`}
                            alt={`Related Teacher ${teacher}`}
                          />
                          <AvatarFallback>R{teacher}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">
                            Prof. Johnson {teacher}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Computer Science
                          </p>
                          <p className="text-sm text-muted-foreground">
                            4.7 ⭐ (95 reviews)
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
