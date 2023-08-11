import jwt from 'jsonwebtoken';
import UserModel from '../modal/Schema.mjs';

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]; // Corrected 'spilt' to 'split'
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
      req.user = await UserModel.findById(userID).select('-password'); // Corrected '-password' to select the fields except 'password'
      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  } else {
    res.status(401).send({ 'status': 'failed', 'message': 'All fields are require' }); // Moved this block outside the try-catch
  }
  if(!token){
    res.status(401).send({ 'status': 'failed', 'message': 'Unauthorized User, No Token' })
  }
};

export default checkUserAuth;
