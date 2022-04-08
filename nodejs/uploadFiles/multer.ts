import multer from "multer";
import randomString from "randomstring";

/** custom your setting */
const defaultUrl = process.env.UPLOAD_DIR || "/your-url/";

class UploadFile {
  uploadFile = (checkType: string[] = [], url: string = "") => {
    const placeStore = url || defaultUrl;

    const storage = multer.diskStorage({
      destination: function (req: Express.Request, _file: any, cb: any) {
        cb(null, placeStore);
      },
      filename: function (req: Express.Request, file: any, cb: any) {
        const fileName = file.originalname.split(".");
        const newFileName = `${randomString.generate(
          10
        )}-${new Date().getTime()}`;

        const extension = fileName[fileName.length - 1];

        if (checkType) {
          if (checkType.indexOf(extension) > -1) {
            cb(null, `${newFileName}.${extension}`);
          } else {
            cb(null, `null`);
          }
        } else {
          cb(null, `${newFileName}.${extension}`);
        }
      },
    });

    return multer({ storage: storage });
  };
}

export { UploadFile };
