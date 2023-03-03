const UserModel = require("../model/UserModel");

exports.register = async (req, res) => {

    let success = false;

  try {

    const data = {
      name: req.body.name,
      profile: req.body.profile,
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
    };


    const user = new UserModel(data);

    const result = await user.save();
    success = true;
    res.send({ success, data: result });
  } catch (err) {
    console.log(err);
    res.send({ success, data: [] });
  }
};
