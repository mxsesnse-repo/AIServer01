const path = require("path")

exports.uploadDataset = (req,res) => {

    if(!req.file){
        return res.status(400).json({
            message:"No dataset uploaded"
        })
    }

    res.json({
        message:"Dataset uploaded successfully",
        filename:req.file.filename,
        path:req.file.path
    })
}