import cloudinary from 'cloudinary';
import { cloudinaryConfig } from './config'
import fs from 'fs'

cloudinary.v2.config(cloudinaryConfig)

export const pathCloudinary = (pathImage) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(pathImage, {}, function(err, result) {
            if (result.secure_url) {
                resolve(result.secure_url)
            } else {
                reject(new Error('Ha ocurrido un error con Cloudinary ' + err))
            }
        })
    })
}