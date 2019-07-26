import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  city: [],
  hotCity: [],
  currentCity: '深圳'
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.CITY_DATA:
      return getCityData(state, action)
    case constants.SETCURRENTCITY:
      return state.set('currentCity', fromJS(action.city))
    default:
      return state
  }
}

const getCityData = (state, action) => {
  return state.merge({
    city: state.get('city').concat(fromJS(action.city)),
    hotCity: fromJS(action.hotCity)
  })
}
