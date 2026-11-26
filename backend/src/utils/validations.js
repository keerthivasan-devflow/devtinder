const validator = require("validator");
const bcrypt = require("bcrypt");

const VALIDATE_SIGNUP = (req) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname) {
    throw new Error("First name or last name cannot be empty.");
  } else if (firstname.length < 4 || lastname.length > 50) {
    throw new Error("Name must be between 4 and 50 characters long.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email format.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be more strong");
  }
};

const PROFILE_EDITABLE_FIELDS = (req) => {
  const data = req.body;

  const ALLOWED_FIELDS = ["firstname", "lastname", "age", "phone", "skills"];

  const isValidUpdate = Object.keys(data).every((field) =>
    ALLOWED_FIELDS.includes(field),
  );

  if (!isValidUpdate)
    throw new Error("Invalid update: This field is not permitted.");

  if (data?.skills.length > 3)
    throw new Error("Skill limit exceeded: maximum of 3 allowed");

  if (new Set(data?.skills).size !== data?.skills.length)
    throw new Error("Duplicate skills are not allowed");

  return isValidUpdate;
};

const ENCRYPT_PASSWORD = async (password) => await bcrypt.hash(password, 10);

const IS_VALID_PASSWORD = async (password, PasswordHash) =>
  await bcrypt.compare(password, PasswordHash);

module.exports = {
  VALIDATE_SIGNUP,
  PROFILE_EDITABLE_FIELDS,
  ENCRYPT_PASSWORD,
  IS_VALID_PASSWORD,
};
