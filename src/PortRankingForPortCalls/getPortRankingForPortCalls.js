/**
 * @param {array} portCalls - contains the port calls for all the vessels
 * @returns {array} - @returns {[{port: string, portCalls: string}] - return an array of obj with port name and portCalls
 */

export default function getPortRankingForPortCalls(portCalls) {
  const dataGroupedByPortId = portCalls.reduce((acc, curr) => {
    curr.forEach((portCall) => {
      if (!portCall.isOmitted) {
        const {
          port: { id, name },
        } = portCall
        if (!acc[id]) {
          acc[id] = {
            portCalls: 1,
            port: name,
          }
        } else {
          acc[id].portCalls += 1
        }
      }
    })
    return acc
  }, {})
  const portCallData = Object.values(dataGroupedByPortId)
  const sortedPortCallData = portCallData.sort((prev, next) =>
    prev.portCalls > next.portCalls ? -1 : 1
  )
  return sortedPortCallData
}
