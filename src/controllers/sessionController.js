import { User } from '../models/userModel.js'
import { comparePass } from "../utils/pass.js"
import { createSession, addToBlackList } from '../utils/session.js'

export const startSession = async (req, res) => {
  const { mail, pass } = req.body;

  const isUser = await User.findOne({ mail });

  if (!isUser) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isMatch = await comparePass(pass, isUser.pass);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const newtoken = await createSession({ role: "Admin" })
  res.status(201).cookie("token", newtoken).json({
    message: 'Session created successfully'
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