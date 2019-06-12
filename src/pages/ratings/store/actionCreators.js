import { fromJS } from 'immutable'
import axios from 'axios'

export const getListData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/comments.json'
  })
  dispatch({
    type: 'COMMENT_LIST_DATA',
    obj: resp.data
  })
}
