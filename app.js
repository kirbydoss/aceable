
// Set data source
const fetchUrl = "https://mkt-endpoint.now.sh/products";

// Show me the money -- Convert string into standard USD display
Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return formatter.format(value);
});

//Template for the product render
Vue.component('products-list', {
  props: ['results'],
  template: `
    <div class="grid-x grid-margin-x">
      <div class="cell large-4 medium-6 small-12" v-for="posts in processedPosts" >
      <a href="#" class="cardholder">
        <div class="card" v-for="post in posts">
        <img :src="'https://source.unsplash.com/random/600x350/?plane,airplane' + post.price" />
          <div class="card-section titlebit">
            <h2 class="text-center">{{ post.title }}</h2>
            <h3 class="text-center">{{ post.price | toCurrency }}</h3>
          </div>
          <div class="card-section descbit">

            <p class="text-center">{{ post.description }}</p>
            <p class="text-center"><a href="#" class="button">Learn More</a></p>
          </div>
        </div>
        </a>
      </div>
    </div>`,
  computed: {
    processedPosts() {
      //  Sort the array of products based on price low to high
      let posts = this.results.sort((a,b) => {return a.price - b.price;});
      // Turn product into an array we can use in the template
      let i, j, chunkedArray = [],
        chunk = 1;
      for (i = 0, j = 0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i, i + chunk);
      }
      return chunkedArray;
    }
  },
  //add a random number method
  methods : {
    randomNumber : function(){
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
  }

});
// Initialize vue
const vm = new Vue({
  el: '#app',
  data: {
    results: [],
    loading: true,
    title: ''
  },
  mounted() {
    //Get the data, change loading to false
     axios.get(fetchUrl).then(response => {this.results = response.data}, this.loading = false);
  },
});