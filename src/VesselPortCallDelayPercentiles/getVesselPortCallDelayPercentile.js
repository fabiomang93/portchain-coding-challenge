import moment from 'moment'
import percentile from 'percentile'

/**
 * @param {string} arrivalTime - arrival exact time
 * @param {array} updates - the port calls log entries
 * @param {*} requestedDaysFromArrival - days from arrival to be searched
 * @param {*} fallbackDays - days from arrivals search fallbacks
 * @returns {(number | undefined)} - position of update that match the request
 */
export function getPortCallUpdatePosition(
  arrivalTime,
  updates,
  requestedDaysFromArrival,
  fallbackDays = []
) {
  let result
  for (let i = 0; i < updates.length; i++) {
    if (result) {
      break
    }
    const position = updates.length - 1 - i
    const update = updates[position]

    if (update.updatedField === 'arrival') {
      const calculateDaysFromArrival = Math.abs(
        moment
          .duration(moment(arrivalTime).diff(moment(update.createdDate)))
          .asDays()
      )

      const daysFromArrivalToTest = [requestedDaysFromArrival, ...fallbackDays]

      for (let y = 0; y < daysFromArrivalToTest.length; y++) {
        if (
          calculateDaysFromArrival >= daysFromArrivalToTest[y] &&
          calculateDaysFromArrival < daysFromArrivalToTest[y] + 1
        ) {
          result = position
          break
        }
      }
    }
  }
  return result
}

/**
 *
 * @param {string} schedule - arrival exact time
 * @param {*} requestedDaysFromArrival - days from arrival to be searched
 * @param {*} percentileIndexes - indexes of percentile to be calculated
 * @param {*} fallbackDays - days from arrivals search fallbacks
 * @returns {{vessel: string, percentiles: string[]}} - return an object with vessel name and calculated percentiles
 */
export function getVesselPortCallDelayPercentile(
  schedule,
  requestedDaysFromArrival,
  percentileIndexes,
  fallbackDays = []
) {
  const delays = []

  schedule.portCalls.forEach((portCallsObject) => {
    const updatePosition = getPortCallUpdatePosition(
      portCallsObject.arrival,
      portCallsObject.logEntries,
      requestedDaysFromArrival,
      fallbackDays
    )

    if (updatePosition !== undefined) {
      const delay = Math.abs(
        moment
          .duration(
            moment(portCallsObject.logEntries[updatePosition].arrival).diff(
              moment(portCallsObject.arrival)
            )
          )
          .asHours()
      )
      delays.push(Math.round(delay * 100) / 100)
    } else {
      // console.error('Not found update that matches requirements')
    }
  })

  const vessel = schedule.vessel.name
  const percentiles = percentile(percentileIndexes, delays)
  const vesselPortCallDelaysPercentilesRow = { vessel }

  for (let i = 0; i < percentileIndexes.length; i++) {
    vesselPortCallDelaysPercentilesRow[percentileIndexes[i]] = percentiles[i]
  }

  return vesselPortCallDelaysPercentilesRow
}
