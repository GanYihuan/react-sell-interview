import { fromJS } from 'immutable'

const defaultState = fromJS({
  commentData: {},
  commentList: []
})

const getListData = (state, action) => {
  let list = []
  if (state.commentList.length > 0) {
    list = state.commentList.concat(action.obj.data.comments)
  } else {
    list = action.obj.data.comments
  }
  return { ...state, commentData: action.obj.data, commentList: list }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'COMMENT_LIST_DATA':
      return getListData(state, action)
    default:
      return state
  }
}
