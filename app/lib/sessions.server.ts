import { createCookieSessionStorage } from "@remix-run/cloudflare"
import type { Session } from "@remix-run/cloudflare";
import { Env } from "context";
import { createThemeSessionResolver } from "remix-themes";



// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production"


export function getSessionStorage(env: Env) {
  if (!env.SESSION_SECRET) throw new Error("SESSION_SECRET is not defined");

  return createCookieSessionStorage({
    cookie: {
      httpOnly: true,
      name: "theme",
      path: "/",
      sameSite: "lax",
      secrets: [env.SESSION_SECRET],
       // Set domain and secure only if in production
    ...(isProduction
      ? { domain: "Kinstree.com", secure: true }
      : {}),
    },
  });
}

export function commitSession(session: Session, env: Env) {
  let sessionStorage = getSessionStorage(env);
  return sessionStorage.commitSession(session);
}

export function destroySession(session: Session, env: Env) {
  let sessionStorage = getSessionStorage(env);
  return sessionStorage.destroySession(session);
}

export function getSession(requestOrCookie: Request | string | null, env: Env) {
  let cookie =
    typeof requestOrCookie === "string"
      ? requestOrCookie
      : requestOrCookie?.headers.get("Cookie");

  let sessionStorage = getSessionStorage(env);
  return sessionStorage.getSession(cookie);
}

export function getThemeSessionResolver (env:Env) {
  return createThemeSessionResolver(getSessionStorage(env))
}