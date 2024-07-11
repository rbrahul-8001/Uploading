const File = require("../models/Files")
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log(file)

        let path = __dirname + "/file/" + `${file.name.split('.')[0]}` + `.${file.name.split('.')[1]}`;
        console.log(path)

        file.mv(path, (err) => {
            console.log(err)
        })

        res.json({
            success: true,
            msg: "File Uploaded succesfully"
        })

    } catch (error) {
        console.log(error)
    }
}

function isFileTypeSupported(filetype, supportedType) {
    return supportedType.includes(filetype)
}

async function uploadFileToCloudinary(file, folder, quality = 0) {

    const options = { folder }
    options.resource_type = "auto";

    if (quality) {
        options.quality = quality;
    }
    
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async (req, res) => {

    try {

        const { name, tags, email } = req.body;
        const file = req.files.imageFile;

        const supportedType = ["jpg", "jpeg", "png"];
        const filetype = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(filetype, supportedType)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        const response = await uploadFileToCloudinary(file, "RahulData");

        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })

    }

    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });

    }
}


exports.videoUpload = async (req, res) => {

    try {

        const { name, tags, email } = req.body;
        const file = req.files.videoFile;

        const supportedType = ["mp4", "mov"];
        const filetype = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(filetype, supportedType)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        const response = await uploadFileToCloudinary(file, "RahulData");

        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video Successfully Uploaded',
        })

    }

    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });

    }
}

exports.imageSizeReducer = async (req, res) => {

    try {
        const { name, tags, email } = req.body;
        const file = req.files.imageFile;

        const supportedType = ["jpg", "jpeg", "png"];
        const filetype = file.name.split('.')[1].toLowerCase()

        if (!isFileTypeSupported(filetype, supportedType)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        const response = await uploadFileToCloudinary(file, "RahulData", 30);

        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })

    }

    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}