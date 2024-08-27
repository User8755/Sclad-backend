const mongoose = require('mongoose');

const article = new mongoose.Schema(
  {
    art: {
      type: String,
      require: true,
      unique: true,
      minlength: 1,
      maxlength: 20,
    },
    name: {
      type: String,
      require: true,
      unique: true,
      minlength: 1,
      maxlength: 500,
    },
    place: {
      type: Array,
      require: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('article', article);
