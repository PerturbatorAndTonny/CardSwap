import jwt from "jsonwebtoken"

const key = process.env.JWT_KEY

export async function createSession(payload) {
  const token = await jwt.sign(payload, "secretHere", { expiresIn: '1h' })
  return token
}

export async function validateSession(token) {
  const isSession = await jwt.verify(token, "secretHere")
  return isSession
}