export type TGoal = {
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
