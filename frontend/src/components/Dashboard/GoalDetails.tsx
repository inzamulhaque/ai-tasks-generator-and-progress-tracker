import { TGoal } from "@/types/goal";
import { getToken } from "../../utils/tokenStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CalendarDays, Clock, PlayCircle, Target } from "lucide-react";
import { Progress } from "../ui/progress";
import Header from "./Header";

type TTask = {
  title: string;
};

type TDailyTaskOverview = {
  _id: string;
  day: number;
  tasks: TTask[];
};

type TFinalChallenge = {
  title: string;
};

type TGoalDetails = TGoal & {
  dailyTaskOverView: TDailyTaskOverview[];
  finalChallenges: TFinalChallenge[];
};

const GoalDetails = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState<TGoalDetails | null>(null);

  useEffect(() => {
    (async function () {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/goal/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken("accessToken") as string,
          },
        },
      );

      const data = await res.json();

      setGoal(data?.data);
    })();
  }, [id]);

  if (!goal) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const progressPercent = Math.min(
    (goal?.progress / goal?.duration) * 100,
    100,
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="space-y-3">
                <Badge variant="outline">{goal?.status}</Badge>

                <h1 className="text-3xl md:text-4xl font-bold">{goal?.name}</h1>

                <p className="text-muted-foreground max-w-3xl">
                  {goal?.description}
                </p>
              </div>

              <Button className="rounded-xl gap-2 text-base px-6 py-6 cursor-pointer">
                <PlayCircle className="h-5 w-5" />
                Start Work
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {goal?.progress} / {goal?.duration} Days
                </span>
              </div>

              <Progress value={progressPercent} />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-3">
              <CalendarDays className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-bold">{goal?.duration} Days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-3">
              <Clock className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Daily Time</p>
                <p className="font-bold">{goal?.timePerDay} Hr/Day</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-3">
              <Target className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Final Goal</p>
                <p className="font-bold">{goal?.finalGoal}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Daily Roadmap</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goal?.dailyTaskOverView?.map((day) => (
              <Card key={day._id} className="rounded-2xl">
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-semibold">Day {day.day}</h3>

                  {day.tasks?.map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {task.title}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Final Challenges</h2>

          <Card>
            <CardContent className="p-6 space-y-3">
              {goal?.finalChallenges?.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  {c.title}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default GoalDetails;
