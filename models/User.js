const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "Please provide a password with min length:6"],
    required: [true, "Please provide a password "],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  phone_number: {
    type: String,
  },
  gender: {
    type: String,
  },
  birth_date: {
    type: String,
  },
  adress: 
    {
      title: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      details: {
        type: String,
      },
    },
  
  myorder: [
    {
      type: mongoose.Schema.ObjectId,

      ref: "Order",
    },
  ],

  favorites: [
    {
      type: mongoose.Schema.ObjectId,

      ref: "Product",
    },
  ],
  blocked: {
    type: Boolean,
    default: false,
  },
});
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});
UserSchema.methods.generateJwtFromUser = function () {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this._id,
    name: this.name,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRE });

  return token;
};

module.exports = mongoose.model("User", UserSchema);
