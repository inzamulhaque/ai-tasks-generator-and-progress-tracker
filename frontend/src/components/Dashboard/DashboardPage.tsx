import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Target, Clock, Trophy } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

type Goal = {
  _id: string;
  name: string;
  description: string;
  duration: number;
  timePerDay: number;
  finalGoal: string;
  status: "active" | "inactive" | "completed";
  progress: number;
};

type DashboardProps = {
  name: string;
  email: string;
  goals: Goal[];
};

const DashboardPage = ({ name, email, goals }: DashboardProps) => {
  const { theme, setTheme } = useTheme();

  const activeGoals = goals.filter((g) => g.status === "active").length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const totalHours = goals.reduce(
    (acc, goal) => acc + goal.duration * goal.timePerDay,
    0,
  );

  return (
    <main className="min-h-screen bg-muted/30">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {name} 👋</h1>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Monitor className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" /> Light
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" /> Dark
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" /> System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Target className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <h3 className="text-2xl font-bold">{goals.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Clock className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Goals</p>
                <h3 className="text-2xl font-bold">{activeGoals}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Trophy className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{completedGoals}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TOTAL STUDY HOURS */}
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Planned Learning Hours
            </p>
            <h2 className="mt-2 text-3xl font-bold">{totalHours} Hours</h2>
          </CardContent>
        </Card>

        {/* GOALS LIST */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Your Goals</h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {goals.map((goal) => (
              <Card
                key={goal._id}
                className="rounded-2xl border transition-all hover:shadow-lg"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-lg">{goal.name}</h3>

                    <Badge
                      variant={
                        goal.status === "completed"
                          ? "default"
                          : goal.status === "active"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {goal.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {goal.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>

                    <Progress value={goal.progress} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{goal.duration} Days</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Daily Time</p>
                      <p className="font-medium">{goal.timePerDay} Hr/Day</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Final Goal
                    </p>
                    <p className="text-sm font-medium">{goal.finalGoal}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
