const crypto =require('crypto');
class HashServices{

    async hashotp(otp){
         //crypto.createHmac('encrypting technique','secret key').update("encrypting data").digest('hex')
         
      return await crypto.createHmac('sha256',process.env.Hash_SECRET).update(otp).digest('hex')
    }
}
module.exports= new HashServices();