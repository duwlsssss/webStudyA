import React from "react";
import { Outlet } from "react-router-dom";
import {Navbar, Sidebar} from "../components";
import styled from 'styled-components';

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const OutletLayout = styled.div`
  flex: 1;
  padding: 2rem;
`;

const RootLayout = () => {
  return (
     <>
        <StyledLayout>
          <Navbar/>
          <ContentLayout>
            <Sidebar />
            <OutletLayout>
              <Outlet />
            </OutletLayout>
          </ContentLayout>
        </StyledLayout>
     </>
  )
}

export default RootLayout;

