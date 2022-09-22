import Scheduler from 'node-schedule'

import getConfig from './getConfig'

const main = () => {
    const config = getConfig()

    Scheduler.scheduleJob(config.timeout, () => {
        console.log("Make a post")
    })
}

// Don't run main if used as a library
if (require.main === module) {
    main();
}