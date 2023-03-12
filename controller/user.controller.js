import "../model/connection.js";
import * as url from "url";
import jwt from "jsonwebtoken";

//to link schema model
import UserSchemaModel from "../model/user.model.js";


export var save = async (req, res) => {
  var userDetails = req.body
  // console.log(userDetails);

  var userlist = await UserSchemaModel.find();
  // console.log(userlist);
  var l = userlist.length;
  // console.log(l);
  // var _id=l == 0? 1 : userlist[l-1]._id+1;    //conditional operator.
  var _id = l;
  if (l == 0)
    _id = 1
  else
    _id = userlist[l - 1]._id + 1;
  userDetails = { ...userDetails, "_id": _id, "status": 0, "role": "user", "info": Date() };
  var user = await UserSchemaModel.create(userDetails, (err, data) => {
    if (!err)
      return res.status(201).json({ "msg": "sucess" })
    else
      return res.status(501).json(err);
  })

}


export var fetch = async (req, res) => {
  var url_obj = url.parse(req.url, true).query;
  //  console.log(url_obj);
  var userlist = await UserSchemaModel.find(url_obj);
  //  console.log(userlist);
  if (userlist.length != 0)
    return res.status(201).json(userlist);
  else
    return res.status(500).json(userlist);
}

export var deleteuser = async (req, res) => {
  var id = req.params.id;
  // console.log(id);
  var user = await UserSchemaModel.find({ _id: id });
  // console.log(user);
  // res.json({"output":"working"});
  if (user.length != 0) {
    let result = await UserSchemaModel.deleteMany({ _id: id });
    if (result)
      return res.status(203).json({ "msg": "success" })
    else
      return response.status(500).json({ error: 'Server Error' });
  }

  else
    return response.status(404).json({ error: 'Resource not found' });
}

export var updateuser = async (req, res) => {
  // console.log(req.body);
  var userDetails = await UserSchemaModel.find({ _id: req.body._id });
  // console.log(userDetails);
  if (userDetails.length != 0) {
    var id = req.body._id;
    // delete req.body._id;
    var user = await UserSchemaModel.updateOne({ _id: id }, { $set: req.body })
    if (user != 0)
      return res.status(201).json({ "msg": "succ" });
    else
      return res.status(500).json({ error: "Server Error" });
  }
  else
    return res.status(404).json({ error: "requested resource not available" });
}

export var login = async (req, res) => {
  var userDetails = req.body
  userDetails = { ...userDetails, "status": 1 };
  var userlist = await UserSchemaModel.find(userDetails);
  // console.log(userlist);
  if (userlist.length != 0) {
    let payload = { "subject": userlist[0].email };
    let token = jwt.sign(payload, "aaaaaaa");
    return res.status(201).json({ "token": token, "userDetails": userlist[0] });
  }
  else
    return res.status(500).json({ "token": "error" });
}
