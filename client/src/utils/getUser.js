// get logged in user
import { decodeToken } from "react-jwt";

const getUser = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)refreshtoken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  console.log(decodeToken(token));
  const user = decodeToken(token);
  console.log(user);
  return user;
};

export default getUser;
