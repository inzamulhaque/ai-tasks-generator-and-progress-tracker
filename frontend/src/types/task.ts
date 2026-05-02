export type TTask = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TDailyTask = {
  _id: string;
  goalID: string;
  day: number;
  motivation: string;
  tasks: TTask[];
};
