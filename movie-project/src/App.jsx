import React, {useState} from "react";
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import RootLayout from './layout/rootLayout/RootLayout';
import {Home, NotFound, Login, SignUp, Search, Category, MoviesCategory, MovieDetails} from './pages';
import GlobalStyles from "./GlobalStyles";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import useFetchUserData from './hooks/queries/useFetchUserData'

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }) => {
  const { data: user } = useFetchUserData();

  console.log(user)
  if (!user) return <Navigate to="/login" replace />; // 인증되지 않은 경우 로그인 페이지로 리다이렉트

  return children; 
};

const router = createBrowserRouter([
  {
		path: '/',
		element: <RootLayout/>,
		errorElement: <NotFound/>,
		children: [
			{
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
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
				element: (
          <ProtectedRoute>
						<Search/>
					</ProtectedRoute>
        ),
			},
			{
				path: 'categories',
				element: (
          <ProtectedRoute>
						<Category/>
					</ProtectedRoute>
        ),
			},
			{ 
				path: 'categories/:category',
				element: (
          <ProtectedRoute>
						<MoviesCategory/> 
					</ProtectedRoute>
        ),
			},
			{
				path: 'movies/:movieId',
				element: (
          <ProtectedRoute>
						<MovieDetails/>
					</ProtectedRoute>
        ),
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