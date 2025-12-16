import { NextFunction, Request, Response } from "express";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { env } from "../../env/env.js";

const region = env.AWS_REGION;
const userPoolId = env.AWS_COGNIT_USER_POOL_ID;

const jwks = createRemoteJWKSet(
  new URL(
    `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
  ),
);

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    const { payload } = await jwtVerify(token, jwks, {
      issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
    });

    req.user = {
      sub: payload.sub as string,
    };

    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}
