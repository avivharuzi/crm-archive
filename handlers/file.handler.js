const fs = require('fs');
const AWS = require('aws-sdk');

class FileHandler {
    static checkFileType(file, type) {
        let filetypes;

        switch (type) {
            case 'image': {
                    filetypes = /^(jpg|jpeg|png|(image)\/jpg|(image)\/jpeg|(image)\/png)$/;
                    break;
                }
            case 'audio': {
                    filetypes = /^(mp3|MP3|mp3|MP3|(audio)\/mpeg|(audio)\/mp3|(audio)\/MP3)$/;
                    break;
                }
            default: {
                    return false;
                }
                break;
        }
    
        const fileExt = file.name.split('.');
        const fileActualExt = fileExt[fileExt.length - 1].toLowerCase();
        const mimetype = file.mimetype.toLowerCase();
    
        if (filetypes.test(fileActualExt) && filetypes.test(mimetype)) {
            return true;
        } else {
            return false;
        }
    }

    static checkFileSize(file, size) {
        const maxSize = size * 1000000;
        const fileSize = file.data.toString().length;
    
        if (fileSize < maxSize) {
            return true;
        } else {
            return false;
        }
    }

    static checkFilesErrors(files, type, size) {
        return new Promise((resolve, reject) => {
            let errors = [];

            if (files) {
                if (files.constructor !== Array) {
                    files = [files];
                }

                for (let file of files) {
                    if (!FileHandler.checkFileType(file, type)) {
                        errors.push(`File ${file.name} type is not supported`);
                    }
        
                    if (!FileHandler.checkFileSize(file, size)) {
                        errors.push(`File ${file.name} is too big`);
                    }
                }
            } else {
                errors.push(`You need to provide at least one ${type} to upload`);
            }

            if (errors.length) {
                reject(errors);
            } else {
                resolve(files);
            }
        });
    }

    static moveFiles(files, path = process.env.IMAGES_PATH) {
        return new Promise((resolve, reject) => {
            let newFileNames = [];
            let i = 0;

            if (files.constructor !== Array) {
                files = [files];
            }
    
            for (let file of files) {
                const fileExt = file.name.split('.');
                const fileActualExt = fileExt[fileExt.length - 1];
                const uid = Date.now() + i;
                const newFileName = uid + '.' + fileActualExt;
    
                file.mv(path + newFileName, (err) => {
                    if (err) {
                        reject(err);
                    }
                });
                newFileNames.push(newFileName);
                i++;
            }

            resolve(newFileNames);
        });
    }

    static uploadFileToAmazonS3(file) {
        if (file.constructor === Array) {
            file = file[0];
        }

        return new Promise((resolve, rejct) => {
            let s3bucket = new AWS.S3({
                accessKeyId: process.env.AWS_S3_ACCESS_KEY,
                secretAccessKey: process.env.AWS_S3_SECRET_KEY,
                Bucket: process.env.AWS_S3_BUCKET_NAME
            });
    
            s3bucket.createBucket(function () {
                const fileExt = file.name.split('.');
                const fileActualExt = fileExt[fileExt.length - 1];
                const uid = Date.now().toString();
                const newFileName = uid + '.' + fileActualExt;

                let params = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: newFileName,
                    Body: file.data
                };
    
                s3bucket.upload(params, function (err, data) {
                    if (err) {
                        reject(['There was problem by uploading this file']);
                    } else {
                        resolve(data.key);
                    }
                });
            });
        });
    }

    static deleteFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static convertToBase64(path, image) {
        let bitmap = fs.readFileSync(path + image);
        return new Buffer(bitmap).toString('base64');
    }

    static convertFileToName(file) {
        let lastIndex = file.lastIndexOf('.');
        let name = file.substr(0, lastIndex);

        return name;
    }
}

module.exports = FileHandler;
