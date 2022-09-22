
import getTwitter from "./getTwitter";


/** 
 * Upload a Buffered image file to twitter
 * 
 * TODO skip the base64 step
 * 
 */
export const postImage = async (buffer: Buffer, mimeType: string) => {
    const client = await getTwitter()

    const media_id = await client.v1.uploadMedia(buffer, { mimeType })

    return client.v1.tweet("", {
        media_ids: [ media_id ]
    })
}


/** 
 * Upload a string to twitter
 */
export const postText = async (text: string) => {
    const client = await getTwitter()

    return await client.v1.tweet(text)
}
