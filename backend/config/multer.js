const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const keys = require("./keys");
const path = require("path");

const s3 = new aws.S3({
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  secretAccessKey: keys.AWS_SECRET_KEY,
  Bucket: "ddprofileimage",
});

const fileUpload = multer({
  storage:  multerS3({
    s3: s3,
    bucket: "ddprofileimage",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 5000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  console.log(file);
  // Check ext
  const extname = path.extname(file.originalname).toLowerCase();

  const extention = [".jpeg", ".png", ".gif", ".jpg", ".docx", ".pdf", ".xlsx"];
  let final = extention.filter((value) => {
    return value === extname;
  });
  console.log(final);
  if (final.length > 0) {
    console.log(final);
    return cb(null, true);
  } else {
    cb("please upload files which have jpeg png, gif, jpg, docx, pdf, xlsx");
  }
}

// // module.exports = fileUpload;

// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const aws = require("aws-sdk");
// const keys = require("./keys");
// const path = require("path");



// var storage = multer.diskStorage({  
//   destination:(req,file,cb)=>{  
//       cb(null,'./public/uploads');  
//   },  
//   filename:(req,file,cb)=>{  
//       cb(null,file.originalname);  
//   }  
// }); 

// const fileUpload = multer({
//   storage,
//   limits: { fileSize: 5000000 }, // In bytes: 2000000 bytes = 2 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// function checkFileType(file, cb) {
//   console.log(file);

//   // Allowed ext
//   const filetypes = / .docx | pdf/;
//   // Check ext
//   const extname = path.extname(file.originalname).toLowerCase();
//   console.log(extname)
//   const extention = [".jpeg", ".png", ".gif", ".jpg", ".docx", ".pdf", ".xlsx"];
//   let final = extention.filter((value) => {
//     return value === extname;
//   });
//   if (final.length > 0) {
//     console.log(final);
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

module.exports = fileUpload;

