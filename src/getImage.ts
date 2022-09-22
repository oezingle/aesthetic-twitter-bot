
import fs from 'fs/promises'
import getConfig from './getConfig'
import { postFile } from './post'

// Needs a slash at the end or the whole world ends
const imagesDir = "./images/"

const unpostedDir = imagesDir + "unposted/"
const postedDir = imagesDir + "posted/"

const listImages = () => {
    return fs.readdir(unpostedDir)
        .then((images) => {
            if (images.length === 0)
                throw `No images in ${unpostedDir}`

            return images
        })
}

/**
 * Clean up the image in the filesystem, either deleting or moving it.
 * @param path 
 * @returns 
 */
const setImagePosted = (path: string): Promise<void> => {
    if (getConfig().deletePosted) {
        return fs.rm(path)
    } else {
        const relative = path
            .replace(unpostedDir, "")

        return fs.rename(unpostedDir + relative, postedDir + relative)
    }
}

/**
 * Damn slow function to find an image that hasn't been posted yet
 * @returns the relative path of the new image (doesn't include ./images/ suffix)
 */
export const getImagePath = (): Promise<string> => {
    return listImages()
        .then((images) => {
            const index = Math.floor(Math.random() * images.length)

            return unpostedDir + images[index]
        })
}

/**
 * Pull a random image, post it, and remove it from the unposted directory
 */
export const postRandomImage = () => {
    getImagePath()
        .then(path => {
            return postFile(path)
                .then(() => {
                    console.log("Post Success!")

                    return setImagePosted(path)
                })
                .catch((err) => {
                    console.warn("Post Failed!")

                    console.error(err)
                })
        })
        .catch(err => console.error(err))
}