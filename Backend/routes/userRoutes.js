const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { User } = require("../models/User");
const Connection = require("../models/Connection");
const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});

router.get("/requests", protect, async (req, res) => {
  try {
    const allRequests = await Connection.find({
      toUserId: req.user._id,
    })
      .populate("fromUserId", "name")
      .populate("toUserId", "name");
    allRequests.length
      ? res.send(allRequests)
      : res.send([]);
  } catch (err) {
    console.log(err);
    res.status(404).json("Something went wrong.");
  }
});

router.get("/feed", protect, async (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;

  limit = limit > 100 ? 100 : limit;
  limit = limit < 1 ? 1 : limit;

  page = page < 1 ? 1 : page;

  const skip = (page - 1) * limit;

  const loginUserId = req.user._id;
  try {
    const ignoredUser = await Connection.find({
      $or: [{ toUserId: loginUserId }, { fromUserId: loginUserId }],
    });
    const hideFromUser = new Set();

    ignoredUser.forEach((key) => {
      hideFromUser.add(key.fromUserId.toString());
      hideFromUser.add(key.toUserId.toString());
    });

    console.log(hideFromUser);

    const usersToShow = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideFromUser) } },
        { _id: { $ne: loginUserId } },
      ],
    })
      .skip(skip)
      .limit(limit);

    res.send(usersToShow);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
