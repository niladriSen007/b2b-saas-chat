import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { base } from "./base";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const authMiddleware = base?.$context<{
  session?: {
    user?: KindeUser<Record<string, unknown>>;
  }
}>().middleware(async ({ context, next }) => {
  const session = context.session || await getUserSession();
  if (!session?.user) {
    redirect("/api/auth/login");
  }
  return next({
    context: {
      user: session.user,
    },
  });
});

const getUserSession = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return {
    user
  }

}