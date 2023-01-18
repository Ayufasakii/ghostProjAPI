const TokenManager = require("../midleware/tokenManager");
const { MongoClient } = require("mongodb");
const ResponseManager = require("../midleware/ResponseManager");
const uri = "mongodb+srv://Kanyakon:1234Passw0rd@lotte1.jodcbbb.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const usersCollection = client.db("appdb").collection("users");
class AuthController {
    static index(req,res){
        res.send('From Login');
    }

    static getToken(req,res){
        res.send(TokenManager.getGenerateAccessToken({"username":req.params.username}));
    }
    static async register(req,res){
        try{
            await client.connect();
            const {username,fname,lname,phone} = req.body;
            if(!(username&&fname&&lname&&phone)){
                await ResponseManager.ErrorResponse(req,res,301,'All input is required')
                return;
            }
            const lastUser = await usersCollection.findOne(
                {},
                { sort: { _id: -1 } }
              );
            const DBuser = await usersCollection.findOne({$or:[{"username": username},{"phone": phone}]});
            if(DBuser != null){
                await ResponseManager.ErrorResponse(req,res,302,'Duplicate user')
                return;
            }
            const userAdd = {
                id: lastUser.id+1,
                username: username,
                fname: fname,
                lname: lname,
                phone: phone
            }
            await usersCollection.insertOne(userAdd);
            await ResponseManager.SuccessResponse(req,res,200,userAdd)
        }catch (err){
            await ResponseManager.CatchResponse(req,res,500,err.message)
        }
    }

    static async login(req,res){
        try{
            await client.connect();
            const {username,phone} = req.body;
            const DBuser = await usersCollection.findOne({"username": username});
            console.log(phone);
            if(DBuser == null){
                await ResponseManager.ErrorResponse(req,res,303,'Not found user')
                return;
            }else if(DBuser.phone != phone){
                await ResponseManager.ErrorResponse(req,res,304,'Phone is invalid')
                return;
            }else{
            const token = TokenManager.getGenerateAccessToken({"username":username})
            const response = {
                token : token,
                username : DBuser.username,
                phone : DBuser.phone,
                fname : DBuser.fname,
                lname : DBuser.lname,
            }
            await ResponseManager.SuccessResponse(req,res,200,response)
        }
        }catch(err){
            await ResponseManager.CatchResponse(req,res,500,err.message)
        }
    }

    static async getUserByUsername(req,res){
        try{
            const username = String(req.params.username);
            const client = new MongoClient(uri);
            await client.connect();
            const user = await usersCollection.findOne({"username": username});
            await client.close();
            await ResponseManager.SuccessResponse(req,res,200,token)
        }catch(err){
            await ResponseManager.CatchResponse(req,res,500,err.message)
        }
    }

    static checkAuthen(req,res){
        let jwtStatus = TokenManager.checkAuthentication(req);
        if(jwtStatus!=false){
          res.send(jwtStatus);
        }else{
          res.send("Token Error..");
        }
    }
}
module.exports = AuthController;