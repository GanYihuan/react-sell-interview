import React, { PureComponent } from 'react'
import BottomBar from './components/BottomBar/BottomBar'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'

// class Home extends React.Component {
class Home extends PureComponent {
  render() {
    return (
      <div>
        <Header/>
        <Category/>
        <ContentList/>
        <BottomBar/>
      </div>
    )
  }
}

export default Home
