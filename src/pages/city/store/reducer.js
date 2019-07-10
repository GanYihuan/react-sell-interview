﻿import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  city: [],
  hotCity: []
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.CITY_DATA:
      return getCityData(state, action)
    default:
      return state
  }
}

const getCityData = (state, action) => {
  return state.merge({
    city: state.get('city').concat(fromJS(action.city)),
    hotCity: state.get('hotCity').concat(fromJS(action.hotCity))
  })
}