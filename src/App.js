import React, { Component } from 'react'
import SampleModelView from "./components/SampleModelView"

class App extends Component {
  render () {
    console.log(this.props)
    return (
      <div className='uk-container'> 
        <h1 className='uk-heading-divider uk-text-center'>Mobx truffle box</h1>

        <SampleModelView sampleModel={this.props.sampleModel}/>
      </div>
    )
  }
}

export default App;
