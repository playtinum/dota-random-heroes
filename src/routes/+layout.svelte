<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<div class="app">
<nav>
	<a href="/">Randomizer</a>
	<a href="/settings">Settings</a>
</nav>
<main>
	<slot />
</main>
<footer>
	<small
		>&copy; <a href="https://github.com/playtinum">playtinum</a> {currentYear} |
		<a href="/imprint">Impressum</a></small
	>
</footer>
</div>

<style>
	.app {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: calc(100vh - 2rem);
	}

	main {
		overflow: auto;
	}
</style>

