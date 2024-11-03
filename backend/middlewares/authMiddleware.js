 const jwt =require('jsonwebtoken')

 module.exports.authMiddleware = async(req,res,next)=>{
    const{accessToken}=req.cookies;
    if(!accessToken){
    return res.status(401).json({error : 'Please Login First'})
    }
    else{
    try {
        const deCodeToken = await jwt.verify(accessToken,process.env.SECRET);
        req.role=deCodeToken.role;
        req.id=deCodeToken.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Session Expired. Please Login Again.' });
        }
        return res.status(401).json({ error: 'Invalid Token. Please Login.' });
    }
    }

 }