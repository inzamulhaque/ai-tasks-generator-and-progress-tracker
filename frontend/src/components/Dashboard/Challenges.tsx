import { getToken } from "../../utils/tokenStore";
import { TChallenge } from "../../types/challenge";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import Header from "./Header";
import { Badge, CheckCircle2, Sparkles, Trophy } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
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

const Challenges = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<TChallenge[]>([]);
  const [evalGenerating, setEvalGenerating] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/goal/final-challenges/${id}`,
        {
          headers: {
            Authorization: getToken("accessToken") as string,
          },
        },
      );

      const data = await res.json();
      if (data.success) {
        setChallenges(data?.data);

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
    })();
  }, [id]);

  const completedCount = challenges.filter((c) => c.isCompleted).length;

  const handleComplete = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/goal/complete-challenge/${id}`,
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
      setChallenges((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isCompleted: true } : c)),
      );

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

  const evaluate = async () => {
    setEvalGenerating(true);
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/evaluation/evaluate-goal/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken("accessToken") as string,
        },
      },
    );

    const data = await res.json();

    if (data.success) {
      navigate(`/dashboard/goal/${id}`);
      setEvalGenerating(false);

      toast.success(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      setEvalGenerating(false);
      toast.error(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 px-4 py-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-purple-500/10">
              <Trophy className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">Final Challenges</h1>

          <p className="text-muted-foreground mt-2">
            Complete these final tasks to finish your goal journey
          </p>

          <Badge className="mt-4 px-3 py-1">
            {completedCount} / {challenges.length} Completed
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto grid gap-5">
          {challenges.map((challenge) => (
            <Card
              key={challenge._id}
              className={`rounded-2xl transition-all duration-300 ${
                challenge.isCompleted
                  ? "border-green-500/40 bg-green-500/5"
                  : "hover:shadow-lg"
              }`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    {challenge.isCompleted && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {challenge.title}
                  </h2>

                  {challenge.isCompleted && (
                    <Badge className="bg-green-500/10 text-green-500">
                      Done
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {challenge.description}
                </p>

                <div className="flex justify-end">
                  {!challenge.isCompleted ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="rounded-xl gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-all cursor-pointer"
                          disabled={challenge.isCompleted}
                          variant={
                            challenge.isCompleted ? "secondary" : "default"
                          }
                        >
                          <Sparkles className="h-4 w-4" />
                          {challenge.isCompleted
                            ? "Completed"
                            : "Complete Challenge"}
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Complete this final challenge?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This is a final step of your goal journey. Once
                            marked as completed, you won’t be able to undo it.
                            Make sure you have finished properly.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => handleComplete(challenge._id)}
                            className="bg-gradient-to-r from-purple-600 to-pink-500 cursor-pointer"
                          >
                            Yes, Complete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button disabled variant="secondary" className="rounded-xl">
                      Completed
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {completedCount === challenges.length && (
          <div className="text-center mt-10">
            <div
              className="inline-block px-6 py-5 rounded-2xl 
                        bg-green-500/10 border border-green-500/30 space-y-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-green-500">
                  🎉 Congratulations!
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  You completed all challenges
                </p>
              </div>

              <Button
                className="rounded-xl gap-2 cursor-pointer bg-gradient-to-r 
                from-green-500 to-emerald-500 hover:scale-105 
                transition-all shadow-lg"
                onClick={evaluate}
              >
                {evalGenerating
                  ? "Generating evaluation..."
                  : "🧠 Start Evaluation"}
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Challenges;
