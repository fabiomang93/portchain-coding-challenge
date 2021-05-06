import getPortRankingForPortCalls from './getPortRankingForPortCalls'
import portCalls from '../fixtures/getPortRankingForPortCalls'

describe('getPortRankingForPortCalls', () => {
  it('should calculate the correct ports ranking by portcalls for the provived data', () => {
    const expectedRanking = [
      { portCalls: 3, port: 'Tokyo' },
      { portCalls: 2, port: 'Antwerpen' },
      { portCalls: 2, port: 'Hamburg' },
      { portCalls: 2, port: 'Casablanca' },
      { portCalls: 2, port: 'Tanger Med' },
      { portCalls: 2, port: 'Piraeus' },
      { portCalls: 1, port: 'Tema' },
      { portCalls: 1, port: 'Abidjan' },
      { portCalls: 1, port: 'Salerno' },
      { portCalls: 1, port: 'Alexandria' },
      { portCalls: 1, port: 'Dumyat (Damietta)' },
      { portCalls: 1, port: 'Beirut' },
      { portCalls: 1, port: 'Iskenderun' },
      { portCalls: 1, port: 'Mersin' },
      { portCalls: 1, port: 'Aliaga' },
      { portCalls: 1, port: 'Nagoya, Aichi' },
      { portCalls: 1, port: 'Kobe' },
      { portCalls: 1, port: 'Sendai, Miyagi' },
      { portCalls: 1, port: 'Los Angeles' },
      { portCalls: 1, port: 'Oakland' },
    ]
    const ranking = getPortRankingForPortCalls(portCalls)
    expect(ranking).toEqual(expectedRanking)
  })
})
