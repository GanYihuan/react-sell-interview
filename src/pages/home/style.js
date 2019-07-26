import styled from 'styled-components'

export const SearchWrapper = styled.div`
  position: relative
`

export const BannerImg = styled.div `
  z-index -100
  position: relative
  width: 100%
  height: 0
  padding-top: 11.125rem
  background-image: url("./components/Header/img/banner.jpg")
  background-size: 100% 11.125rem
`

export const SearchBbar = styled.div`
  position: absolute
  padding-top: .875rem
  width: 100%
  height: 2.5rem
  display: flex
  justify-content: center
  align-items: center
`
