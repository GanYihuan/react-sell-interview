import React, { PureComponent } from 'react' // PureComponent has invoked shouldComponentUpdate()
import { connect } from 'react-redux'
import './alphabet.styl'

class Alphabet extends PureComponent {
  render() {
    const { city, keyword } = this.props
    const citys = city.toJS()
    const cityAlphabet = []
    for (const item of citys) {
      cityAlphabet.push(item[0])
    }
    return (
      <div className='alphabet'>
        {
          keyword !== ''
            ? null
            : cityAlphabet.map((item, index) => {
              return (
                <div
                  className='alphabet-item'
                  key={index}
                  onClick={() => { this.handleLetterClick(index) }}
                >
                  {item}
                </div>
              )
            })
        }
      </div>
    )
  }
}

const mapState = state => ({
  city: state.getIn(['city', 'city'])
})

const mapDispatch = dispatch => ({ // mapDispatchToProps 将 action 作为 props 绑定到组件上
})

export default connect(
  mapState,
  mapDispatch
)(Alphabet)
