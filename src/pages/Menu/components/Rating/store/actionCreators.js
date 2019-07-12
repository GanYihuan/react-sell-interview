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
}

export const getRatingsData = () => async(dispatch) => {
  const { status, data: { sellers }} = await axios.get('/sellers/getSeller')
  if (status === 200) {
    dispatch({
      type: constants.RATING_DATA,
      obj: sellers
    })
  }
}
