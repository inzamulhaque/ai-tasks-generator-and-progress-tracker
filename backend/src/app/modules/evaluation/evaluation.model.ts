import { model, Schema } from "mongoose";
import type { TEvaluation } from "./evaluation.interface";

const evaluationSchema = new Schema<TEvaluation>(
  {
    goalID: {
      type: Schema.Types.ObjectId,
      ref: "Goal",
      required: [true, "Goal ID is required"],
    },

    analysis: {
      type: String,
      required: [true, "Analysis is required"],
      trim: true,
    },

    encouragement: {
      type: String,
      required: [true, "Encouragement is required"],
      trim: true,
    },

    nextAction: {
      type: String,
      required: [true, "Next action is required"],
      trim: true,
    },

    tip: {
      type: String,
      required: [true, "Tip is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Evaluation = model<TEvaluation>("Evaluation", evaluationSchema);

export default Evaluation;
