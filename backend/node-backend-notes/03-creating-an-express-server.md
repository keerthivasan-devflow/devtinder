# Initial Project Folder Set up

1. npm init - To create a package.json file (This file contains metadata about a project everything you need)
2. create a src folder
3. create a app.js inside src folder
4. npm install express --save
5. npm install -g nodemon

- create a server
- server should start listening for incoming requests

## Version numbers in detail

_Reference: Refer the **02-React-Git-Configuration.md** notes from react-dev folder_

## nodemon library

To verify that nodemon is installed globally, run: `npm list -g --depth=0`. If nodemon appears in the list, it should be accessible. You can also check the library exist in the following path (Windows): `C:\Users\<YourUsername>\AppData\Roaming\npm`

## Questions

1. What is the difference between app.use() and app.get()?
2. What happens if node_modules would be deleted unexpectedly? How to get it back?

```js
// To get a single user data
router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("Provide a valid email!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// To delete user data if they don't like to stay remain
router.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    // const user = await User.findByIdAndDelete({_id: id});
    // const user = await User.findOneAndDelete({_id: id});
    const user = await User.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});
```

## TIMELINE

- 16.25.00 - When you install any package using npm, several dependencies and packages are installed automatically. Why/How?
- 21.00.00 - What is this package-lock.json file?
- 25.00.00 - Why package versions are usually represented in 3-digits?
- 40.00.00 - Creating a server using express
- 44.15.00 - Handling incoming requests
- 48.30.00 - Handling different routes
- 51.30.00 - Install nodemon package
