
# Random Image Twitter Bot

Created for [@avanti444](https://twitter.com/avanti444) to automate the posting of aesthetically pleasing shit. 

## Features
 - Posts up to once a minute
 - Moves or deletes images that have already been posted (no repeats!)
 - Somewhat human readable errors

## Installing

### Dependencies
`node` - V17 or so
`npm` - whatever as long as the packages still install

### Setup
Make the folders for your images
```
mkdir -p images/unposted images/posted
```

Copy the example env vars file
```sh
cp .example.env .env
```
Open `.env` in your favorite text editor and be ready to input the keys we're about to get from Twitter.

### Setting up the Twitter side
 - Go the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
 - Click "Projects and Apps" (left pane)
 - Click "Add App"
    - Set the Environment to "Production"
    - Give it a snazzy name
    - Copy the "API Key" to TWITTER_BOT_APP_KEY in `.env`
    - Copy the "API Key Secret" to TWITTER_BOT_APP_SECRET in `.env`
 - Click "App Settings"
 - In "User Authentication Settings" (Below "App Details"), click "Set up"
    - Set the App Permissions to "Read and write"
    - Set the Type of App to "Web App, Automated App, or Bot"
    - Set the Callback URI to "https://localhost" (we don't use this)
    - Set the Website URL to your own twitter, or your blog, or anything really
    - Click "Save"

Install the dependencies:
```bash
npm install
```

Now, the Twitter setup is done. You just have to build the project, and log in.
```bash
npm run test auth # prompts you to log in if you haven't
```

### Running
Running the bot is easy! Just `cd` to the project directory and run `node build/index.js`. Photos in `images/unposted/` will be posted by the bot

## Caveats
 - Only pictures
 - Pictures saved with the wrong filetype won't work (eg, JPEG file called "image.png")
 - The bot skips posts while there aren't any images left to post

# TODO test using brand new twitter app / no Elevated access