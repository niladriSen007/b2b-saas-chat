import { os } from "@orpc/server";

export const base = os.$context<{request : Request}>().errors({
  RATE_LIMITED: {
    message: "You are being rate limited. Please try again later.",
  },
  NOT_FOUND: {
    message: "The requested resource was not found.",
  },
  BAD_GATEWAY: {
    message: "Bad gateway. Please try again later.",
  },
  BAD_REQUEST: {
    message: "Bad request. Please check your input.",
  },
  FORBIDDEN: {
    message: "You do not have permission to access this resource.",
  },
  UNAUTHORIZED: {
    message: "You are not authorized to access this resource.",
  },
  INTERNAL_SERVER_ERROR: {
    message: "An internal server error occurred. Please try again later.",
  },
})