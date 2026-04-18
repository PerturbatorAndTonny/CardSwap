import { validateSession } from '../utils/session.js'
const key = process.env.JWT_KEY

export const verifyToken = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({
      error: 'token requerido'
    })
  }

  try {
    const decoded = await validateSession(token, key)
    console.log(decoded)
    data.user = decoded
    //console.log(data.user)
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      error: 'Token expirado o invalido'
    })
  }
}