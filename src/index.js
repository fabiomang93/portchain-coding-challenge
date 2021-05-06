import getReports from './getReports'
;(async () => {
  const VESSELS_URL =
    'https://import-coding-challenge-api.portchain.com/api/v2/vessels'
  const SCHEDULE_BASE_URL =
    'https://import-coding-challenge-api.portchain.com/api/v2/schedule/'

  await getReports(VESSELS_URL, SCHEDULE_BASE_URL)
})()
