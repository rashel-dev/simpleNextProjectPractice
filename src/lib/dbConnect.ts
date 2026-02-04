import { connect } from "mongoose";

const mongo_uri = process.env.MONGODB_URI;

if(!mongo_uri){
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = global.mongoose;  //in typescript global.mongoose shows an error. thats why I create types.d.ts

if(!cached){
   cached = global.mongoose = {
    conn: null,
    promise: null
   }
}

const dbConnect = async () => {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = connect(mongo_uri).then((c) => c.connection);
    }

    try{
        cached.conn = await cached.promise;
    } catch (error){
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default dbConnect;