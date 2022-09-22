import Scheduler from 'node-schedule'

import getConfig from './getConfig'
import { postRandomImage } from './getImage'

const main = () => {
    console.log("Started the random image post bot by @tortellinifan2")

    const config = getConfig()
    
    Scheduler.scheduleJob(config.timeout, () => {
        postRandomImage()
    })
}

// Don't run main if used as a library
if (require.main === module) {
    main();
}