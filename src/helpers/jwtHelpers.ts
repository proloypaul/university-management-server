import Jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return Jwt.sign(payload, secret, { expiresIn: expireTime });
};

export const jwtHelpers = {
  createToken,
};
