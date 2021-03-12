const mongoose = require("../services/mongoose").mongoose;
const Schema = mongoose.Schema;

const userModel = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
},
{
    collection: "usersCollection",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model('userModel', userModel)