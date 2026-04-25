// oxlint-disable no-unused-vars
import { validateSession, isBlackListed } from '../utils/session.js'
const key = process.env.JWT_KEY

export const verifyToken = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({
      error: 'token requerido'
    })
  }

  if (isBlackListed(token)) {
    res.status(401).json({ error: "Token inválido o expirado" });
    return;
  }

  try {
    const decoded = await validateSession(token, key)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Token expirado o invalido'
    })
  }
}

export const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: "No autenticado" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "No tenés permiso para este recurso" });
      return;
    }

    next();
  };
};