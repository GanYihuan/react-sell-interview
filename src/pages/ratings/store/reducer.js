import { fromJS } from 'immutable'

const defaultState = fromJS({
  commentData: {},
  commentList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'COMMENT_LIST_DATA':
      return getListData(state, action)
    default:
      return state
  }
}

const getListData = (state, action) => {
  return state.merge({
    commentData: state.get('commentData').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}
