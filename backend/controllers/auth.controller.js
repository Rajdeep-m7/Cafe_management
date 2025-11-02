import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Authenticated" });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logoutAdmin = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};
