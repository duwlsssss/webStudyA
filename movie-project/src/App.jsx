import React, {useState} from "react";
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import RootLayout from './layout/rootLayout/RootLayout';
import {Home, NotFound, Login, SignUp, Search, Category, MoviesCategory, MovieDetails} from './pages';
import GlobalStyles from "./GlobalStyles";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const ProtectedRoute = ({ element }) => {
	// accessToken이 없으면 로그인 페이지로 리다이렉트하고, 있으면 Home 페이지를 렌더링
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? element : <Navigate to="/login" replace />; 
};

const router = createBrowserRouter([
  {
		path: '/',
		element: <RootLayout/>,
		errorElement: <NotFound/>,
		children: [
			{
        index: true,
        element: <ProtectedRoute element={<Home />} /> 
      },
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'signUp',
				element: <SignUp/>
			},
			{
				path: 'search',
				element: <Search/>
			},
			{
				path: 'categories',
				element: <Category/>
			},
			{ 
				path: 'categories/:category',
				element: <MoviesCategory/> 
			},
			{
				path: 'movies/:movieId',
				element: <MovieDetails/>
			},
		],
	},
])

function App() {
	const [isOpen, setIsOpen] = useState(false); //ReactQueryDevtoolsPanel 열고 닫기

	return(
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<RouterProvider router={router}/>
			<button
        onClick={() => setIsOpen(!isOpen)}
      >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel style={{ height: '200px' }} onClose={() => setIsOpen(false)} />}
		</QueryClientProvider>
	);
}

export default App