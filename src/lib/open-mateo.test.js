import { describe, it, expect } from 'vitest'
import { OpenMateo } from './open-mateo.js'

const subject = new OpenMateo()

describe('city search', () => {
    it('should find the coordinates of Frankfurt am Main', async () => {
        const coord = await subject.findCity('Frankfurt am Main')
        expect(coord.lat).toEqual(50.11552)
        expect(coord.long).toEqual(8.68417)
    })
})

describe('daily forecast', () => {
    it('should forecast Frankfurt am Main', async () => {
        // i.e. "daily":{"time":["2024-09-06","2024-09-07","2024-09-08","2024-09-09","2024-09-10","2024-09-11","2024-09-12"],"weather_code":[3,3,3,63,63,61,61],"temperature_2m_max":[30.1,31.9,31.0,21.3,18.0,18.0,15.3],"temperature_2m_min":[18.7,18.0,19.5,15.0,14.0,12.3,10.7]}
        const daily = await subject.forecastDaily(50.11552, 8.68417)
        expect(daily.time).has.length(7)
    })
})
