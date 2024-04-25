import {userSchema} from '../models/user.schema';

async function getLeaderboard(req,res){
    const leaderboard=await userSchema.find({role:0}).sort({
        points:'desc'
    }).select("username points")
    return res.status(200).send({
        success:true,
        leaderboard
    })
}