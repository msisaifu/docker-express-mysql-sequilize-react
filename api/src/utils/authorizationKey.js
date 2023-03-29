const authorizationKey = (req) => {
  return req.get("authorization").split(" ")[1];
};

module.exports = authorizationKey;
