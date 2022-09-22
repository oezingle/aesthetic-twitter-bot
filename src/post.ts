
import getTwitter from "./getTwitter";

import fs from 'fs/promises'
import pathlib from 'path'
import mime from 'mime'

/** 
 * Upload a Buffered image file to twitter
 */
export const postFileBuffer = async (buffer: Buffer, mimeType: string) => {
    const client = await getTwitter()

    const media_id = await client.v1.uploadMedia(buffer, { mimeType })

    return client.v1.tweet("", {
        media_ids: [media_id]
    })
}

/**
 * Load a file, grab its mimetype, and upload that to twitter
 */
export const postFile = async (path: string) => {
    const ext = pathlib.extname(path)

    const mimeType = mime.getType(ext)

    if (!mimeType)
        throw `No mimeType found for extension ${ext}`

    return fs.readFile(path)
        .then(buffer => postFileBuffer(buffer, mimeType))
}

/** 
 * Upload a string to twitter
 */
export const postText = async (text: string) => {
    const client = await getTwitter()

    return await client.v1.tweet(text)
}
