const mongoose = require('mongoose')

const connectToDB = async() => {
    try{
        if(mongoose.connections[0].readyState){
            return false;
        }
        await mongoose.connect('mongodb://127.0.0.1:27017/building')
        console.log('connect with db in utils => db.js');
        
    }catch(err){
        console.log('error connectToDB file', err);
        
    }
}

export default connectToDB