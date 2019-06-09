import axios from 'axios'
import * as constants from './constants'

// export const getHeaderData = () => async(dispatch) => {
//   const resp = await axios({
//     method: 'get',
//     url: '/api/head.json'
//   })
//   dispatch({
//     type: constants.HEAD_DATA,
//     obj: resp.data
//   })
// }

// const getHomeInfoData = res => ({
//   type: constants.HEAD_DATA,
//   obj: res.data
// })

// export const getHomeInfo = () => {
//   return dispatch => {
//     axios
//       .get('/api/head.json')
//       .then(res => {
//         dispatch(getHomeInfoData(res))
//       })
//   }
// }

export const getHeaderData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/head.json'
  })
  console.log(resp, 'resp---')
  dispatch({
    type: constants.HEAD_DATA,
    obj: resp.data
  })
}
