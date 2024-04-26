import userSchema from '../models/user.schema.js';

async function getLeaderboard(req,res){
    const leaderboard=await userSchema.find({role:0}).sort({
        points:'desc'
    }).select("username currentPoints")
    return res.status(200).send({
        success:true,
        leaderboard
    })
}

export {getLeaderboard}