export const adminAuth = (req, res, next) => {
  const token = "xyz";
  const auth = token === "xyz";
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  next();
};

export const userAuth = (req, res, next) => {
  const token = "xyz";
  const auth = token === "xyz";
  if (!auth) {
    res.status(401).send("Unauthorized");
  }
  next();
};
