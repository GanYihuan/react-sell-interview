import axios from 'axios'
import * as constants from './constants'
import { Notyf } from 'notyf'

export const saveSellerInfo = (name, img) => (dispatch) => {
  dispatch({
    type: constants.SAVESELLERINFO,
    name: name,
    img: img
  })
}
