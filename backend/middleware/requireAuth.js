import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ ok: false, message: "Authentication required" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ ok: false, message: "JWT_SECRET is not configured" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ ok: false, message: "Invalid or expired token" });
  }
}
