import { Target, Clock, Trophy, Clock3 } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/tokenStore";
import { useNavigate } from "react-router";
import type { TGoal } from "../../types/goal.ts";
import Header from "./Header";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [goals, setGoals] = useState<TGoal[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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

  const activeGoals = goals?.filter((g) => g.status === "active").length;
  const completedGoals = goals?.filter((g) => g.status === "close").length;
  const totalHours = goals?.reduce(
    (acc, goal) => acc + goal.duration * goal.timePerDay,
    0,
  );

  return (
    <main className="min-h-screen bg-muted/30">
      <Header />

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

        <Card className="rounded-3xl border bg-primary text-primary-foreground shadow-lg">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Ready to Start a New Learning Journey?
              </h2>

              <p className="mt-2 text-sm text-primary-foreground/80">
                Create a new AI-powered learning goal and get a personalized
                roadmap instantly.
              </p>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="rounded-xl gap-2 cursor-pointer"
              onClick={() => navigate("/dashboard/create-goal")}
            >
              + Create New Goal
            </Button>
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

                  <Button
                    className="w-full rounded-xl cursor-pointer"
                    onClick={() => navigate(`/dashboard/goal/${goal?._id}`)}
                  >
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
