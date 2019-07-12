import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  commentData: [],
  ratingData: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.COMMENT_LIST_DATA:
      return getCommentListData(state, action)
    case constants.RATING_DATA:
      return getRatingtData(state, action)
    default:
      return state
  }
}

const getCommentListData = (state, action) => {
  return state.merge({
    // commentData: state.get('commentData').concat(fromJS(action.obj.data)) // imutable obj, use get()
    commentData: state.get('commentData').concat(fromJS(action.obj)) // imutable obj, use get()
  })
}

const getRatingtData = (state, action) => {
  return state.merge({
    // ratingData: state.get('ratingData').concat(fromJS(action.obj.data)) // imutable obj, use get()
    ratingData: state.get('ratingData').concat(fromJS(action.obj)) // imutable obj, use get()
  })
}
