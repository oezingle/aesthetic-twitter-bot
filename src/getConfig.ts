
import 'dotenv/config'

interface BotConfiguration {
	twitterConfig: {
		appKey: string,
		appSecret: string,
		// accessToken: string,
		// accessSecret: string,
	},

	timeout: string,
}

/**
 * Retrieve an environment variable and throw an error if the variable is unset
 * @param name the name of the variable
 * @returns the value stored in that env var
 */
const getEnv = (name: string): string => {
	const value = process.env[name]

	if (!value)
		throw `Environment Variable "${name}" is unset!`

	return value
}

/**
 * Load the configuration from the environment file
 * 
 * @returns 
 */
const createConfig = (): BotConfiguration => {
	return {
		twitterConfig: {
			appKey: getEnv("TWITTER_BOT_APP_KEY"),
			appSecret: getEnv("TWITTER_BOT_APP_SECRET"),
		},

		timeout: getEnv("TWITTER_BOT_CRONTAB")
	}
}

let config: BotConfiguration

/**
 * Only load the configuration once
 * @returns the bot's configuration
 */
const getConfig = () => {
	if (!config) {
		config = createConfig()
	}

	return config
}

export default getConfig