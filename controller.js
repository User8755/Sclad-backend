const place = require('./model');

module.exports.postTable = (req, res, next) => {
  if (req.data) {
    place
      .deleteMany({})
      .then(() =>
        place
          .create(req.data)
          .then(() => res.end())
          .catch((e) => next(e))
      )
      .catch((e) => next(e));
  }
};

module.exports.getTable = (req, res, next) => {
  place
    .find({})
    .then((data) => res.send(data))
    .catch((e) => next(e));
};
