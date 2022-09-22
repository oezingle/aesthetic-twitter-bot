
import getConfig from "./getConfig"
import { postRandomImage } from "./getImage"
import { postText } from "./post"

const main = async () => {
    const operator = process.argv[2].toLowerCase()

    switch (operator) {
        case "config": {
            console.log("Printing config")

            console.log(getConfig())

            break
        }

        case "post": {
            console.log("Posting a random image from images/unposted")

            postRandomImage()

            break
        }

        case "text": {
            const str = "hello twitter :)"

            console.log(`Posting the text '${str}'`)

            postText(str)

            break
        }

        default: {
            console.log("Use a valid switch:")
            console.log("npm run test <config|post|text>")

            console.log(" - post: post a random image as the bot will every 24 hours")
            console.log(" - text: post the text 'hello twitter :)'")
            console.log(" - config: print the configuration as parsed from the .env file")

            break
        }
    }
}

main()