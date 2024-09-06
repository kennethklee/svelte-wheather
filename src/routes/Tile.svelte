<script>
    const { wmoCode, temp, date, large = false } = $props()

    // Format for week day, i.e. Monday, Tuesday, etc.
    const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: 'long' })
    const weekday = $derived(dateFormatter.format(new Date(date)))

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
        3 : '⛅',
        45: '🌫',
        48: '🌫',
        51: '☁️',
        53 : '☁️',
        55: '☁️',
        61 : '🌧',
        63: '🌧',
        65: '🌧',
        66: '🌧❄️',
        67 : '❄️',
        73 : '❄️',
        96 : '⛈',
    }
</script>

<article class:large={large}>
    <i>{WMO_CODE_TO_CHAR[wmoCode]}</i>
    <div class="title">{temp}°C</div>
    <small>{weekday}</small>
</article>

<style>
    article {
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 5px 5px 20px black;
        text-align: center;
        font-size: 2rem;
    }
    article.large {
        font-size: 3rem;
    }
    i {
        font-size: 3rem;
        font-style: normal;
    }
    .title {
        margin-top: .3em;
        font-weight: bold;
    }
</style>