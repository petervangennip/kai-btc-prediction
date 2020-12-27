<template>
  <main id="app">
    <div class="container">
      <div class="row">
        <div class="column">
          <div class="banner">
            <img class="banner-img" src="./assets/btc.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column" v-if="isLoaded">
          <p>
            Current <strong>BTC</strong> Price:<br />
            <span class="text-lg">{{ this.info.rate }}</span>
          </p>
          <table>
            <tr>
              <th>Name</th>
              <th>Price prediction</th>
            </tr>
            <tr
              v-for="(member, i) in sortedValues"
              :key="i"
              :class="{ active: member.name === getBestPredictor.name }"
            >
              <td>
                {{ member.name }}
              </td>
              <td>
                {{ member.prediction }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      isLoaded: false,
      info: null
    };
  },
  computed: {
    cryptoData() {
      return this.$store.state.appData;
    },
    sortedValues() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.cryptoData.sort((a, b) => a.prediction - b.prediction);
    },
    getBestPredictor() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.cryptoData
        .sort((a, b) => a.prediction - b.prediction)
        .find(g => g.prediction === this.closestPrediction);
    },
    closestPrediction() {
      return this.getClosestPrediction(this.cryptoData, this.info.rate_float);
    }
  },
  methods: {
    getData() {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
          this.isLoaded = true;
          this.info = response.data.bpi.USD;
        });
    },
    getClosestPrediction(cryptos, target) {
      return cryptos.reduce((acc, crypto) => {
        return Math.abs(crypto.prediction - target) < Math.abs(acc - target)
          ? crypto.prediction
          : acc;
      }, 0);
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 25px;

  .banner-img {
    border-radius: 10px;
    overflow: hidden;
    max-width: 100%;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;

    tr {
      &.active {
        border: solid 1px #000;
        background-color: #f8931a;

        td {
          color: #000;
        }
      }
    }

    td {
      width: 50%;
    }
  }

  .text-lg {
    font-size: 44px;
  }
}
</style>
