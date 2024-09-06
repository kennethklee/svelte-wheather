<script>
    const { wmoCode, temp, date, large = false, fahrenheit = false } = $props()

    /**
    WMO Weather interpretation codes (WW)
    Code	Description
    0	Clear sky
    1, 2, 3	Mainly clear, partly cloudy, and overcast
    45, 48	Fog and depositing rime fog
    51, 53, 55	Drizzle: Light, moderate, and dense intensity
    56, 57	Freezing Drizzle: Light and dense intensity
    61, 63, 65	Rain: Slight, moderate and heavy intensity
    66, 67	Freezing Rain: Light and heavy intensity
    71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    77	Snow grains
    80, 81, 82	Rain showers: Slight, moderate, and violent
    85, 86	Snow showers slight and heavy
    95 *	Thunderstorm: Slight or moderate
    96, 99 *	Thunderstorm with slight and heavy hail
    */
    const WMO_CODE_TO_CHAR = {
        0 : '☀️',
        1 : '🌤',
        2 : '⛅',
        3 : '☁️☁️',
        45: '🌫',
        48: '🌫',
        51: '☁️',
        53: '☁️',
        55: '☁️',
        56: '❄️☁️',
        57: '❄️☁️',
        61: '🌧',
        63: '🌧',
        65: '🌧',
        66: '❄️🌧',
        67: '❄️🌧',
        71: '❄️',
        73: '❄️',
        75: '❄️',
        95: '🌩',
        96: '⛈',
        99: '⛈',
    }

    // Format for week day, i.e. Monday, Tuesday, etc.
    const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: 'long' })
    const weekday = $derived(dateFormatter.format(new Date(date)))

    function tempText(temp, isFahrenheit) {
        const temperature = (isFahrenheit ? (temp  *  9 / 5) + 32 : temp).toFixed(1)
        return `${temperature}°${isFahrenheit ? 'F' : 'C'}`
    }
</script>

<article class:large={large}>
    <i>{WMO_CODE_TO_CHAR[wmoCode]}</i>
    <div class="title">{tempText(temp, fahrenheit)}</div>
    <small>{weekday}</small>
</article>

<style>
    article {
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 5px 5px 20px black;
        text-align: center;
        font-size: 1rem;
    }
    article.large {
        font-size: 2rem;
    }
    i {
        font-size: 1.5rem;
        font-style: normal;
    }
    .title {
        margin-top: .3em;
        font-weight: bold;
        white-space: nowrap;
    }
</style>