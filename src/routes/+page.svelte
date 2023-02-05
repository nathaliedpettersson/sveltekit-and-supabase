<script lang="ts">
	import {supabaseClient} from '$lib/supabase';
	import type { PageData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let data: PageData;

	// Declare variable for input
	let newGame: any;
	let submit = false;
    
    let albumName: string;
    let albumPrice: number;
    let albumImg: string;
    let labelId: number;

	// .from and.select and write the same name as the table is called in supabase
	async function getData() {
		const { data, error } = await supabaseClient.from('games').select();
		if (error) throw new Error(error.message);

		return data;
	}

	// .from (table name in supabase) and .insert and throw in values to insert
	// In this case we set the default to "title" which takes text/string as it's value which in this case is the input for newGame
	async function sendData() {
		const { data, error } = await supabaseClient.from('games').insert([{ title: newGame }]);
		if (error) throw new Error(error.message);

		return data;
	}

	async function getAllRecords() {
		const { data, error } = await supabaseClient.from('products').select();
		if (error) throw new Error(error.message);

		return data;
	}

    // we have to define in supabase table that label_id in products should be a foreign key to label table (!!)
    // eq stands for equal to 
    async function getSpecificLabel() {
        const { data, error } = await supabaseClient.from('products').select().eq('label_id', 1);
        if (error) throw new Error(error.message)

        return data
     }

     // Add new album to table 'Products'
     async function addNewAlbum() {
        const { data, error } = await supabaseClient.from('products').insert([{name: albumName, price: albumPrice, image_url: albumImg, label_id: labelId}]);
        if (error) throw new Error(error.message);

        return data;
     }

     // Update price for album called 'testalbum'
     async function updateAlbumPrice() {
        const { data } = await supabaseClient.from('products').update([{price: albumPrice}]).eq('name', 'testalbum');
        return data;
     }

	//  ------------------------------------------------------------------------------------------------------

	let welcomeMsg: string;
	let backgroundImg: string;
	let date: Date;

	async function createRetro() {
        const { data, error } = await supabaseClient.from('retro').insert([{welcome_message: welcomeMsg, background_image: backgroundImg, date: date}]);
        if (error) throw new Error(error.message);

        return data;
     }


	async function getRetro() {
		const { data, error } = await supabaseClient.from('retro').select();
		if (error) throw new Error(error.message);

		return data;
	}

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};

</script>

<main>
	<h1>SvelteKit & Supabase Auth</h1>
	{#if data.session}
		<p>Welcome, {data.session.user.email}</p>
		<form action="/logout" method="POST" use:enhance={submitLogout}>
			<button type="submit" class="btn btn-primary">Logout</button>
		</form>
	{:else}
		<p>Let's learn how to register and login users!</p>
		<div class="auth-buttons">
			<a href="/login" class="btn btn-primary">Login</a>
			<a href="/register" class="btn btn-secondary">Register</a>
		</div>
	{/if}
</main>

<div class="line-divider"></div>

<h1>My favorite games</h1>

<!-- Get games from database table 'games'-->
{#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each data as game}
		<li>{game.title}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}

<br>
<!-- Send newGame to database and add to table 'games' -->
<form on:submit|preventDefault={() => (submit = true)}>
	<input type="text" bind:value={newGame} />
	<input type="submit" value="Submit" on:click={() => (submit = false)} />
</form>
{#if submit}
	{#await sendData()}
		<p>Sending data...</p>
	{:then data}
		<p>Successfully sent data.</p>
	{:catch error}
		<p>Something went wrong while sending the data:</p>
		<pre>{error}</pre>
	{/await}
{/if}

<h1>Get all records</h1>

<!-- Get all albums from table 'products' -->
{#await getAllRecords()}
	<p>Fetching your records...</p>
{:then data}
	{#each data as record}
		<li class="record-list">{record.name}</li>
		<img src={record.image_url} alt="Record" />
        <p>Records label id is: {record.label_id}</p>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}

<!-- Get ONLY albums with a labelid of value 1 -->
<h1>Get only records with the label_id of 1</h1>
{#await getSpecificLabel()}
	<p>Fetching your records...</p>
{:then data}
	{#each data as recordbylabel}
		<li>{recordbylabel.name} label_id: {recordbylabel.label_id}</li>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}

<br>
<br>

<h2>Add new album to table 'products'</h2>

<!-- Add new album to table 'products' -->
<form on:submit|preventDefault={() => (submit = true)}>
    <input type="text" placeholder="Album name" bind:value={albumName}/>
    <input type="number" placeholder="Price" bind:value={albumPrice}/>
    <input type="text" placeholder="Img url" bind:value={albumImg}/>
    <input type="number" placeholder="Label_id" bind:value={labelId}/>
    <input type="submit" value="Add new album" on:click={() => (submit = false)} />
</form>
{#if submit}
	{#await addNewAlbum()}
		<p>Sending data...</p>
	{:then data}
		<p>Successfully sent data.</p>
	{:catch error}
		<p>Something went wrong while sending the data:</p>
		<pre>{error}</pre>
	{/await}
{/if}

<h3>Update price for album called 'testalbum'</h3>

<!-- Update price for album called 'testalbum' -->
<form on:submit|preventDefault={() => (submit = true)}>
    <input type="number" placeholder="Update price" bind:value={albumPrice} />
    <input type="submit" value="Update album price" on:click={() => (submit = false)} />
</form>
{#if submit}
	{#await updateAlbumPrice()}
		<p>Sending data...</p>
	{:then data}
		<p>Successfully sent data.</p>
	{:catch error}
		<p>Something went wrong while sending the data:</p>
		<pre>{error}</pre>
	{/await}
{/if}

<form on:submit|preventDefault={() => (submit = true)}>
	<input type="text" placeholder="Welcome message" bind:value={welcomeMsg}/>
	<input type="text" placeholder="Background image" bind:value={backgroundImg}/>
	<input type="date" placeholder="Todays date" bind:value={date}/>
	<input type="submit" value="Create retro" on:click={() => (submit = false)}/>
</form>
{#if submit}
	{#await createRetro()}
		<p>Sending data...</p>
	{:then data}
		<p>Successfully sent data.</p>
	{:catch error}
		<p>Something went wrong while sending the data:</p>
		<pre>{error}</pre>
	{/await}
{/if}

{#await getRetro()}
	<p>Fetching your retro...</p>
{:then data}
	{#each data as retro}
		<h1>{retro.welcome_message}</h1>
		<img src={retro.background_image} alt="Retro" />
        <p>Day of retro: {retro.date}</p>
	{/each}
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}



<style>
	.record-list {
		list-style-type: none;
		color: hotpink;
	}

	img {
		width: 20vw;
		height: 25vh;
	}

	.line-divider {
		margin-top: 2rem;
		border: 5px solid blue;
	}

</style>
