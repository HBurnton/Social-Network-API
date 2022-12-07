const { Schema, model, default: mongoose } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought",
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const Student = model('student', studentSchema);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

module.exports = Student;
