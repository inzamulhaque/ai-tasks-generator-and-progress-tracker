import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Monitor,
  Target,
  Clock,
  Trophy,
  LogOut,
  UserCircle2,
  Clock3,
} from "lucide-react";

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
import { useEffect, useState } from "react";
import { getToken, removeToken } from "../../utils/tokenStore";
import { useNavigate } from "react-router";

type Goal = {
  _id: string;
  userID: string;
  name: string;
  description: string;
  duration: number;
  timePerDay: number;
  finalGoal: string;
  status: "active" | "inactive" | "close";
  progress: number;
};

type Profile = {
  _id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
};

const DashboardPage = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [goals, setGoals] = useState<Goal[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const profileRes = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/auth/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken("accessToken") as string,
          },
        },
      );

      const profileData = await profileRes.json();

      setProfile(profileData?.data);

      const goalsRes = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/goal/my-all-goals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken("accessToken") as string,
          },
        },
      );

      const goalsData = await goalsRes.json();

      setGoals(goalsData?.data);
    };

    fetchData();
  }, []);

  const signOut = () => {
    removeToken("accessToken");
    navigate("/signin");
  };

  const activeGoals = goals?.filter((g) => g.status === "active").length;
  const completedGoals = goals?.filter((g) => g.status === "close").length;
  const totalHours = goals?.reduce(
    (acc, goal) => acc + goal.duration * goal.timePerDay,
    0,
  );

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserCircle2 className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                Welcome back, {profile?.name} 👋
              </h1>

              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer rounded-xl"
                >
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
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="destructive"
              className="rounded-xl cursor-pointer gap-2"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl">
            <CardContent className="flex items-center gap-4 p-6">
              <Target className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Goals</p>
                <h3 className="text-2xl font-bold">{goals?.length}</h3>
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

        <Card className="rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Planned Learning Hours
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                {totalHours}
                <span className="ml-2 text-lg font-medium text-muted-foreground">
                  hrs
                </span>
              </h2>

              <p className="mt-2 text-xs text-muted-foreground">
                Across all your active and upcoming goals
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Clock3 className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Your Goals</h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {goals?.map((goal) => (
              <Card
                key={goal._id}
                className="rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug">
                      {goal.name}
                    </h3>

                    <Badge
                      variant={
                        goal.status === "active"
                          ? "secondary"
                          : goal.status === "close"
                            ? "default"
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
                      <span>
                        {goal.progress} / {goal.duration} Days
                      </span>
                    </div>

                    <Progress
                      value={Math.min(
                        (goal.progress / goal.duration) * 100,
                        100,
                      )}
                    />
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
                    <p className="mb-1 text-sm text-muted-foreground">
                      Final Goal
                    </p>
                    <p className="text-sm font-medium line-clamp-2">
                      {goal.finalGoal}
                    </p>
                  </div>

                  <Button className="w-full rounded-xl cursor-pointer">
                    View Details
                  </Button>
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
