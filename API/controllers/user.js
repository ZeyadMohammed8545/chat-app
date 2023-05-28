import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  console.log(req.user);
  const keyword = req.query.search;
  console.log(keyword);
  try {
    const query =
      keyword !== undefined
        ? {
            $or: [
              { name: { $regex: keyword, $options: "i" } },
              { email: { $regex: keyword, $options: "i" } },
            ],
          }
        : {};

    const targetUsers = await User.find(query).find({
        _id: { $ne: req.user._id },
      });
    res
      .status(200)
      .json({ message: "fetched Successfully", users: targetUsers });
  } catch (err) {
    next(err);
  }
};
