const { User, Thought} = require('../models');

/* 
To Build out
const {
    getUsers,//DONE
    getSingleUser, //Done
    createUser, //Done
    updateUser,
    deleteUser,
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

}