import { prisma } from "../lib/prisma";

export const getLeaderboardService = async () => {
  const users = await prisma.user.findMany({
    take: 10,
    orderBy: [
      {
        points: "desc",
      },
      {
        createdAt: "asc",
      },
    ],
    select: {
      id: true,
      clerk_id: true,
      name: true,
      email: true,
      image_url: true,
      points: true,
      _count: {
        select: {
          modules: true,
        },
      },
    },
  });

  return users.map((user, index) => ({
    rank: index + 1,
    id: user.id,
    clerkId: user.clerk_id,
    name: user.name,
    email: user.email,
    imageUrl: user.image_url,
    totalPoints: user.points,
    totalModules: user._count.modules,
  }));
};

export const getMyLeaderboardRankService = async (clerkUserId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerk_id: clerkUserId,
    },
    select: {
      id: true,
      name: true,
      points: true,
      createdAt: true,
    },
  });

  if (!user) {
    return null;
  }

  const usersAboveCount = await prisma.user.count({
    where: {
      OR: [
        {
          points: {
            gt: user.points,
          },
        },
        {
          AND: [
            {
              points: user.points,
            },
            {
              createdAt: {
                lt: user.createdAt,
              },
            },
          ],
        },
      ],
    },
  });

  return {
    name: user.name,
    rank: usersAboveCount + 1,
    totalPoints: user.points,
  };
};
