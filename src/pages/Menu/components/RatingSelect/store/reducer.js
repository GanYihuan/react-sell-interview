import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  ratingSelectType: 2
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.RATINGSELECTTYPEBAD:
      return state.set('ratingSelectType', fromJS(action.number))
    default:
      return state
  }
}
