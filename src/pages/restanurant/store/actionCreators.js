import axios from 'axios'

export const getRestanurantData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/navheader.json'
  })
  dispatch({
    type: 'RESTANURANT_DATA',
    obj: resp.data
  })
}
