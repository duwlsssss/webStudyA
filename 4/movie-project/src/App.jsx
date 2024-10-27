import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from './layout/rootLayout/RootLayout';
import {Home, Error, Login, SignUp, Search, Category, MoviesCategory, MovieDetails} from './pages';
import GlobalStyles from "./GlobalStyles";

const router = createBrowserRouter([
  {
		path: '/',
		element: <RootLayout/>,
		errorElement: <Error/>,
		children: [
			{
				// index: true는 위의 path: '/' 즉, 홈 경로를 의미
				index: true,
				element: <Home/>
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
	return(
		<>
			<GlobalStyles />
			<RouterProvider router={router}/>
		</>
	);
}

export default App