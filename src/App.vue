<template>
  <div id="app">
    <loading v-if="!isModelLoaded"></loading>
    <div class="content columns">
      <div class="upload-wrapper column is-half">
      </div>
      <div class="result-wrapper column">
        <div class="giphy-wrapper">
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Made by <a href="https://twitter.com/Carwack">@Carwack</a> 2020.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ml5 from 'ml5'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    Loading
  },
  data() {
    return {
      classifier: {},
      isModelLoaded: false
    }
  },
  mounted: function() {
    this.classifier = ml5.imageClassifier('MobileNet', this.modelLoaded)
  },
  methods: {
    modelLoaded: function() {
      console.log('Model Loaded!')
      this.isModelLoaded = true
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/css/bulma.css';

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .content {
    margin: 0;
    height: calc(100vh - 100px);
  }

  .result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .giphy-wrapper {
      max-width: 70%;
      display: flex;
      flex-direction: column;
      img {
        max-width: 100%;
        max-height: 70vh;
      }
    }
  }

  .upload-wrapper {
    background-color: #00c4a7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .image-wrapper {
      width: 70%;
      border-radius: 10px 10px 10px 10px;
      -moz-border-radius: 10px 10px 10px 10px;
      -webkit-border-radius: 10px 10px 10px 10px;
      border: 10px double #e8e8e8;
      padding: 5px;
      margin-bottom: 20px;
      img {
        max-width: 100%;
        max-height: 30vh;
      }
    }
    .file-name {
      text-align: center;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    padding: 1.5rem 1.5rem 3rem;
  }
}
</style>
