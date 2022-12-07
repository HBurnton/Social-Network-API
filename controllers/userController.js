const { User, Thought} = require('../models');

/* 
To Build out
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
    */

module.exports = {
    createUser(req,res){
        User.create(req.body)
        .then(((user)=> res.status(200).json(user)))
        .catch((err)=> res.status(500).json(err))
    },

    getUsers(req,res){
        User.find()
            .then((students)=> res.status(200).json(students))
            .catch((err) => res.status(500).json(err))

    }
}