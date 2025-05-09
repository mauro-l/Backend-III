import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specie: {
    type: String,
    required: true,
  },
  birthdate: {
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
  gender: {
    type: String,
    enum: ["macho", "hembra"],
    required: true,
  },
});

export const petModel = mongoose.model("pets", petSchema);
