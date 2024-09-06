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
    
            return { forecast, city }
        } catch (error) {
            return { error: error.message }
        }
    }
}