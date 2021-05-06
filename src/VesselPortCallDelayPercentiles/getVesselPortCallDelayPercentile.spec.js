import {
  getPortCallUpdatePosition,
  getVesselPortCallDelayPercentile,
} from './getVesselPortCallDelayPercentile'
import scheduleFixture from '../fixtures/getVesselPortCallDelayPercentiles'

describe('getVesselPortCallDelayPercentile', () => {
  it.each([[scheduleFixture, 2, [7, 14], [5, 50, 80], [0.3, 2.8, 4.3]]])(
    'should return the proper the %th percentile related to a given vessel',
    (
      schedule,
      requestedDaysFromArrival,
      fallbackDays,
      percentileIndexes,
      resultPercentiles
    ) => {
      expect(
        getVesselPortCallDelayPercentile(
          schedule,
          requestedDaysFromArrival,
          percentileIndexes,
          fallbackDays
        )
      ).toEqual({
        [percentileIndexes[0]]: resultPercentiles[0],
        [percentileIndexes[1]]: resultPercentiles[1],
        [percentileIndexes[2]]: resultPercentiles[2],
        vessel: schedule.vessel.name,
      })
    }
  )
})

describe('getPortCallUpdatePosition', () => {
  it.each([
    [
      '2019-03-15T13:00:00+00:00',
      [
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T10:00:00+00:00',
          createdDate: '2019-03-13T12:59:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T13:00:00+00:00',
          createdDate: '2019-03-15T13:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
      ],
      2,
      [7, 14],
      1,
    ],
    // Case 2
    [
      '2019-03-15T13:00:00+00:00',
      [
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T18:00:00+00:00',
          createdDate: '2019-03-01T00:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T13:00:00+00:00',
          createdDate: '2019-03-15T13:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
      ],
      2,
      [7, 14],
      0,
    ],
    // Case 3
    [
      '2019-03-15T13:00:00+00:00',
      [
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T18:00:00+00:00',
          createdDate: '2019-03-01T00:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T10:00:00+00:00',
          createdDate: '2019-03-13T12:59:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T13:00:00+00:00',
          createdDate: '2019-03-15T13:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
      ],
      7,
      [14],
      0,
    ],
    // Case 4
    [
      '2019-03-15T13:00:00+00:00',
      [
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T18:00:00+00:00',
          createdDate: '2019-03-01T00:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T10:00:00+00:00',
          createdDate: '2019-03-13T12:59:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T13:00:00+00:00',
          createdDate: '2019-03-15T13:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
      ],
      14,
      undefined,
      0,
    ],
    // Case 4
    [
      '2019-03-15T13:00:00+00:00',
      [
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T18:00:00+00:00',
          createdDate: '2019-03-08T00:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T10:00:00+00:00',
          createdDate: '2019-03-13T12:59:00+00:00',
        },
        {
          updatedField: 'departure',
        },
        {
          updatedField: 'arrival',
          arrival: '2019-03-15T13:00:00+00:00',
          createdDate: '2019-03-15T13:00:00+00:00',
        },
        {
          updatedField: 'departure',
        },
      ],
      14,
      undefined,
      undefined,
    ],
  ])(
    'should return the proper update position according to the criteria',
    (arrivalTime, updates, daysFromArrival, fallbackDays, resultPosition) => {
      expect(
        getPortCallUpdatePosition(
          arrivalTime,
          updates,
          daysFromArrival,
          fallbackDays
        )
      ).toEqual(resultPosition)
    }
  )
})
