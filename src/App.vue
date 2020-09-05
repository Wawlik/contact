<template>
	<div id="app" class="uk-container uk-margin">
		<h3 class="uk-text-left">
			<router-link class="uk-link-reset uk-grid uk-grid-collapse uk-flex-middle" to="/list">
				<span uk-icon="home" class="cursor-pointer uk-margin-small-right"></span>
				<span>Главная</span>
			</router-link>
		</h3>
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App"
};
</script>


<!-- UIkit JS -->
<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.cursor-pointer {
	cursor: pointer;
}
.text-danger {
	color: red;
}
.text-success {
	color: #09f;
}
.contact--done {
	text-decoration: line-through;
	color: #999;
}
.cnt-container--revert-icon {
	cursor: pointer;
	color: #09f;
}
.cnt-container--delete-icon {
	cursor: pointer;
	color: red;
}
.cnt--checkbox {
	width: 17px;
	margin-right: 10px;
}
#new-contact--cnt {
	padding-right: 75px !important;
}
</style>
