import axios from 'axios'
import * as constants from './constants'

export const getRestanurantData = () => async(dispatch) => { // redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
  const { status, data: { sellers }} = await axios.get('/sellers/getSeller')
  if (status === 200) {
    dispatch({
      type: constants.RESTANURANT_DATA,
      obj: sellers
    })
  }
  // const resp = await axios({
  //   method: 'get',
  //   url: '/api/navheader.json'
  // })
  // dispatch({
  //   type: constants.RESTANURANT_DATA,
  //   obj: resp.data
  // })
}
