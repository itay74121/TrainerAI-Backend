import jwt from 'jsonwebtoken';


export async function Authorization(req, res, next) {
    try{
        const obj = jwt.verify(req.body.token,process.env.ACCESS_TOKEN_SECRET)
        req.body = obj
        next()
    } catch (error) {  
        if (error.name == jwt.JsonWebTokenError.name ) {
            console.log(error.message)
        }
        
        res.status(401).send("Unauthorized")
    }
} 

export async function getJWT(data) {
    const secret=process.env.ACCESS_TOKEN_SECRET
    const token =  await jwt.sign(data,secret,{
        algorithm: "HS256"
    })
    return token
}
