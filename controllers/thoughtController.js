const { User, Thought} = require('../models');

/* 
To Build out
    getSingleThought, 
    getThoughts, //DONE
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
*/

module.exports ={

    getThoughts(req,res){
        Thought.find()
        .then((thought) => res.status(200).json(thought))
        .catch((err) => res.status(500).json(err))
    }
}