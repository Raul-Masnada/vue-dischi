function generateBox() {
    new Vue({
        el:"#app",
        data:{
            array: [],
            generi:[],
            selectedGenre: "",
        },
        methods:{
            filteredGenresArray: function () {
                    return this.array.filter(album => {
                        return album.genre.includes(this.selectedGenre);
                    });
            },
            orderedMusic: function () {
               const order = this.filteredGenresArray().sort(
                    function (a, b) {
                       if (a.year < b.year) {
                           return -1;
                       } else if (a.year > b.year) {
                           return 1;
                       }
                       return 0;
                   }
               );
               return order;
           }
        },
        mounted(){
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(data =>{
                const array = data.data.response
                this.array = array
                for (let i = 0; i < array.length; i++) {
                    const album = array[i];

                    if (!this.generi.includes(album.genre)) {
                        this.generi.push(album.genre)
                    }
                }
            })
            .catch(() => console.log('error'))
        }
    });
}
function init() {
    generateBox();
}
$(init);
