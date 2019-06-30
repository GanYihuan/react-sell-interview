import axios from 'axios'
import * as constants from './constants'

export const getCommentData = () => async(dispatch) => {
  const { status, data: { ratings }} = await axios.get('/ratings/getRating')
  if (status === 200) {
    dispatch({
      type: constants.COMMENT_LIST_DATA,
      obj: ratings
    })
  }
  // const resp = await axios({
  //   method: 'get',
  //   url: '/api/comments.json'
  // })
  // dispatch({
  //   type: 'COMMENT_LIST_DATA',
  //   obj: resp.data
  // })
}

export const getRatingsData = () => async(dispatch) => {
  // const { status, data: { sellers }} = await axios.get('/sellers/getSellers')
  // if (status === 200) {
  //   dispatch({
  //     type: constants.RATING_DATA,
  //     obj: sellers
  //   })
  // }
  const resp = await axios({
    method: 'get',
    url: '/api/ratings.json'
  })
  dispatch({
    type: 'RATING_DATA',
    obj: resp.data
  })
}
