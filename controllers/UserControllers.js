const { decryptPwd, encryptPwd } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const fs = require("fs");

class UserController {
  static getAll(req, res) {
    try {
      let users = fs.readFileSync("./data/users.json", "utf8");
      users = JSON.parse(users);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async register(req, res) {
    try {
      const { username, password, role } = req.body;

      if (!username || !password || !role) {
        return res.status(400).json({ message: "Invalid input" });
      }
      let users = fs.readFileSync("./data/users.json", "utf8");
      users = JSON.parse(users);

      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      const hashedPassword = await encryptPwd(password);

      let newUser = {
        id: users.length + 1,
        username: username,
        password: hashedPassword,
        role: role,
      };

      users.push(newUser);
      fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 3));

      const { password: foundPassword, ...userWithoutPassword } = newUser;
      console.log(users);
      res.status(201).json(userWithoutPassword);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      let users = fs.readFileSync("./data/users.json", "utf8");
      users = JSON.parse(users);
      let foundUser = users.find((user) => user.username === username);

      if (foundUser) {
        if (decryptPwd(password, foundUser.password)) {
          if (foundUser.role === "admin") {
            let user_token = generateToken(foundUser);
            return res.status(200).json({
              user_token
            });
          } else {
            return res.status(403).json({
              message: "You don't have permission to log in as an admin.",
            });
          }
        } else {
          return res.status(403).json({
            message: "Invalid password!",
          });
        }
      } else {
        return res.status(404).json({
          message: "User not found!",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getTokenUser(req, res) {
    try {
      const id = +req.userData.id;
      let users = fs.readFileSync("./data/users.json", "utf8");
      users = JSON.parse(users);

      // Find the user with the specified ID
      const result = users.find((user) => user.id === id);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
