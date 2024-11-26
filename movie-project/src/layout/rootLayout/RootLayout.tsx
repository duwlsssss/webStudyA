import { Outlet } from 'react-router-dom'
import { Navbar, SideBar } from '../../components'
import * as S from './RootLayout.styles'

const RootLayout = () => {
  return (
      <>
        <Navbar/>
        <S.ContentContainer>
          <SideBar />
          <S.OutletContainer>
            <Outlet />
          </S.OutletContainer>
        </S.ContentContainer>
    </>
  )
}

export default RootLayout;

