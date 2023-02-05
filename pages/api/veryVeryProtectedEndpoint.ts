import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Novu } from "@novu/node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    res.getHeader("VERY-VERY-PROTECTED-HEADER") !==
    process.env.VERY_VERY_PROTECTED_HEADER
  ) {
    return res.status(401).json({ error: "Not authorized" });
  }

  // send novu mail to all users who have maintainance visit in the next 24  hours

  prisma.maintainanceVisit
    .findMany({
      where: {
        date: {
          gte: new Date(),
          lte: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        car: true,
        user: true,
      },
    })
    .then((maintainanceVisits) => {
      maintainanceVisits.forEach((maintainanceVisit) => {
        new Novu(process.env.NOVU_API_KEY as string).trigger(
          "reminder-for-car-maintenance",
          {
            to: {
              subscriberId: maintainanceVisit?.user?.email as string,
            },
            payload: {},
          }
        );
      });
    });

  return res.status(200).json({ message: "ok" });
}
