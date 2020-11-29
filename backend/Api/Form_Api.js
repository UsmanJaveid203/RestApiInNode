var express = require('express');
var router = express.Router();
var FormModel = require('../modules/Form_module');
var multer  = require('multer');
var path = require('path');
router.use(express.static(__dirname+'./public/'))


/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec((err,data)=>{
    if(err){throw err}
    else{res.render('index', { title: 'Employee Records' , records:data, success:'' });}
  })
});

router.get('/getData',(req,res,next)=>{
    let getRecord= FormModel.find({})
    getRecord.exec()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.json(err);
    })
})

router.post('/postData',(req,res,next)=>{
    let uploadData = new FormModel({
        username:req.body.name,
        emails:req.body.email,
        password:req.body.pass
    })
    uploadData.save()
    .then(data=>{
        res.json({
            msg:"data Inserted Successfully"
        }) 
    })
    .catch(err=>{
        res.json(err);
    })
})

// router.patch('/updateData/:id',(req,res,next)=>{
//     FormModel.findById(req.params.id,function(err,data){
//         data.username = req.body.name?req.body.name:data.username;
//         data.emails = req.body.email?req.body.email:data.emails;
//         data.password = req.body.pass?req.body.pass:data.password;

//         data.save()
//             .then((dataa)=>{
//                 res.json({
//                     msg:"data Updated successfully.",
//                     result:dataa
//                 })
//             }).catch((err)=>{
//                 res.json(err);
//             })
//     })

// })

router.patch('/updateData/:id',(req,res,next)=>{
    FormModel.findByIdAndUpdate(req.params.id,{
        username:req.body.name,
        emails:req.body.email,
        password:req.body.pass
    })
    .then((data)=>{
        res.json({
            msg:"data Updated successfully.",
            result:data
        })
    }).catch((err)=>{
        res.json(err);
    })
})

router.delete('/deleteData/:id',(req,res,next)=>{
    FormModel.findByIdAndDelete(req.params.id)
    .exec()
    .then(data=>{
        res.json({
            msg:"data deleted successfully."
        })
    })
    .catch(err=>{
        res.json(err);
    })

})



var storage = multer.diskStorage({
    destination:"./public/uploads",
    filename:(req, file, cb) =>{
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
  
var upload = multer({ storage: storage });

router.post('/uploadProfile/:id',upload.single('filee'),(req,res,next)=>{
    let fileName = req.file.filename;
    FormModel.findByIdAndUpdate(req.params.id,{
        image:fileName
    })
    .then((data)=>{
        res.json({
            msg:"image uploaded successfully.",
            result:data
        })
    }).catch((err)=>{
        res.json(err);
    })
})

module.exports = router;