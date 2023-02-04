import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return res.redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const cars = await prisma.car.findMany({
    where: {
      userId: user?.id,
    },
  });

  res.json(cars);
}
