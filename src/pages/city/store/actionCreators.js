import axios from 'axios'
import * as constants from './constants'

export const getCityData = () => async(dispatch) => { // redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
  const { status, data: { citys }} = await axios.get('/locations/getCity')
  if (status === 200) {
    dispatch({
      type: constants.CITY_DATA,
      city: citys.cities,
      hotCity: citys.hotCities
    })
  }
}

export const setCurrentCity = (city) => (dispatch) => {
  dispatch({
    type: constants.SETCURRENTCITY,
    city: city
  })
}

export const clearCity = () => (dispatch) => {
  dispatch({
    type: constants.CLEARCITY
  })
}
