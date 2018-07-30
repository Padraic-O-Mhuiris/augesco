import React from 'react'
import ReactDOM from 'react-dom'
import './assets/index.css'
import App from './App'

// ********- CSS FRAMEWORK -********
import '../node_modules/uikit/dist/css/uikit.min.css'
import '../node_modules/uikit/dist/css/uikit-core.min.css'
import '../node_modules/uikit/dist/js/uikit.min.js'
import '../node_modules/uikit/dist/js/uikit-icons.min.js'
import '../node_modules/uikit/dist/js/uikit-core.min.js'
// ********- ************* -********

import { SampleModel } from "./models/sampleModel"

const sampleModel = SampleModel.create({
  items: [
    {
      name: "Machine Gun Preacher",
      price: 7.35,
      author: "T.E Lawrence"
    },
    {
      name: "LEGO Mindstorm EV3",
      price: 349.95,
      author: "Julie Shields"
    }
  ]
})
ReactDOM.render(<App sampleModel={sampleModel}/>, document.getElementById('root'))

setInterval(() => {
  sampleModel.items[0].changePrice(sampleModel.items[0].price + 1)
}, 1000)