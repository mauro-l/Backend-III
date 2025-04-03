import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specie: {
    type: String,
    requierd: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  adopted: {
    type: Boolean,
    default: false,
  },
  image: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export const petModel = mongoose.model("pets", petSchema);
