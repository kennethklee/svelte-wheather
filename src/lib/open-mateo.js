/**
 * Generate cache key
 * @param {number} lat 
 * @param {number} long 
 * @returns {string}
 */
function forecastKey(lat, long) {
    return [lat, long].join()
}
function cityKey(city) {
    return city
}

/**
 * Generate url
 * @param {number} lat 
 * @param {number} long 
 * @returns {string}
 */
function dailyForecastURL(lat, long) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=GMT`
}

/**
 * Generate city search url
 * @param {string} city
 * @returns {string}
 */
function citySearchURL(city) {
    return `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
}

export class OpenMateo {
    /** @typedef {{expires: number, [key: string]: any[]}} Forecast */
    /** @typedef {{expires: number, long: number, lat: number}} Coordinates */
    /** @type {{[key: string]: Promise<Forecast | Coordinates>}} */
    cache = {} // simple cache
    ttl = 30 * 1000 // 30 seconds

    getCache(key) {
        if (key in this.cache && Date.now() < this.cache[key].expires) {
            return this.cache[key]
        }
    }

    /**
     * Forecast
     * @param {number} lat 
     * @param {number} long 
     * @returns {Promise<Forecast>}
     */
    forecastDaily(lat, long) {
        const cacheHit = this.getCache(forecastKey(lat, long))
        if (cacheHit) return cacheHit

        return this.cache[forecastKey(lat, long)] = fetch(dailyForecastURL(lat, long))
            .then(res => res.json())
            .then((data) => ({ ...data.daily, expires: Date.now() + this.ttl }))
    }

    /**
     * 
     * @param {string} city 
     * @returns {Promise<Coordinates>}
     */
    findCity(city) {
        const cacheHit = this.getCache(cityKey(city))
        if (cacheHit) return cacheHit

        return this.cache[cityKey(city)] = fetch(citySearchURL(city))
           .then(res => res.json())
           .then((data) => {
                if (!data.results) throw new Error('No results')
                return {
                    expires: Date.now() + this.ttl,
                    long: data.results[0].longitude,
                    lat: data.results[0].latitude,
                }
            })
    }
}