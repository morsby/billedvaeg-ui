<script>
	export let href = '';
</script>

{#if href}
	<a download="billedvaeg.pdf" {href}>Download</a>

	<div id="pdf">
		<object data={href} type="application/pdf" title="pdf-preview">
			<iframe src={href} title="pdf-preview">
				<p>This browser does not support PDF!</p>
			</iframe>
		</object>
	</div>
{/if}

<style>
	#pdf {
		flex: 1;
	}

	iframe,
	object {
		width: 100%;
		height: 80vh;
	}
</style>
