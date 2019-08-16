/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-13 00:14:12
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 14:51:09
 */
import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  commentData: [],
  ratingSelectType: 2
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.COMMENT_LIST_DATA:
      return getCommentListData(state, action)
    case constants.RATINGSELECTTYPEBAD:
      return state.set('ratingSelectType', fromJS(action.number))
    case constants.CLEAR_COMMENT_LIST_DATA:
      return state.set('commentData', fromJS(action.array))
    default:
      return state
  }
}

const getCommentListData = (state, action) => {
  return state.merge({
    // commentData: state.get('commentData').concat(fromJS(action.obj.data)) // imutable obj, use get()
    commentData: state.get('commentData').concat(fromJS(action.obj))
  })
}

