import getPortCallDurationPercentiles from './getPortCallDurationPercentiles'
import portCalls from '../fixtures/getPortCallDurationPercentiles'

describe('getPortRankingForPortCalls', () => {
  it('It should correctly calulate the percentiles of port call durations (in Hours): 5th, 20th, 50th, 75th and 90th percentiles', () => {
    const portCallDurationPercentileIndexes = [5, 20, 50, 75, 90]

    const expectedPortCallDurationPercentiles = [
      { 5: 8, 20: 8, 50: 12, 75: 15, 90: 16, port: 'Antwerpen' },
      { 5: 24.83, 20: 24.83, 50: 28.8, 75: 31.8, 90: 35.77, port: 'Djibouti' },
      { 5: 4, 20: 4, 50: 5, 75: 10, 90: 10, port: 'Hamburg' },
    ]

    const portCallDurationPercentiles = getPortCallDurationPercentiles(
      portCalls,
      portCallDurationPercentileIndexes
    )

    expect(portCallDurationPercentiles).toEqual(
      expectedPortCallDurationPercentiles
    )
  })
})
