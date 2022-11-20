const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');
//const client = new dsteem.Client('http://192.168.3.6:8080');
//const client = new dsteem.Client('https://api.steememory.com');

module.exports.isVotingPowerEnough = async (account_name, limit) => { 

    // console.log(`account_name=${account_name}`);
    // console.log(`limit=${limit}`);

    return new Promise((resolve) => {

        client.database
        .call('get_accounts', [[account_name]])
            .then(result => {
                //console.log("then")
                if(result.length > 0){             
              	    let vp = result[0].voting_power + (10000 * ((new Date() - new Date(result[0].last_vote_time + "Z")) / 1000) / 432000);
                    console.log(`vp=${vp}`);
                    console.log(`isVotingPowerEnough=${vp > limit * 100}`);
                    resolve(vp > limit * 100);
                }
                else{
                    console.log("no record");
                    resolve(false)
                }
            })
            .catch(err =>{
                console.log(err);
                resolve(false)
            })
    })
};

