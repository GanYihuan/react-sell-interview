import axios from 'axios'
import * as constants from './constants'

export const ratingSelectTypeBad = (number) => async(dispatch) => {
  dispatch({
    type: constants.RATINGSELECTTYPEBAD,
    number: number
  })
}
