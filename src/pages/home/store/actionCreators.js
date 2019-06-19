import axios from 'axios'
import * as constants from './constants'

export const getHeaderData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/head.json'
  })
  dispatch({
    type: constants.HEAD_DATA,
    obj: resp.data
  })
}

export const getListData = () => async(dispatch) => { // page: CommentList.jsx 传递过来的参数
  const resp = await axios({
    method: 'get',
    url: '/api/homelist.json'
  })
  dispatch({
    type: constants.LIST_DATA,
    obj: resp.data
  })
}
