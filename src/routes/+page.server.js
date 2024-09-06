import { OpenMateo } from '$lib/open-mateo'
const weather = new OpenMateo()

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
}

export const actions = {
    forecast: async function({ request }) {
        const data = await request.formData()
        const city = data.get('city')?.toString() ?? ''

        try {
            const coords = await weather.findCity(city)
            const forecast = await weather.forecastDaily(coords.lat, coords.long)
    
            return { forecast, place: coords.place }
        } catch (error) {
            return { error: error.message }
        }
    },

    forecastByCoords: async function({ request }) {
        const data = await request.formData()
        const lat = Number(data.get('lat')) ?? null
        const long = Number(data.get('long')) ?? null

        if (!lat ||!long) {
            return { error: 'Invalid coordinates' }
        }
        
        try {
            const forecast = await weather.forecastDaily(lat, long)
            return { forecast, place: [lat, long].join(', ') }
        } catch (error) {
            return { error: error.message }
        }
    }
}