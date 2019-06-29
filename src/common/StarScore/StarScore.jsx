import React, { Component } from 'react'
import './StarScore.styl'

class StarScore extends Component {
  render() {
    const { score } = this.props
    return <div className='star-score'>{this.renderScore(score)}</div>
  }
  renderScore(scores) {
    const wm_poi_score = scores || ''
    const score = wm_poi_score.toString()
    const scoreArray = score.split('.')
    const fullstar = parseInt(scoreArray[0]) // 满星个数
    const halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0 // 半星个数
    const nullstar = 5 - fullstar - halfstar // 0星个数
    const starjsx = []
    // 渲染满星
    for (let i = 0; i < fullstar; i++) {
      starjsx.push(<div key={i + 'full'} className='star fullstar'></div>)
    }
    // 渲染满星
    if (halfstar) {
      for (let j = 0; j < halfstar; j++) {
        starjsx.push(<div key={j + 'half'} className='star halfstar'></div>)
      }
    }
    // 渲染0星
    if (nullstar) {
      for (let k = 0; k < nullstar; k++) {
        starjsx.push(<div key={k + 'null'} className='star nullstar'></div>)
      }
    }
    return starjsx
  }
}

export default StarScore
