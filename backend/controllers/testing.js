const testServer = (req,res) =>{
  res.status(200).json({message : `working with no issues`});
}


module.exports = {
  testServer,
};
