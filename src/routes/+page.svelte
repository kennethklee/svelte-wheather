<script>
	import { enhance } from '$app/forms'
	import Tile from './Tile.svelte'

    let { form } = $props()
</script>

<main class="container">
    <h1>Wheater Forecast</h1>

    <form method="POST" action="?/forecast" use:enhance>
        <div>
            <input type="text" name="city" placeholder="Enter city name" aria-invalid={form?.error && 'true'}>
            <button>Forecast</button>
        </div>
        {#if form?.error}
            <small>{form.error}</small>
        {/if}
    </form>
    
    {#if form?.forecast}
        <title>{form.city}</title>
        <fieldset>
            <legend>{form.city}</legend>
            <Tile
                large
                wmoCode={form.forecast.weather_code[0]}
                temp={form.forecast.temperature_2m_max[0]}
                date={form.forecast.time[0]}
            />
            <section class="grid">
                {#each form.forecast.time.slice(1) as time, index}
                    {@const i = index + 1}
                    <Tile
                        wmoCode={form.forecast.weather_code[i]}
                        temp={form.forecast.temperature_2m_max[i]}
                        date={form.forecast.time[i]}
                    />
                {/each}
            </section>
        </fieldset>
    {/if}
</main>