import axios from 'axios'

export const getMenuData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/menu.json'
  })
  dispatch({
    type: 'MENU_DATA',
    obj: resp.data
  })
}
