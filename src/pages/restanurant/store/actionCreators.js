import axios from 'axios'

export const getRestanurantData = () => async(dispatch) => { // redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
  const resp = await axios({
    method: 'get',
    url: '/api/navheader.json'
  })
  dispatch({
    type: 'RESTANURANT_DATA',
    obj: resp.data
  })
}
