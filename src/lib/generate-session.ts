import bcrypt from "bcrypt";

interface GenerateSessionDTO {
  email: string;
  passwordHash: string;
}
/**
 * @name GenerateSession
 * @param {string} email 
 * @param {string} passwordHash
 * @return {string}
 */
export function GenerateSession({
  email,
  passwordHash,
}: GenerateSessionDTO): string {
  const secret = process.env.SESSION_SECRET;

  const plainToken = `${secret}+${email}+${passwordHash}+${new Date().getTime()}`;

  const hash = bcrypt.hashSync(plainToken, 12);

  return hash;
}