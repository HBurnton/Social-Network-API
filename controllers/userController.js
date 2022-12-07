const { User, Thought} = require('../models');

/* 
To Build out
const {
    getUsers,//DONE
    getSingleUser, //Done
    createUser, //Done
    updateUser, //Done
    deleteUser,//Done
    createFriend,
    deleteFriend
    */

module.exports = {
    getUsers(req,res){
        User.find()
            .then((user)=> res.status(200).json(user))
            .catch((err) => res.status(500).json(err))

    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user found with that ID' })
              : res.status(200).json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

    createUser(req,res){
        User.create(req.body)
        .then(((user)=> res.status(200).json(user)))
        .catch((err)=> res.status(500).json(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user found' })
              : res.status(200).json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    deleteUser(req,res){
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user was found' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User and associated thoughts have been deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    createFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: {friends: req.params.friendId}},
            { runValidators: true, new: true}
        )
        .then((user) =>{
            !user
            ? res.status(404).json({message: "No user was found"})
            : res.status(200).json(user)
        })
        .catch((err) => res.status(500).json(err))
    },

    deleteFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $pull: {friends: req.params.friendId}},
            { new: true}
        )
        .then((user)=>{
            !user
            ? res.status(404).json({message: "No user was found"})
            : res.status(200).json(user)
        })
        .catch((err)=>res.status(500).json(err))
    }

}