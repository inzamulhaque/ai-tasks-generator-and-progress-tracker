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
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const DailyTask = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const preProgress = Number(searchParams.get("progress") || 0);
  const duration = Number(searchParams.get("duration") || 0);

  const [dailyTask, setDailyTask] = useState<TDailyTask | null>(null);

  useEffect(() => {
    if (preProgress === 0) {
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

        if (data?.success) {
          setDailyTask(data?.data);
        } else {
          toast.error(data.message, {
            position: "top-right",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }
      })();
    }

    if (preProgress !== 0) {
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

        if (data?.success) {
          setDailyTask(data?.data);
        } else {
          if (data.message === "Previous the task not completed!") {
            const preDay = preProgress - 1;

            navigate(
              `/dashboard/task/${id}?progress=${preDay}&duration=${duration}`,
            );
          }

          toast.error(data.message, {
            position: "top-right",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }
      })();
    }
  }, [id, preProgress]);

  if (!dailyTask) {
    return "Loading...";
  }

  const completedTasks = dailyTask.tasks.filter(
    (task: TTask) => task.isCompleted,
  ).length;

  const progress = (completedTasks / dailyTask.tasks.length) * 100;

  const handleCompleteTask = async (taskId: string) => {
    setDailyTask((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        tasks: prev.tasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: true } : task,
        ),
      };
    });

    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/goal/complete-task/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken("accessToken") as string,
        },
      },
    );

    const data = await res.json();

    if (data.success) {
      toast.success(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      toast.error(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  const handleNextDay = () => {
    const nextProgress = preProgress + 1;

    navigate(
      `/dashboard/task/${id}?progress=${nextProgress}&duration=${duration}`,
    );
  };

  const allCompleted = dailyTask?.tasks?.every(
    (task) => task.isCompleted === true,
  );

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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="rounded-xl gap-2 cursor-pointer"
                        variant={task.isCompleted ? "secondary" : "default"}
                        disabled={task.isCompleted}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {task.isCompleted ? "Completed" : "Complete Task"}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Mark this task as completed?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          Once you complete this task, you can’t undo it. Make
                          sure you have finished it properly.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                          onClick={() => handleCompleteTask(task._id)}
                        >
                          Yes, Complete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              className="rounded-xl gap-2 cursor-pointer"
              disabled={true}
            >
              <ChevronLeft className="h-4 w-4 cursor-pointer" />
              Previous Day
            </Button>

            {preProgress === duration ? (
              allCompleted && (
                <Button
                  className="rounded-xl gap-2 cursor-pointer 
                            bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
                            text-white font-semibold shadow-lg 
                            hover:scale-105 hover:shadow-2xl 
                            transition-all duration-300"
                >
                  🎯 Challenges Unlocked
                </Button>
              )
            ) : (
              <Button
                className="rounded-xl gap-2 cursor-pointer"
                onClick={handleNextDay}
              >
                Next Day
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
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
