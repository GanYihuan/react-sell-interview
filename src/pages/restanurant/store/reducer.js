import { fromJS } from 'immutable'

const initState = fromJS({
  restanurantData: {}
})

export default (state = initState, action) => {
  switch (action.type) {
    case 'RESTANURANT_DATA':
      return getRestanurant(state, action)
    default:
      return state
  }
}

const getRestanurant = (state, action) => {
  return state.merge({
    restanurantData: state.get('restanurantData').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}
