import { fromJS } from 'immutable'
import { RESTANURANT_DATA } from './constants'

const initState = fromJS({
  resData: {}
})

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
