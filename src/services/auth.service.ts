import { clerkClient } from "../lib/clerk";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { HTTP_STATUS } from "../constants/http-status";

const buildDisplayName = (
  firstName: string | null,
  lastName: string | null,
  fallback: string,
) => {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  return fullName || fallback;
};

export const getClerkUserProfile = async (clerkUserId: string) => {
  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  const primaryEmail = clerkUser.emailAddresses.find(
    (email) => email.id === clerkUser.primaryEmailAddressId,
  );

  return {
    clerkId: clerkUser.id,
    email: primaryEmail?.emailAddress ?? null,
    name: buildDisplayName(
      clerkUser.firstName,
      clerkUser.lastName,
      clerkUser.username ?? clerkUser.id,
    ),
    imageUrl: clerkUser.imageUrl ?? null,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    username: clerkUser.username,
  };
};

export const syncAuthenticatedUser = async (clerkUserId: string) => {
  const profile = await getClerkUserProfile(clerkUserId);

  if (!profile.email) {
    throw new ApiError(
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      "Authenticated user does not have a primary email address",
    );
  }

  const existingUserByEmail = await prisma.user.findUnique({
    where: { email: profile.email }, // Aman karena sudah divalidasi di atas
  });

  if (existingUserByEmail && existingUserByEmail.clerk_id !== profile.clerkId) {
    await prisma.user.update({
      where: { email: profile.email },
      data: { clerk_id: profile.clerkId },
    });
  }

  const user = await prisma.user.upsert({
    where: {
      clerk_id: profile.clerkId,
    },
    update: {
      name: profile.name,
      email: profile.email,
      image_url: profile.imageUrl,
    },
    create: {
      clerk_id: profile.clerkId,
      name: profile.name,
      email: profile.email,
      image_url: profile.imageUrl,
      points: 0,
    },
  });

  return {
    user,
    profile,
  };
};
