const mongoose = require("mongoose");
const { ROLES } = require("../constants/role");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  value: {
    type: String,
    enum: ROLES,
    default: "customer",
    unique: true,
  },
});

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
