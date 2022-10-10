
import getConfig from "./getConfig"
import { postRandomImage } from "./getImage"
import getTwitter from "./getTwitter"
import { postText } from "./post"

const main = async () => {
    const operator = (process.argv[2] ?? "").toLowerCase()

    switch (operator) {
        case "auth": {
            console.log("Logging you in if you need to")

            await getTwitter()

            break
        }

        case "config": {
            console.log("Printing config")

            console.log(getConfig())

            break
        }

        case "post": {
            console.log("Posting a random image from images/unposted")

            await postRandomImage()

            break
        }

        case "text": {
            const str = "hello twitter :)"

            console.log(`Posting the text '${str}'`)

            await postText(str)

            break
        }

        default: {
            console.log("Use a valid switch:")
            console.log("npm run test <auth|config|post|text>")

            console.log(" - auth: log into twitter if tokens.json doesn't exist")
            console.log(" - config: print the configuration as parsed from the .env file")
            console.log(" - post: post a random image as the bot will every 24 hours")
            console.log(" - text: post the text 'hello twitter :)'")

            break
        }
    }
}

main()