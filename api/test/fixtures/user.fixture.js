const userOne = {
  first_name: "User 1",
  last_name: "last name",
  username: "user1",
  email: "user1@gmail.com",
  password: "123",
  confirm_password: "123",
  role: "A",
};
const userPassConflict = {
  first_name: "User 2",
  username: "user2",
  email: "user2@gmail.com",
  password: "123",
  confirm_password: "1234",
  role: "A",
};

module.exports = {
  userOne,
  userPassConflict,
};
