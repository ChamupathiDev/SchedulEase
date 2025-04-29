import User, { find, findById, findByIdAndUpdate, findByIdAndDelete } from "../models/ModuleModel.js";

const getallUsers = async (req, res) => {
  try {
    const users = await find();
    if (!users.length) return res.status(404).json({ message: "No users found" });
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

const addUsers = async (req, res) => {
  const { modulename, moduleid, modulecredit, licname, licemailadd } = req.body;
  try {
    const user = new User({ modulename, moduleid, modulecredit, licname, licemailadd });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add user", error: err });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { modulename, moduleid, modulecredit, licname, licemailadd } = req.body;
  try {
    const user = await findByIdAndUpdate(
      id,
      { modulename, moduleid, modulecredit, licname, licemailadd },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update user", error: err });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete user", error: err });
  }
};

const _getallUsers = getallUsers;
export { _getallUsers as getallUsers };
const _addUsers = addUsers;
export { _addUsers as addUsers };
const _getById = getById;
export { _getById as getById };
const _updateUser = updateUser;
export { _updateUser as updateUser };
const _deleteUser = deleteUser;
export { _deleteUser as deleteUser };