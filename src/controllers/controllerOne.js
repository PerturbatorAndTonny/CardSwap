import { hashPass } from "../utils/pass.js"
import { createSession } from '../utils/session.js'

export const controllerOne = (req, res) => {
  res.status(200).json({
    message: "Pong!, but is a controller :D"
  })
}

export const controllerTwo = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Pong!, but is a controller :D and the id is ${id}`
  })
}

export const startSession = async (req, res) => {
  const { name, mail, pass } = req.body;

  const newtoken = await createSession({ role: "Admin" })
  const securePass = await hashPass(pass);
  res.status(201).json({
    message: 'Session created successfully',
    session: newtoken
  })
}