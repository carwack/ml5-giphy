<template>
  <div id="app">
    <loading v-if="!isModelLoaded"></loading>
    <div class="content columns" v-else>
      <div class="upload-wrapper column is-half">
        <div class="image-wrapper" v-show="img">
          <img ref="image" alt="Vue logo" :src="img" />
          <div class="results">
            {{ result.label }}
            {{ result.confidence }}%
          </div>
        </div>
        <div class="file has-name is-boxed">
          <label class="file-label">
            <input class="file-input" type="file" name="uploadImage" @change="uploadImage" />
            <span class="file-cta">
              <span class="file-icon">
                <img src="@/assets/_ionicons_svg_md-cloud-upload.svg" alt="Upload icon" />
              </span>
              <span class="file-label">
                Choose a file...
              </span>
            </span>
            <span class="file-name">
              {{ imgName }}
            </span>
          </label>
        </div>
      </div>
      <div class="result-wrapper column" v-show="img">
        <div class="giphy-wrapper">
          <img :src="result.giphy" :alt="result.alt" />
          <a :href="result.giphyUrl">via GIPHY</a>
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
import axios from 'axios'
import Loading from './components/Loading.vue'

export default {
  name: 'app',
  components: {
    Loading
  },
  data() {
    return {
      classifier: {},
      isModelLoaded: false,
      result: {
        label: '',
        confidence: 0,
        giphy: '',
        alt: ''
      },
      img: '',
      imgName: 'Upload an image to start',
      gif: ''
    }
  },
  mounted: function() {
    this.classifier = ml5.imageClassifier('MobileNet', this.modelLoaded)
  },
  methods: {
    modelLoaded: function() {
      console.log('Model Loaded!')
      this.isModelLoaded = true
    },
    classify: function() {
      this.classifier.classify(this.$refs.image, (err, results) => {
        if (err) {
          console.error(err)
        } else {
          console.log(results)
          this.result.label = results[0].label
          this.result.confidence = (results[0].confidence * 100).toFixed(2)
          this.getGiphy()
        }
      })
    },
    uploadImage: function(event) {
      const image = event.target.files[0]
      const reader = new FileReader()
      this.imgName = event.target.files[0].name
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.img = e.target.result
        this.classify()
      }
    },
    getGiphy: function() {
      const url = 'https://api.giphy.com/v1/gifs/search?api_key=gnHx8iIxLiE3MLUDnVWJ6pcWDlI8LGqL&limit=1&q='
      axios
        .get(url + this.result.label + '&offset=' + Math.floor(Math.random() * 100 + 1))
        .then((response) => {
          const responseData = response.data.data[0]
          console.log(responseData)
          this.result.giphy = responseData.images.original.url
          this.result.alt = responseData.title
          this.result.giphyUrl = responseData.url
        })
        .catch((e) => {
          this.errors.push(e)
        })
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
  }

  .result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .giphy-wrapper {
      max-width: 70%;
      max-height: 50vh;
      display: flex;
      flex-direction: column;
      img {
        max-width: 100%;
        max-height: 70vh;
      }
    }
  }

  .upload-wrapper {
    height: 100vh;
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
    background-color: #ffffff;
    padding: 1.5rem 1.5rem 3rem;
  }
}
</style>
