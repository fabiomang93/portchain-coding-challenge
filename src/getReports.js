import getSchedules from './getSchedules'
import getPortCallDurationsPercentiles from './PortCallDurationPercentiles/getPortCallDurationPercentiles'
import getPortRankingForPortCalls from './PortRankingForPortCalls/getPortRankingForPortCalls'
import { getVesselPortCallDelayPercentile } from './VesselPortCallDelayPercentiles/getVesselPortCallDelayPercentile'

export default async function getReports(vesselsUrl, scheduleBaseUrl) {
  try {
    // Get schedules from APIs
    const schedules = await getSchedules(vesselsUrl, scheduleBaseUrl)
    const portCalls = schedules.map((schedule) => schedule.portCalls)

    // Calculate and display the first 5 ports with the most portcalls and the first 5 with the fewest.
    const ranking = getPortRankingForPortCalls(portCalls)
    const firstFive = ranking.slice(0, 5)
    const lastFive = ranking
      .slice(ranking.length - 5, ranking.length)
      .sort((prev, next) => (prev.portCalls > next.portCalls ? -1 : 1))

    console.log('First five ports with the most portcalls')
    console.table(firstFive)
    console.log()
    console.log('First five ports with the fewest portcalls')
    console.table(lastFive)
    console.log()

    // Calculate ,for each port, the percentiles of port call durations: 5th, 20th, 50th, 75th and 90th percentiles.
    const portCallDurationPercentileIndexes = [5, 20, 50, 75, 90]
    const portCallDurationPercentiles = getPortCallDurationsPercentiles(
      portCalls,
      portCallDurationPercentileIndexes
    )
    console.log(
      'The percentiles of port call durations (in Hours): 5th, 20th, 50th, 75th and 90th percentiles'
    )
    console.table(portCallDurationPercentiles)
    console.log()

    // Calculate, for each vessel the 5th, 50th and 80th percentiles for the port call delay when the vessel is 2 days from arrival.
    console.log(
      'For each vessel, calculate the 5th, 50th and 80th percentiles (as Hours) for the port call delay when the vessel is 2 days from arrival.'
    )
    const vesselPortCallDelayPercentileIndexes = [5, 50, 80]
    const vesselPortCallDelayPercentile2Days = schedules.map((schedule) => {
      return getVesselPortCallDelayPercentile(
        schedule,
        2,
        vesselPortCallDelayPercentileIndexes,
        [7, 14]
      )
    })
    console.table(vesselPortCallDelayPercentile2Days)
    console.log()

    // Calculate, for each vessel the 5th, 50th and 80th percentiles for the port call delay when the vessel is 7 days from arrival.
    console.log(
      'For each vessel, calculate the 5th, 50th and 80th percentiles (as Hours) for the port call delay when the vessel is 7 days from arrival.'
    )

    const vesselPortCallDelayPercentile7Days = schedules.map((schedule) => {
      return getVesselPortCallDelayPercentile(
        schedule,
        7,
        vesselPortCallDelayPercentileIndexes,
        [14]
      )
    })
    console.table(vesselPortCallDelayPercentile7Days)
    console.log()

    // Calculate, for each vessel the 5th, 50th and 80th percentiles for the port call delay when the vessel is 14 days from arrival.
    console.log(
      'For each vessel, calculate the 5th, 50th and 80th percentiles (as Hours) for the port call delay when the vessel is 14 days from arrival.'
    )

    const vesselPortCallDelayPercentile14Days = schedules.map((schedule) => {
      return getVesselPortCallDelayPercentile(
        schedule,
        14,
        vesselPortCallDelayPercentileIndexes,
        []
      )
    })
    console.table(vesselPortCallDelayPercentile14Days)
  } catch (error) {
    console.log(error)
  }
}
