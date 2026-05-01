import React, { useState } from "react";
import Header from "./Header";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import LoadingPage from "./LoadingPage";
import { getToken } from "../../utils/tokenStore";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const CreateGoal = () => {
  const [goalDuration, setGoalDuration] = useState<number>(3);
  const [timePerDay, setTimePerDay] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCreareGoal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/goal/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken("accessToken") as string,
        },

        body: JSON.stringify({
          ...Object.fromEntries(formData.entries()),
          goalDuration,
          timePerDay,
        }),
      },
    );

    const data = await res.json();

    if (!data?.success) {
      setLoading(false);
      toast.error(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      setLoading(false);
      toast.success(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });

      navigate("/dashboard");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-muted/30 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Card className="rounded-3xl shadow-sm border">
            <CardContent className="p-8 md:p-10">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  Create New Goal
                </h1>

                <p className="mt-2 text-muted-foreground">
                  Define your learning goal and let AI generate your
                  personalized roadmap.
                </p>
              </div>

              <form className="space-y-8" onSubmit={handleCreareGoal}>
                <div className="space-y-2">
                  <Label>Goal Name</Label>
                  <Input
                    placeholder="e.g. Learn Python"
                    className="h-12 rounded-xl"
                    name="goalName"
                    min={3}
                    max={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Goal Description</Label>
                  <Textarea
                    placeholder="Describe what you want to achieve..."
                    className="min-h-[140px] rounded-xl resize-none"
                    name="goalDescription"
                    minLength={10}
                    maxLength={500}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Goal Duration</Label>

                  <div className="flex flex-wrap gap-3">
                    {[3, 5, 7].map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={goalDuration === day ? "default" : "outline"}
                        className="rounded-xl"
                        onClick={() => setGoalDuration(day)}
                      >
                        {day} Days
                      </Button>
                    ))}
                  </div>

                  <Input
                    type="number"
                    min={1}
                    value={goalDuration}
                    onChange={(e) => setGoalDuration(Number(e.target.value))}
                    className="h-12 rounded-xl"
                    placeholder="Custom Duration"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Time Per Day</Label>

                  <div className="flex flex-wrap gap-3">
                    {[1, 3, 5, 7].map((hour) => (
                      <Button
                        key={hour}
                        type="button"
                        variant={timePerDay === hour ? "default" : "outline"}
                        className="rounded-xl"
                        onClick={() => setTimePerDay(hour)}
                      >
                        {hour} Hr
                      </Button>
                    ))}
                  </div>

                  <Input
                    type="number"
                    min={1}
                    value={timePerDay}
                    onChange={(e) => setTimePerDay(Number(e.target.value))}
                    className="h-12 rounded-xl"
                    placeholder="Custom Hours"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>

                  <Select defaultValue="english" name="language">
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="bangla">Bangla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl text-base font-semibold h-13 cursor-pointer"
                >
                  Generate AI Learning Plan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default CreateGoal;
