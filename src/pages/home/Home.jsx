import React from 'react'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Category/>
        <Split/>
        <ContentList/>
        <BottomBar/>
      </div>
    )
  }
}

export default Home
