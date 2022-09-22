
import readline from "readline";
import TwitterApi from 'twitter-api-v2'
import fs from 'fs/promises'

import getConfig from "./getConfig";

const tokensPath = "./tokens.json"

// TODO 403 errors out the wazoo

interface AuthTokens {
    accessToken: string,
    accessSecret: string,
}

const getPin = (): Promise<string> => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    return new Promise((resolve, reject) => {
        rl.question('Enter the PIN from the login page (Ctrl+C to cancel): ', ans => {
            // TODO verify valid pin, keep retrying

            rl.close();

            resolve(ans)
        });
    })
}

const getNewAuth = async (): Promise<AuthTokens> => {
    const tempClient = new TwitterApi(getConfig().twitterConfig)

    const authLink = await tempClient.generateAuthLink()

    const client = new TwitterApi({
        ...getConfig().twitterConfig,
        accessToken: authLink.oauth_token,
        accessSecret: authLink.oauth_token_secret
    })

    console.log("Authenticate your twitter account using this link")
    console.log(authLink.url)

    console.log()

    const pin = await getPin()
        .then(pin => pin.replace(/[^0-9]/g, ""))

    const { accessToken, accessSecret } = await client.login(pin)

    return { accessToken, accessSecret }
}

/**
 * Store tokens in the filesystem
 * 
 * @param tokens auth tokens
 * @returns tokens for convenience
 */
const storeAuth = (tokens: AuthTokens) => {
    return fs.writeFile(tokensPath, JSON.stringify(tokens))
        .then(() => tokens)
}

const getAuth = () => {
    return fs.readFile(tokensPath)
        .then(fileContents => {
            return JSON.parse(fileContents.toString())
        })
        .catch(async () => {
            return getNewAuth()
                .then(tokens => {
                    return storeAuth(tokens)
                })
        })
}

/**
 * Create a new twitter client
 * @returns a twitter client using the supplied environment variable configuration
 */
const createTwitter = async (): Promise<TwitterApi> => {
    const twitterConfig = getConfig().twitterConfig

    const tokens = await getAuth()

    const client = new TwitterApi({
        ...twitterConfig,
        ...tokens
    })

    return client
}

let client: TwitterApi

/**
 * Return the single instance of the twitter client
 */
const getTwitter = async (): Promise<TwitterApi> => {
    if (!client)
        client = await createTwitter()

    return client
}

export default getTwitter