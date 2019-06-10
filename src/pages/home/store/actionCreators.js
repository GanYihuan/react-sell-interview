﻿import axios from 'axios'
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

// export const getHeaderData = () => (dispatch) => {
export const getHeaderData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/head.json'
  })
  dispatch({
    type: constants.HEAD_DATA,
    obj: resp.data
  })
  // axios({
  //   method: 'get',
  //   url: '/api/head.json'
  // }).then((resp) => {
  //   window.setTimeout(() => {
  //     dispatch({
  //       type: constants.HEAD_DATA,
  //       obj: resp.data
  //     })
  //   }, 2000)
  // })
}

export const getListData = (page) => (dispatch) => { // page: CommentList.jsx 传递过来的参数
  // dispatch({
  //   type: CHANGEREADYSTATE,
  //   obj: false
  // })
  axios({
    method: 'get',
    url: '/api/homelist.json'
  }).then((resp) => {
    window.setTimeout(() => {
      dispatch({
        type: constants.LIST_DATA,
        currentPage: page,
        obj: resp.data
      })
      // dispatch({
      //   type: constants.CHANGEREADYSTATE,
      //   obj: true
      // })
    }, 1500)
  })
}
