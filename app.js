var app = new Vue({
	el: '#app',
	data: {
		photographers: []
	},
	methods: {
		getData: function(url){
			return axios.get(url)
		},
		getAlbums: function(id) {
			let url = 'https://jsonplaceholder.typicode.com/albums/?user=' + id;
			this.getData(url).then(function(response) {
				Vue.set(this.photographers[id - 1], 'albums', response.data);
			}.bind(this));
		},
	},
	mounted() {
		axios.get('https://jsonplaceholder.typicode.com/users')
		.then(function(response) {
			this.photographers = response.data;
			}.bind(this));
	}
})