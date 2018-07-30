import React from "react"

const SampleModelItemView = ({ item }) => (
  <li className="item">
    <h2>{item.name}</h2>
    <h3>{item.author}</h3>
    <span>{item.price}</span>
  </li>
)

export default SampleModelItemView