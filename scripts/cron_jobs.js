
const User = require('../src/models/user');
const Post = require('../src/models/post');
const moment = require('../node_modules/moment');
const Rating = require('../src/models/rating');

module.exports = {
    giveReputationToUser : async () =>{
        console.log("give Reputation to user");
        let allPost = await Post.find({});
        for(let i=0;i<allPost.length;i++){
            if(allPost[i].status == 'active'){
                //console.log(allPost[i].createdAt.toString());
                let newDateObj = moment(allPost[i].createdAt).add(5, 'm').toDate();
              // console.log(new Date(allPost[i].createdAt.toString()).getTime())
              // console.log(new Date(newDateObj).getTime());
               let timeDiff = new Date(newDateObj).getTime() - new Date().getTime();
               if(new Date().getTime() >= new Date(newDateObj).getTime()){
                   console.log("Happy make status inactive");
                   let positiveCount = 0 ,negativeCount = 0;
                   for(let j=0;j<allPost[i].ratings.length;j++){
                       let ratingObject = await Rating.findById({_id : allPost[i].ratings[j]});
                       console.log(ratingObject);
                       if(ratingObject.ratingType == 'positive'){
                           positiveCount++;
                       }
                       if(ratingObject.ratingType == 'negative'){
                           negativeCount++;
                       }
                   }
                   if(positiveCount == negativeCount){
                    await Post.findOneAndUpdate({_id : allPost[i]._id},{ $set: { result: "noStatus" } });
                   }else if(positiveCount > negativeCount){
                    await Post.findOneAndUpdate({_id : allPost[i]._id},{ $set: { result: "positiveStatus",status : 'inactive' } });
                   }else if(negativeCount > positiveCount){
                    await Post.findOneAndUpdate({_id : allPost[i]._id},{ $set: { result: "negativeStatus",status :'inactive' } });
                   }
               }
            }
        }
       
    }
}