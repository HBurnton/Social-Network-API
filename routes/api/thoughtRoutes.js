const router = require('express').Router();
const {
    getSingleThought,
    getThoughts,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('')

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route(':/thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;