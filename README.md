# Portchain Coding Challenge

A coding challenge to assest development skills.

## Getting Started

Clone repository:

```
git@github.com:fabiomangano/portchain-coding-challenge.git
```

### Prerequisites

To run the project you need [node](https://nodejs.org/it/).

## Running project

```
cd ./portchain-coding-challenge
nvm use
npm i
npm start
```

## Excecute Test:

```
npm test
```

## Notes

The project consist of five function:

- PortCallDurationPercentiles: calculates the percentiles of port call durations (in Hours): 5th, 20th, 50th, 75th and 90th percentiles.

- PortRankingForPortCalls: calculates first five ports with the most portcalls and first five with the fewest.

- VesselPortCallDelayPercentiles: calculate the 5th, 50th and 80th percentiles (as Hours) for the port call delay when the vessel is 2, 7, 14 days from arrival.

- GetSchedules: import the schedules for all vessels from the provided APIs

- GetReports: run all the previous functions to generate a few views for the requested stats

N.B:

- For the vessel 'EMPIRE' it wasn't possible to calculate the percentiles for the port delay when the vessel is 7 days from arrival
- For the vessel 'EMPIRE' and AL MASHRAB' it wasn't possibile to calculate the percentiles for the port delay when the vessel is 14 days from arrival

This happens because:

- in the first case, there aren't updates available 7 and 14 days before the arrival (to use as fallback)
- in the second case, there aren't updates available 14 days before the arrival

## Built With

- [Node.js](https://nodejs.org/it/) - Open-source, cross-platform, JavaScript runtime environment.

## Author

- **Fabio Mangano**
