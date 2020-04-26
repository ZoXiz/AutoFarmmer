<template>
  <div id="app">
    <h1>
      <center>環境監測</center>
    </h1>
    <div id="gauages">
      <div v-for="gauage in GauageData" :key="gauage.Title">
        <h3>{{ gauage.Title }}</h3>
        <img :src="getImg(gauage.Icon)" />
        <p style="font-size:1.5em" v-if="gauage.Title!=='Clock'">
          {{ gauage.Value }}{{ gauage.Unit }}
        </p>
        <p style="font-size:1.5em" v-else>{{ gauage.hour }}:{{ gauage.min }}:{{ gauage.sec }}</p>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  // components: {
  //   HelloWorld
  // }
  created() {
    this.timer = setInterval(() => {
      let now = new Date()
      let hour = now.getHours()
      let min = now.getMinutes()
      let sec = now.getSeconds()
      this.updateTime(hour, min, sec)
      this.updateValue()
    }, 1000)
  },
  data: function() {
    return {
      GauageData: [
        {
          Title: "Temperture",
          Value: 26.3,
          Icon: "weather.svg",
          Unit: "ºC",
          bias: [23, 25]
        },
        {
          Title: "Altitude",
          Value: 1310.6,
          Icon: "mountain.svg",
          Unit: "M",
          bias: [793.4, 795]
        },
        {
          Title: "PM2.5",
          Value: 15.7,
          Icon: "dust.svg",
          Unit: "μg/m³",
          bias: [15.6, 16.4]
        },
        {
          Title: "Light",
          Value: 344,
          Icon: "idea.svg",
          Unit: "cd",
          bias: [340, 350]
        },
        {
          Title: "Hummidity",
          Value: 73,
          Icon: "drop.svg",
          Unit: "%",
          bias: [66, 72]
        },
        {
          Title: "UV",
          Value: 0,
          Icon: "sun.svg",
          Unit: "",
          bias: [6, 8]
        },
        {
          Title: "Pressure",
          Value: 997,
          Icon: "pressure.svg",
          Unit: "hPa",
          bias: [1010, 1013]
        },
        {
          Title: "Clock",
          Icon: "clock.svg",
          hour: "00",
          min: "00",
          sec: "00"
        }
      ]
    };
  },
  methods: {
    getImg: function(imgName) {
      return require(`./assets/${imgName}`)
    },
    updateTime: function(hour, min, sec) {
      // console.log(`${hour}:${min}:${sec}`)
      if(sec < 10) {
        sec = "0" + sec
      }
      if(min < 10) {
        min = "0" + min
      }
      if(hour < 10) {
        hour = "0" + hour
      }
      this.GauageData[7].hour = hour
      this.GauageData[7].min = min
      this.GauageData[7].sec = sec
      return 0
    },
    updateValue: function() {
      for (let i=0; i<7; i++) {
        // console.log(this.GauageData[i].Title)
        let min = this.GauageData[i].bias[0]
        let max = this.GauageData[i].bias[1]
        this.GauageData[i].Value = this.getRandom(min, max).toString()
      }
      return 0
    },
    getRandom(min, max) {
      return (Math.random() * (max - min)  + min).toFixed(2)
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

#gauages > div {
  width: 25%;
  float: left;
}

#gauages > div > img {
  width: 3em;
}
</style>
