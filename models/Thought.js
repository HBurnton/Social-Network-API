const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            get: function(date){
                return `${date.getMonth()+1}/${date.getDate()+1}/${date.getfullYear()}`
            }
        },
        username:{
            type:String,
            required: 'true',
        },
        reactions: [reactionSchema],
    },
    {
        toJSON:{
            getters: true,
            virtuals: true,
            id: false,
        }
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;