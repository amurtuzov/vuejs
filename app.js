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
				let albums = [];
				response.data.forEach((item) => {
					if(item.userId == id) {
						albums.push(item);
					}
				})
				Vue.set(this.photographers[id - 1], 'albums', albums);
			}.bind(this));
		},
		// filter: function() {
		// 	this.photographers.forEach((item) => {
		// 		item.albums.filter((item) => {

		// 		})
		// 	})
		// }
	},
	mounted() {
		axios.get('https://jsonplaceholder.typicode.com/users')
		.then(function(response) {
			this.photographers = response.data;
			}.bind(this));
	},
// 	computed: {
//   filteredItems: function() {
//     var self = this;
//     return this.items.filter(function(item) {
//       return item.indexOf(self.filter) > -1;
//     });
//   }
// }
})
