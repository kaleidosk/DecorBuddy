const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const mongoose = require('mongoose');

// GET /user/:Id - Profile page
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("Error while retrieving the user", err);
      res.status(500).json({ message: "Error while retrieving the user" });
    });
});

// PUT /user/:userId - Edit profile
router.put('/:userId', (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log("Error while updating the user", err);
      res.status(500).json({ message: "Error while updating the user" });
    });
});

// DELETE /user/:userId - Delete profile
router.delete('/:userId', (req, res, next) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    User.findByIdAndRemove(userId)
      .then((deletedUser) => {
        if (!deletedUser) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json({ message: `User with id ${userId} has been deleted successfully` });
      })
      .catch((err) => {
        console.log("Error while deleting the user", err);
        res.status(500).json({ message: "Error while deleting the user" });
      });
  });
  
module.exports = router;
