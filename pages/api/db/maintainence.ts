import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.redirect("/api/auth/signin");
  }

  if (req.method === "GET") {
    const maintainanceSchedule = await prisma.maintainanceVisit.findMany({
      where: {
        user: { email: session?.user?.email as string },
      },
      include: {
        car: true,
      },
    });

    return res.status(200).json(maintainanceSchedule);
  } else if (req.method === "POST") {
    const maintainanceVisit = await prisma.maintainanceVisit.create({
      data: {
        ...req.body,
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
        date: new Date(req.body.date),
      },
    });

    return res.status(200).json(maintainanceVisit);
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    const maintainanceVisit = await prisma.maintainanceVisit.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(maintainanceVisit);
  } else {
    return res.status(405).end();
  }
}
