<template>
  <div class="hello">
    <input type="file" name="uploadImage" @change="uploadImage" />
    <img ref="image" alt="Vue logo" :src="img" />
    <div class="loading" v-if="!isModelLoaded">
      Model is loading...
    </div>
    <div class="results" v-else>
      {{ result.label }}
      {{ result.confidence }}%
    </div>
  </div>
</template>

<script>
import ml5 from 'ml5'

export default {
  name: 'HelloWorld',
  data() {
    return {
      classifier: {},
      isModelLoaded: false,
      result: {
        label: '',
        confidence: 0
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
