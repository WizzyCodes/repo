// import { Document, model, Schema, Types } from "mongoose";

// interface iEvent {
//   userID: Types.ObjectId;
//   title: string;
//   description: string;
//   date: Date;
// }

// interface iEventData extends iEvent, Document {}

// const eventModel = new Schema(
//   {
//     userID: {
//       type: Types.ObjectId,
//       ref: "user",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default model<iEventData>("event", eventModel);

import { Document, model, Schema, Types } from "mongoose";

interface iEvent {
  userID: Types.ObjectId;
  name: string;
  description: string;
  frequency: string;
  completedDates: [Date];
}

interface iEventData extends iEvent, Document {}

const eventModel = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    frequency: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly"],
    },
    completedDates: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<iEventData>("event", eventModel);
