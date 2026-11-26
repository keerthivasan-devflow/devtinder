const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: "String",
      required: [true, "FIRSTNAME field is a mandatory field"],
    },
    lastname: String,
    age: { type: Number },
    email: {
      type: String,
      unique: true,
      // This validate function runs only when creating a new document.
      // To enforce it on updates (PATCH/PUT), validation must be enabled explicitly.
      validate: [(v) => validator.isEmail(v), "{VALUE} is not valid"],
    },
    phone: {
      type: Number,
      required: true,
      cast: "\nName of the field: {PATH}\n Value of the field: {VALUE}\n Type that Mongoose attempted to cast to: {KIND}",
    },
    gender: {
      type: String,
      lowercase: true,
      validate: (value) => {
        const gender = ["male", "female", "others"];
        if (!gender.includes(value)) {
          throw new Error("Gender field contains an unsupported value.");
        }
      },
    },
    password: {
      type: String,
      validate: (v) => {
        if (!validator.isStrongPassword(v))
          throw new Error("Password does not meet the required criteria");
      },
    },
    about: {
      type: String,
      default: "The is the default biodata about an user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "KPY23HNOA", {
    expiresIn: "1h",
  });

  return token;
};

// In future, this logic can be used - Please keep it here as is
// userSchema.methods.validatePassword = async function (pwd) {
//   const user = this;
//   const IsPasswordValid = await bcrypt.compare(pwd, user.password);
//   return IsPasswordValid;
// };

// Important Note - The model name should always start with a capital letter.
const User = model("User", userSchema);

module.exports = { User };
