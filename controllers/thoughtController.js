const { User, Thought} = require('../models');

module.exports ={

    getThoughts(req,res){
        Thought.find()
        .then((thought) => res.status(200).json(thought))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId})
        .select('-__v')
        .then((thought =>{
            !thought
                ? res.status(404).json({message: 'No thought with that ID'})
                : res.status(200).json(thought)
        }))
        .catch((err)=> res.status(500).json(err))
    },

    createThought(req, res){
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created Thought')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.status(200).json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thought: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'Thought deleted but no user with this id!' })
              : res.status(200).json({ message: 'Thought has been deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

      createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.videoId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.videoId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
}