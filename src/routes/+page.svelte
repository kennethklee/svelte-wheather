<script>
	import { enhance } from '$app/forms'
	import { tick } from 'svelte';
	import Forecast from './Forecast.svelte'
	import { browser } from '$app/environment';

    let { form } = $props()
    let lat = $state()
    let long = $state()
    let isFahrenheit = $state(false)
    let geoLocateEl

    function geoLocate(ev) {
        ev.preventDefault()

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                lat = position.coords.latitude
                long = position.coords.longitude

                await tick()
                document.forms[0].requestSubmit(geoLocateEl)
            })
        } else {
            alert('Geolocation is not supported by this browser.')
        }
    }
</script>

<main class="container">
    <h1>Wheater Forecast</h1>

    <section>
        <form method="POST" action="?/forecast" use:enhance>
            <div>
                <input type="text" name="city" placeholder="Enter city name" aria-invalid={form?.error && 'true'}>
                {#if form?.error}
                    <small>{form.error}</small>
                {/if}
            </div>
            <input type="hidden" name="lat" bind:value={lat} />
            <input type="hidden" name="long" bind:value={long} />

            <div class="grid">
                {#if browser && navigator.geolocation}
                    <button
                        bind:this={geoLocateEl}
                        type="submit"
                        formaction="?/forecastByCoords"
                        class="secondary"
                        onclick={geoLocate}
                    >Geo Locate</button>
                {/if}
                <button type="submit" class="primary">Forecast</button>
            </div>
        </form>
    </section>

    <section>
        {#if form?.forecast}
            <title>{form.place}</title>
            <fieldset>
                <legend>
                    <label style="float: right;"><input type="checkbox" bind:checked={isFahrenheit}>°F</label>
                    <span>{form.place}</span>
                </legend>

                <Forecast
                    large
                    fahrenheit={isFahrenheit}
                    wmoCode={form.forecast.weather_code[0]}
                    temp={form.forecast.temperature_2m_max[0]}
                    date={form.forecast.time[0]}
                />
                <section class="grid">
                    {#each form.forecast.time.slice(1) as time, index}
                        {@const i = index + 1}
                        <Forecast
                            fahrenheit={isFahrenheit}
                            wmoCode={form.forecast.weather_code[i]}
                            temp={form.forecast.temperature_2m_max[i]}
                            date={form.forecast.time[i]}
                        />
                    {/each}
                </section>
            </fieldset>
        {/if}
    </section>
</main>

<style>
    legend {
        width: 100%;
    }
</style>