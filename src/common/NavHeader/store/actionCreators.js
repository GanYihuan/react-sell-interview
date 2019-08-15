/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-12 06:36:55
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 05:28:24
 */
import axios from 'axios'
import * as constants from './constants'

export const getNavHeaderData = (name) => async(dispatch) => {
  const { status, data: { sellers }} = await axios.get('/csellers/getSeller')
  if (status === 200) {
    const result = sellers.filter((item, index) => {
      return item.name === name
    })
    dispatch({
      type: constants.NAVHEADER,
      obj: result[0]
    })
  }
  // const resp = await axios({
  //   method: 'get',
  //   url: '/api/navheader.json'
  // })
  // dispatch({
  //   type: 'HEAD_DATA',
  //   obj: resp.data
  // })
}
