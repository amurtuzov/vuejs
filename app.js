var app = new Vue({
	el: '#app',
	data: {
		showModal: false,
		photographers: [],
		filter: '',
		showPreloader: true,
		photos: [],
		lazyLoadPhotos: [],
		photosCounter: 10             ПОФИКСИТЬ БАГ В ЦИКЛЕ FOR
	},
	methods: {
		getData: function(url){
			return axios.get(url)
		},
		// getPhotos: function(id) {
		// 	let url ="https://jsonplaceholder.typicode.com/photos/?albumId=" + id;
		// 	this.getData(url).then(function(response) {
		// 		this.photos = response.data;
		// 		this.showModal = true;
		// 	}.bind(this));
		// },
		getPhotos: function(id) {
			let url ="https://jsonplaceholder.typicode.com/photos/?albumId=" + id;
			this.getData(url).then(function(response) {
				this.photos = response.data;
				// нужно создавать промежуточный массив и его присваивать в this.photos
				// нужно сверять айдишники фоток перед пушем.
					this.photos.forEach((photo) => {
						if(this.lazyLoadPhotos.length != this.photosCounter) {
							this.lazyLoadPhotos.push(photo)
						}
					});
					this.showModal = true;
			}.bind(this));
		},
		getMorePhotos: function() {
			this.photosCounter = this.photosCounter + 10;
			// this.photos.forEach(function(photo) {
			// 	this.lazyLoadPhotos.forEach(function(lazyPhoto) {
			// 		if(this.lazyLoadPhotos.length != this.photosCounter) {
			// 			if(photo.id != lazyPhoto.id) {
			// 				console.log(photo.id);
			// 				console.log(lazyPhoto.id);
			// 			this.lazyLoadPhotos.push(photo)
			// 			}
			// 		}
			// 	}.bind(this))
			// }.bind(this))
			for (var i = 0; i < this.photosCounter; i++) {
			if (this.lazyLoadPhotos.indexOf(this.photos[i]) === -1) {
			this.lazyLoadPhotos.push(this.photos[i]);
  }
}
		},
		filteredList: function(array) {
			if(array != null) {
				let filter = this.filter;
				return array.filter(function (elem) {
					if(filter === '') return true;
					else return elem.title.indexOf(filter) > -1;
				})
			}
		},
		closeModal: function() {
			this.showModal = false;
			this.photosCounter = 10;
			// this.lazyLoadPhotos = this.lazyLoadPhotos.slice(this.lazyLoadPhotos.length, 1);
			while(this.lazyLoadPhotos.length > 0) {this.lazyLoadPhotos.pop();}
		}
	},
	mounted() {
		this.showPreloader = true;
		Promise.all([axios.get('https://jsonplaceholder.typicode.com/users'), axios.get('https://jsonplaceholder.typicode.com/albums')])
		.then(function(response){
			this.photographers = response[0].data;
			this.photographers.forEach((photographer) => {
				let albums = []
				Vue.set(photographer, 'expanded', false);
				response[1].data.forEach((album) => {
					if(photographer.id == album.userId) {
						albums.push(album)
						Vue.set(photographer, 'albums', albums);
					}
				})
			})
			this.showPreloader = false;
		}.bind(this));
		// axios.get('https://jsonplaceholder.typicode.com/users')
		// .then(function(response) {
		// 	this.showPreloader = false;
		// 	this.photographers = response.data;
		// 	}.bind(this));
		// axios.get('https://jsonplaceholder.typicode.com/albums')
		// .then(function(response) {
		// 	// this.albums = response.data;
		// 		this.photographers.forEach((photographer) => {
		// 			let albums = []
		// 			Vue.set(photographer, 'expanded', false);
		// 			response.data.forEach((album) => {
		// 				if(photographer.id == album.userId) {
		// 					albums.push(album)
		// 					Vue.set(photographer, 'albums', albums);
		// 				}
		// 			})
		// 			})
		// 		}.bind(this));
	},
	computed: {

	}
})



