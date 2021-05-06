import axios from 'axios'

/**
 * @param {string} vesselsUrl - url to get all vessell ids
 * @param {string} scheduleUrl - url to get all schedule urls
 * @returns {[schedule]} - array of schedules
 */

export default async function getSchedules(vesselsUrl, scheduleUrl) {
  const vessels = (await axios.get(vesselsUrl)).data
  return Promise.all(
    vessels.map(
      async ({ imo }) => (await axios.get(`${scheduleUrl}${imo}`)).data
    )
  )
}
