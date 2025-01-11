const registerUser =
  "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *";

const logInUser = "SELECT * FROM users WHERE email = $1";

module.exports = {
  registerUser,
  logInUser,
};
