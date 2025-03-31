import User from "../models/userModel.js";

export const googleCallback = async (req, res) => {
  try {
    const { id, displayName, emails } = req.user;

    let user = await User.findOne({ email: emails[0].value });

    if (!user) {
      user = new User({
        uid: id,
        name: displayName,
        email: emails[0].value,
      });
      await user.save();
    }

    res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    res.status(500).json({ message: "Google authentication failed" });
  }
};

export const getUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect(process.env.CLIENT_URL);
    });
  });
};
