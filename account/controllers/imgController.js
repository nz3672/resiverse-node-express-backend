const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "resiverse-images",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const upImgToS3 = async () => {
  const uploadSingle = await upload("resiverse-images").single("file");

  uploadSingle(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });
  });
  return uploadSingle;
};

module.exports = { upImgToS3, upload };
// exports.setProfilePic = (req, res, next) => {
//   const uploadSingle = upload("resiverse-images").single("file");

//   uploadSingle(req, res, async (err) => {
//     if (err)
//       return res.status(400).json({ success: false, message: err.message });

//     await User.create({ photoUrl: req.file.location });

//     res.status(200).json({ data: req.file.location });
//   });
// };
