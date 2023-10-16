import { useEffect } from "react";
import { isAuthenticated, isAuthorized } from "./protectedHelper";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ roles, children }) => {
  const router = useRouter();
  const authenticated = isAuthenticated();
  const authorized = isAuthorized(roles);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!authenticated) {
        router.push("/login");
      } else if (!authorized) {
        router.push("/pageNotFound");
      }
    }
  }, [authenticated, authorized]);

  if (typeof window === "undefined") {
    return null;
  }

  return authorized ? children : null;
};

export default PrivateRoute;
