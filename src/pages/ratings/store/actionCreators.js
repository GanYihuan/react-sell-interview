import { fromJS } from 'immutable'
import axios from 'axios'

export const getListData = () => async(dispatch) => {
  dispatch({
    type: 'SETLOADSTATE',
    obj: false
  })
  const resp = await axios({
    method: 'get',
    url: '../../../json/comments.json'
  })
  dispatch({
    type: 'COMMENT_LIST_DATA',
    obj: resp.data
  })
  dispatch({
    type: 'SETLOADSTATE',
    obj: true
  })
}
