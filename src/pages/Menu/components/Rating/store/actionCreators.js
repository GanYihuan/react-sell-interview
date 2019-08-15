/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-13 00:14:12
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 05:20:00
 */
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
  const { status, data: { sellers }} = await axios.get('/csellers/getSeller')
  if (status === 200) {
    dispatch({
      type: constants.RATING_DATA,
      obj: sellers
    })
  }
}

export const ratingSelectTypeBad = (number) => async(dispatch) => {
  dispatch({
    type: constants.RATINGSELECTTYPEBAD,
    number: number
  })
}
