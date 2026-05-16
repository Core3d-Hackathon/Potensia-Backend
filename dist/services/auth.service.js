"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutClerkSession = exports.syncAuthenticatedUser = exports.getClerkUserProfile = void 0;
const clerk_1 = require("../lib/clerk");
const prisma_1 = require("../lib/prisma");
const api_error_1 = require("../utils/api-error");
const http_status_1 = require("../constants/http-status");
const buildDisplayName = (firstName, lastName, fallback) => {
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
    return fullName || fallback;
};
const getClerkUserProfile = async (clerkUserId) => {
    const clerkUser = await clerk_1.clerkClient.users.getUser(clerkUserId);
    const primaryEmail = clerkUser.emailAddresses.find((email) => email.id === clerkUser.primaryEmailAddressId);
    return {
        clerkId: clerkUser.id,
        email: primaryEmail?.emailAddress ?? null,
        name: buildDisplayName(clerkUser.firstName, clerkUser.lastName, clerkUser.username ?? clerkUser.id),
        imageUrl: clerkUser.imageUrl ?? null,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        username: clerkUser.username,
    };
};
exports.getClerkUserProfile = getClerkUserProfile;
const syncAuthenticatedUser = async (clerkUserId) => {
    const profile = await (0, exports.getClerkUserProfile)(clerkUserId);
    if (!profile.email) {
        throw new api_error_1.ApiError(http_status_1.HTTP_STATUS.UNPROCESSABLE_ENTITY, "Authenticated user does not have a primary email address");
    }
    const user = await prisma_1.prisma.user.upsert({
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
        },
    });
    return {
        user,
        profile,
    };
};
exports.syncAuthenticatedUser = syncAuthenticatedUser;
const logoutClerkSession = async (sessionId) => {
    return clerk_1.clerkClient.sessions.revokeSession(sessionId);
};
exports.logoutClerkSession = logoutClerkSession;
//# sourceMappingURL=auth.service.js.map