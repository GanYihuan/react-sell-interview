import { fromJS } from 'immutable'

const defaultState = fromJS({
  commentData: {},
  ratingData: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'COMMENT_LIST_DATA':
      return getListData(state, action)
    case 'RATING_DATA':
      return getRatingtData(state, action)
    default:
      return state
  }
}

const getListData = (state, action) => {
  return state.merge({
    commentData: state.get('commentData').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}

const getRatingtData = (state, action) => {
  return state.merge({
    ratingData: state.get('ratingData').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}
