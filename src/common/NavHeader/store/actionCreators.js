import axios from 'axios'
import * as constants from './constants'

export const getNavHeaderData = () => async(dispatch) => {
  const { status, data: { sellers }} = await axios.get('/sellers/getSeller')
  if (status === 200) {
    dispatch({
      type: constants.NAVHEADER,
      obj: sellers
    })
  }
  // const resp = await axios({
  //   method: 'get',
  //   url: '/api/navheader.json'
  // })
  // dispatch({
  //   type: 'HEAD_DATA',
  //   obj: resp.data
  // })
}
