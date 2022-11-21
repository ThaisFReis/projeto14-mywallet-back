import db from '../db.js';

async function userMiddlewares(req, res, next) {
  
  //Token
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  //Verify token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  }
  catch (err) {
    res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      res.sendStatus(401);
      return;
    }

    const user = await db.collection("users").findOne({ _id: session.userId });

    if (!user) {
      res.sendStatus(401);
      return;
    }

    res.locals.user = user;

    next();

  } catch (err) {
    res.sendStatus(500);
  }
}

export default userMiddlewares;