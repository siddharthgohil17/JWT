import UserModel from "../modal/Schema.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req, res) => {
        const {name,email,password,password_confirmation,tc} = req.body;
            const user = await UserModel.findOne({ email: email });
            if (user) {
                res.json({'status': 'failed', 'message': 'Email already exists' });
                return;
            }
            else{
                if(name&&email&&password&&password_confirmation&&tc)
                {
                    if(password!==password_confirmation)
                    {
                     res.send({'status':'failed','message':'Not Match Password'})
                    }
                    else{
                        try {
                            const salt=await bcrypt.genSalt(10);
                            const hashpassword=await bcrypt.hash(password,salt)
                            const doc=new UserModel({
                                name:name,
                                email:email,
                                password:hashpassword,
                                tc:tc
                            })
                            await doc.save();                        
                            const saved_user=await UserModel.findOne({email:email});
                            //Generate JWT Token
                            const token=jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})

                            res.status(201).send({'status':"success",'message':'You are registered successfully',"token":token})
     
                        } catch (error) {  
                            res.send({'status':"failed",'message':'Unable to register'})
                        }
                       
                    }
                }else{
                    res.send({'status':"failed",'message':'All fields are required'})
                }
            }   
    }

    static UserLogin=async(req,res)=>{
        const {email,password}=req.body;
          if(email && password)
          {try{
            const user=await UserModel.findOne({email:email});
            if(!user){
               return res.send({'status':"failed",'message':'User not Found'})
            }

            const isValidPwd=await bcrypt.compare(password, user.password);
            if (!isValidPwd) {
              return  res.send({ 'status': 'failed', 'message': 'Invalid password' });
            }
            const token=jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
            return res.json({ 'status': 'success', 'message': 'Login successful',"token":token}); 
            
          }
          catch(error){
            res.send(error.message);
          }}
          else
          {
            res.send({'status':"failed",'message':'All fields are required'})
          }
        
    }

    static UserchangePassword=async(req,res)=>{
        const {password,password_confirmation}=req.body;
        if(password && password_confirmation){
            if(password !== password_confirmation){
          res.send({"status":"failed","message":"new password and confirm password doesn't match"})
        }
        else{
            const salt=await bcrypt.genSalt(10);
            const newhashpassword=await bcrypt.hash(password,salt);
            await UserModel.findByIdAndUpdate(req.user._id,{$set:{password:newhashpassword}});
            res.send({"status":"success","message":"Password is update"})
        }
    }
    else{
        res.send({"status":"failed","message":"All field are required"})
    }
    }

    static loggeduser=async(req,res)=>{
        res.send({"user":req.user})
    }

   
}

export default UserController;
