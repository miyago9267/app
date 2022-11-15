const vm = Vue.createApp({
  data() {
    return {
      date: "00-00",
      total: "*",
      local: "*",
      remote: "*",
      area: "tpe",
      areaDisplay: "*",
      areaCount: "*",
      link: "#",
      areas: {}
    }
  },
  methods: {
    fetchData() {
      fetch(`/stat-today?area=${this.area}`)
      .then((response) => {
          if(!response.ok) throw new Error('Cannot fetch data!');
          return response.json();
      })
      .then((data)=>{
        this.date = data.date;
        this.total = data.total;
        this.local = data.local;
        this.remote = data.remote;
        this.areaCount = data.area;
        this.link = data.link;
      });
    },
    fetchArea() {
      console.log('test')
      fetch('/get-area')
      .then((response) => {
          if(!response.ok) throw new Error('Cannot fetch data!');
          return response.json();
      })
      .then((data)=>{
        this.areas = data
        this.areaDisplay = this.areas[this.area]
      });
    }
  },
  watch:{
    area(){
      this.fetchData();
      this.areaDisplay = this.areas[this.area]
    }
  },
  beforeMount(){
    this.fetchArea();
    this.fetchData();
  }
});

vm.mount('#app');
