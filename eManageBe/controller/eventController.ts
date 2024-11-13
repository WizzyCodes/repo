import { Request, Response } from "express";
import eventModel from "../model/eventModel";

// // export const createEvent = async (req: Request, res: Response) => {
// //   try {
// //     const { title, description, date } = req.body;
// //     const { userID } = req.params;

// //     const event = await eventModel.create({
// //       title,
// //       description,
// //       date: Date,
// //       userID,
// //     });
// //     event.save();
// //     return res.status(201).json({
// //       message: "event created",
// //       data: event,
// //     });
// //   } catch (error) {
// //     return res.status(404).json({ message: "Error creating event" });
// //   }
// // };

// export const getAllEvents = async (req: Request, res: Response) => {
//   try {
//     const events = await eventModel.find({ userID: req.params.userID });
//     return res.status(201).json({
//       message: "event found",
//       data: events,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: "Error getting all event" });
//   }
// };

// // export const createHabit = async (userId: string, name: string, description: string, frequency: string): Promise<IHabit> => {
// //     const habit = new habit({ userId, name, description, frequency });
// //     return habit.save();
// //   };

// export const createHabit = async (req: Request, res: Response) => {
//   try {
//     const { name, description, frequency,CompletedDates } = req.body;
//     const { userID } = req.params;

//     const event = await eventModel.create(
//       {
//         frequency,
//         description,
//         userID,
//         name,
//         CompletedDates
//       },
//       { new: true }
//     );
//     const updated = await event.push(eventModel.findByIdAndUpdate(CompletedDates))
//     // event.CompletedDatawait event es.push(new Types.ObjectId(product?._id));
//     // // event.save();
//     return res.status(201).json({
//       message: "habit created",
//       data: event,
//     });
//   } catch (error) {
//     return res.status(404).json({ message: "Error creating habit" });
//   }
// };

// // export const addCompletedDate = async (habitId: string, date: Date): Promise<IHabit | null> => {
// //     return Habit.findByIdAndUpdate(habitId, { $push: { completedDates: date } }, { new: true });
// //   };

// //   export const createProduct = async (req: Request, res: Response) => {
// //     try {
// //       const { productName, productPrice, productQTY, productDetail, category } =
// //         req.body;
// //       const { sellerID } = req.params;
// //       const seller = await sellerModel.findById(sellerID);
// //       if (seller && seller.status === "seller") {
// //         const product: any = await productModel.create({
// //           productName,
// //           productPrice,
// //           productQTY,
// //           productDetail,
// //           category,
// //           sellerID,
// //         });
// //         seller.sellerProduct.push(new Types.ObjectId(product?._id));
// //         seller.save();
// //         return res.status(201).json({
// //           message: "product created",
// //           data: product,
// //           status: 201,
// //         });
// //       } else {
// //         return res
// //           .status(404)
// //           .json({ message: "You are unauthorized for this action" });
// //       }
// //     } catch (error) {
// //       return res.status(404).json({ message: "Error creating" });
// //     }
// //   };
export const createHabit = async (req: Request, res: Response) => {
  try {
    const { name, description, frequency, CompletedDates } = req.body;
    const { userID } = req.params;

    const habit = await eventModel.create({
      frequency,
      description,
      userID,
      name,
      CompletedDates: CompletedDates ? [Date] : [],
    });

    if (CompletedDates) {
      await eventModel.findByIdAndUpdate(
        habit._id,
        { $push: { CompletedDates: CompletedDates } },
        { new: true }
      );
    }

    return res.status(201).json({
      message: "habit created",
      data: habit,
    });
  } catch (error) {
    console.error("Error creating habit:", error);
    return res.status(500).json({ message: "Error creating habit" });
  }
};
