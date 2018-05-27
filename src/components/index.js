/*

    This file is where we import all the components we have
    We then export them again at the end

    This means that in any file you can type:
        import {Component1, Component2 ... ComponentN} from 'components/

*/

//Import all components
import Navbar from './_navbar/navbar/navbar'
import NotificationBox from './_navbar/notificationBox/notificationBox';

import AccentedBox from './accentedBox/accentedBox';
import Searchbar from './searchbar/searchbar';

import ContentTabs from './_dashboard/contentTabs/contentTabs';
import BookTable from './_dashboard/bookTable/bookTable';
import DueSoon from './_dashboard/dueSoon/dueSoon';
import Recommended from './_dashboard/recommended/recommended';
import History from './_dashboard/history/history';

import FilterItem from './_catalogue/filterItem/filterItem'

//Export all components
export {
    Navbar,
    NotificationBox,

    AccentedBox,
    Searchbar,

    ContentTabs,
    BookTable,
    DueSoon,
    Recommended,
    History,
    
    FilterItem
}
