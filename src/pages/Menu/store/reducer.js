import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  name: '',
  img: ''
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.SAVESELLERINFO:
      return saveSellerInfo(state, action)
    default:
      return state
  }
}

const saveSellerInfo = (state, action) => {
  return state.merge({
    name: action.name,
    img: action.img
  })
}
