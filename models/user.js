const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PassportLocalMongoose = require("passport-local-mongoose");
const { schema } = require("./review");
const { required } = require("joi");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
