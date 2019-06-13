import axios from 'axios'

export const getCommentData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/comments.json'
  })
  dispatch({
    type: 'COMMENT_LIST_DATA',
    obj: resp.data
  })
}

export const getRatingsData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/ratings.json'
  })
  dispatch({
    type: 'RATING_DATA',
    obj: resp.data
  })
}
