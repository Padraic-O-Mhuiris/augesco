import React from "react"
import { observer } from "mobx-react"
import SampleModelItemView from "./SampleModelItemView"

const SampleModelView = ({ sampleModel }) => (
  <div className="list">
    <ul>
      {sampleModel.items.map((item, idx) => 
        <SampleModelItemView key={idx} item={item}/>)}
    </ul>
    Total: {sampleModel.totalPrice} $
  </div>
)

export default observer(SampleModelView)
