import moment from 'moment'
import percentile from 'percentile'

/**
 * @param {array} portCalls - arrival exact time
 * @returns {[{port: string, percentiles: string[]}]} - return an array of obj with port name and calculated percentiles
 */

export default function getPortCallDurationsPercentiles(
  portCalls,
  percentileIndexes
) {
  const portCallsDurationsByPortData = portCalls.reduce((acc, curr) => {
    curr.forEach((portCall) => {
      if (!portCall.isOmitted) {
        const {
          port: { id, name },
          arrival,
          departure,
        } = portCall

        const arrivalTime = moment(arrival)
        const departureTime = moment(departure)
        const portCallDuration = moment
          .duration(departureTime.diff(arrivalTime))
          .asHours()

        const roundedPortCallDuration = Math.round(portCallDuration * 100) / 100

        if (!acc[id]) {
          acc[id] = {
            port: name,
            portCallDurations: [roundedPortCallDuration],
          }
        } else {
          acc[id].portCallDurations.push(roundedPortCallDuration)
        }
        return acc
      }
    })
    return acc
  }, {})

  const portCallDurationsByPort = Object.values(portCallsDurationsByPortData)

  const portCallDurationsByPortPercentiles = portCallDurationsByPort.map(
    (obj) => {
      const { port, portCallDurations } = obj
      const percentiles = percentile(percentileIndexes, portCallDurations)
      const portCallDurationByPortPercentilesRow = { port }

      for (let i = 0; i < percentileIndexes.length; i++) {
        portCallDurationByPortPercentilesRow[percentileIndexes[i]] =
          percentiles[i]
      }

      return portCallDurationByPortPercentilesRow
    }
  )
  return portCallDurationsByPortPercentiles.sort((prev, next) =>
    prev.port > next.port ? 1 : -1
  )
}
