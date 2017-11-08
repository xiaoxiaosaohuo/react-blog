const  muilter = require('./uploadUtil');
        //multer有single()中的名称必须是表单上传字段的name名称。
 const upload=muilter.single('file');
 exports.dataInput = function (req, res) {
      upload(req, res, function (err) {
        //添加错误处理
        if (err) {
             return  console.log(err);
        }
        res.status(200)
        res.json({src:req.file.filename})
        //文件信息在req.file或者req.files中显示。
        // console.log(req);
        });
    }
