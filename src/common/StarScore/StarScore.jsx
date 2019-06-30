import React, { Component } from 'react'
import './StarScore.styl'

class StarScore extends Component {
  render() {
    const { score, size } = this.props
    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'
    const result = []
    const scores = Math.floor(score * 2) / 2 /* Math.floor: 4.9 -> 4, Math.ceil: 4.1 -> 5 */
    const hasDecimal = scores % 1 !== 0 /* If there is a decimal, half star */
    const integer = Math.floor(scores) /* Full star */
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON)
    }
    if (hasDecimal) {
      result.push(CLS_HALF)
    }
    while (result.length < LENGTH) {
      result.push(CLS_OFF)
    }
    return result.map((item, index) => {
      const starWrapper = 'star' + ` star-${size}`
      const starItem = item + ' star-item'
      return (
        <div className={starWrapper} key={index}>
          <span className={starItem}></span>
        </div>
      )
    })
  }
}

export default StarScore
