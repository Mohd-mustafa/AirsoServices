import db from './db'

export const getAllAirpotDetails =() =>{
    const query ='SELECT * FROM airports';
    return new Promise((resolve,reject) =>{
        db.query(query,(err,result)=>{
            if(err){
                reject(err);
                 
            }else{
                resolve(result);
            }
        })
    })
}