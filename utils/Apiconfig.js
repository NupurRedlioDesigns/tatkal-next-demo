import axios from "axios";
import bcrypt from 'bcryptjs';

async function securedMiddleware() {
  const saltRounds = 10;
  const password = 'tatkal-authorized';
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const headers = { Authorization: `Bearer ${hashedPassword}` };
  return axios.create({ headers });
}

export default securedMiddleware;

export const instance = await securedMiddleware()



export const secureAccess = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // for security purpose
  if (token === undefined) {
    return res.status(401).json({ message: "Access Denied!" });
  }

  const hash = "tatkal-authorized";
  const getAccess = await bcrypt.compare(hash, token);

  // for security purpose end
  if (!getAccess) {
    return res.status(401).json({ message: "Access Denied!" });
  }

  return true;
};