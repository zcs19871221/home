import { css } from '@linaria/core';
import {
	Link,
	Route,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

import { Se } from './se';

createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: 'se',
				element: <Se />,
			},
		],
	},
]);

function App() {
	return (
		<div
			className={css`
        width: 100px;
        height: 100px;
        background-color: aliceblue;
        color: red;
      `}
		></div>
	);
}

export default App;
