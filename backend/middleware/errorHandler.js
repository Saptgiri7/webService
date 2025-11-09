const errorHandleMiddler = (err,req,res,next)=>{
    if(err instanceof Error){
        return res.status(err?.statusCode || 500 ).json({message:err.message});
    }

    return res.json({message:`generic error message`});
}


module.exports = errorHandleMiddler;