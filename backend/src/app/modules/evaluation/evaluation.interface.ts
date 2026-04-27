import type { Types } from "mongoose";

export type TEvaluation = {
  goalID: Types.ObjectId;
  analysis: string;
  encouragement: string;
  nextAction: string;
  tip: string;
};
