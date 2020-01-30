<template>
  <div class="hello">
    <div class="loading" v-if="!isModelLoaded">
      Model is loading...
    </div>
    <div class="content" v-else>
      <input type="file" name="uploadImage" @change="uploadImage" />
      <div class="image-wrapper">
        <img ref="image" alt="Vue logo" :src="img" />
        <div class="results">
          {{ result.label }}
          {{ result.confidence }}%
          <div style="width:100%;height:0;padding-bottom:125%;position:relative;">
            <iframe
              :src="result.giphy"
              width="100%"
              height="100%"
              style="position:absolute"
              frameBorder="0"
              class="giphy-embed"
              allowFullScreen
            ></iframe>
          </div>
          <p><a href="https://giphy.com/gifs/dancing-wtf-dope-TIXFmnKjrlMOP5zGNk">via GIPHY</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ml5 from 'ml5'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      classifier: {},
      isModelLoaded: false,
      result: {
        label: '',
        confidence: 0,
        giphy: ''
      },
      img: '@/assets/logo.png'
    }
  },
  props: {
    msg: String
  },
  mounted: function() {
    this.classifier = ml5.imageClassifier('MobileNet', this.modelLoaded)
  },
  methods: {
    modelLoaded: function() {
      console.log('Model Loaded!')
      this.isModelLoaded = true
      this.classify()
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
          console.log(response.data.data[0].embed_url)
          this.result.giphy = response.data.data[0].embed_url
        })
        .catch((e) => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
