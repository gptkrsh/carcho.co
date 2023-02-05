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
    const cars = await prisma.car.findMany({
      where: {
        user: {
          email: session?.user?.email as string,
        },
      },
    });

    return res.status(200).json(cars);
  } else if (req.method === "POST") {
    const { name } = req.body;

    const car = await prisma.car.create({
      data: {
        name,
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });

    return res.status(200).json(car);
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    const car = await prisma.car.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(car);
  } else {
    return res.status(405).end();
  }
}
