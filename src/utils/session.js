import jwt from "jsonwebtoken"

const key = process.env.JWT_KEY

const blacklist = new Set([])

export async function createSession(payload) {
  const token = await jwt.sign(payload, key, { expiresIn: '1h' })
  return token
}

export async function validateSession(token) {
  const isSession = await jwt.verify(token, key)
  return isSession
}

export function addToBlackList (token){
  blacklist.add(token)
}

export function isBlackListed(token) {
  return blacklist.has(token)
}