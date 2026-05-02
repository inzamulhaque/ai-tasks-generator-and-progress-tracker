import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import Header from "./Header";
import { TDailyTask, TTask } from "../../types/task";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { getToken } from "../../utils/tokenStore";

const DailyTask = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preProgress = searchParams.get("progress");
  const [dailyTask, setDailyTask] = useState<TDailyTask | null>(null);

  useEffect(() => {
    if (Number(preProgress) === 0) {
      (async function () {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/goal/start/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: getToken("accessToken") as string,
            },
          },
        );

        const data = await res.json();

        console.log(data);
        setDailyTask(data?.data);
      })();
    }

    if (Number(preProgress) !== 0) {
      (async function () {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/goal/get-next-day-tasks/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: getToken("accessToken") as string,
            },
          },
        );

        const data = await res.json();

        console.log(data);
        setDailyTask(data?.data);
      })();
    }
  }, [id, preProgress]);

  if (!dailyTask) {
    return "Loading...";
  }

  const handleNextDay = () => {
    const nextProgress = progress + 1;

    navigate(`/dashboard/task/${id}?progress=${nextProgress}`);
  };

  const completedTasks = dailyTask.tasks.filter(
    (task: TTask) => task.isCompleted,
  ).length;

  const progress = (completedTasks / dailyTask.tasks.length) * 100;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <Badge className="mb-3 rounded-full px-4 py-1">
                    Day {dailyTask.day}
                  </Badge>

                  <h1 className="text-3xl font-bold">Daily Learning Tasks</h1>

                  <p className="mt-2 text-muted-foreground">
                    {dailyTask.motivation}
                  </p>
                </div>

                <div className="min-w-[220px]">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {completedTasks}/{dailyTask.tasks.length}
                    </span>
                  </div>

                  <Progress value={progress} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {dailyTask.tasks.map((task: TTask, index: number) => (
              <Card
                key={task._id}
                className="rounded-2xl border transition-all hover:shadow-md"
              >
                <CardContent className="p-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Task {index + 1}</Badge>

                      {task.isCompleted && (
                        <Badge className="bg-green-600">Completed</Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold">{task.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </div>

                  <Button
                    className="rounded-xl gap-2 cursor-pointer"
                    variant={task.isCompleted ? "secondary" : "default"}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {task.isCompleted ? "Completed" : "Complete Task"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" className="rounded-xl gap-2">
              <ChevronLeft className="h-4 w-4" />
              Previous Day
            </Button>

            <Button className="rounded-xl gap-2" onClick={handleNextDay}>
              Next Day
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-2xl border bg-primary/5 p-5 flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="h-5 w-5 text-primary" />
            {dailyTask?.motivation}
          </div>
        </div>
      </main>
    </>
  );
};

export default DailyTask;
