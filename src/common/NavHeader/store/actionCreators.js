import axios from 'axios'

export const getNavHeaderData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/navheader.json'
  })
  dispatch({
    type: 'HEAD_DATA',
    obj: resp.data
  })
}
