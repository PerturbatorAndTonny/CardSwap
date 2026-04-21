import { hashPass } from "../utils/pass.js"
import { createSession, addToBlackList } from '../utils/session.js'

export const startSession = async (req, res) => {
  const { mail, pass } = req.body;

  const newtoken = await createSession({ role: "Admin" })
  const securePass = await hashPass(pass);
  res.status(201).json({
    message: 'Session created successfully',
    session: newtoken
  })
}

export const closeSession = (req, res) => {
  try {
    const { token } = req.cookies
    addToBlackList(token)

    return res.clearCookie("token").json({
      message: "Session closed successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
    })
  }
}