import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
const cookies = new Cookies();
/**
 * Checks if user is authenticated
 */
const isAuthorized = () => {
  const user = getLoggedInUser();
  if (isAuthenticated() && user) {
    return true;
  } else {
    return false;
  }
};

const isAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) {
    deleteCookies();
    return false;
  }

  const tokenExp = cookies.get("tokenExp");
  if (!tokenExp) {
    deleteCookies();
    return false;
  } else {
    return true;
  }
};

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
  const user = cookies.get("name");
  const role = cookies.get("role");
  const tokenExp = cookies.get("tokenExp");
  let userData = { user, role, tokenExp };
  return user && role && tokenExp ? userData : null;
};

const deleteCookies = () => {
  cookies.remove("name", { path: "/" });
  cookies.remove("role", { path: "/" });
  cookies.remove("token", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
  cookies.remove("tokenExp", { path: "/" });
  cookies.remove("userId", { path: "/" });
};

export { isAuthenticated, getLoggedInUser, isAuthorized, deleteCookies };
