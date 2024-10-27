import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from './layout/RootLayout';
import {Home, Movies, Error, Login, SignUp, Search, Category} from './pages';
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
				path: 'movies/:category',
				element: <Movies/>
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
				path: 'category',
				element: <Category/>
			}
		],
	},
])

function App() {
	return(
		<>
			<GlobalStyles/>
			<RouterProvider router={router}/>
		</>
	);
}

export default App