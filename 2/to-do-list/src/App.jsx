import React, {useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ToDoList from './components/ToDoList';
import ToDoDetails from './components/ToDoDetails';
import "./App.css"
import GlobalStyles from "./GlobalStyles";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
		path: '/',
    element: <ToDoList/>,
  },
	{ 
		path: '/todo/:id',
		element: <ToDoDetails/>,
	},
])

export function App() {
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