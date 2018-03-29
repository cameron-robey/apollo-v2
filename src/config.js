/*

This is the main config file for Apollo.

The following objects are exported at the end
    - main
        - Contains some default values such as a long and short long name
    - colours
        - Contains all the colours that are used on the site.
        - *PLEASE NOTE: This includes house colours for DCGS.
        - Since the config cannot be imported into a CSS file, any colours should be set inline
*/

//Container imports
import Home from './containers/home';
import Catalogue from './containers/catalogue';
import Scan from './containers/scan';
import Students from './containers/students';

let main = {
	shortName: "Apollo",
	longName: "Apollo | Library Management System",
	pages: [
		/*
		name:			Text that is displayed on the navbar and on the page title
		path:			The path that the router should re-direct to onClick in the navbar. Will also e displayed in the URL
		icon:			The icon that is displayed next to the text in the navbar. Given as a Font Awesome 5 icon name
		 				(For Reference) - Font Awesome Icons: https://fontawesome.com/icons?d=gallery
		componentName:	The name of the component page that relates to the page listed
		*/
		{
			name: 'Home',
			path: '/',
			icon: 'home',
			componentName: Home
		},
		{
			name: 'Catalogue',
			path: '/catalogue',
			icon: 'book',
			componentName: Catalogue
        },
		{
			name: 'Scan',
			path: '/scan',
			icon: 'barcode',
			componentName: Scan
        },
		{
			name: 'Students',
			path: '/students',
			icon: 'users',
			componentName: Students
        }
    ]
};

let colours = {
	pink: "#e44d95",
	darkPink: "#f160a6",
	lightGrey: "#f4f4f4",
	darkGrey: "#504f4f",

	foxell: "#fac800",
	holman: "#e97b1b",
	newman: "#d32b19",
	pearson: "#99c1e8",
	rayner: "#2a4597",
	thorne: "#267832"
};

// Do the final export of every config object so it can be imported in other files
export {
	main,
	colours
};
