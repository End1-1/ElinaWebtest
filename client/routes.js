import Index from 'Components/Pages/index';
import Common from 'Components/Pages/common';
import Cart from 'Components/Pages/cart';
import Checkout from 'Components/Pages/checkout';
import CheckoutSuccessPage from 'Components/Pages/checkoutSuccessPage';
import SignIn from 'Components/Pages/signIn';
import SignUp from 'Components/Pages/signUp';
import Account from 'Components/Pages/account';
import Addresses from 'Components/Pages/account/addresses';
import Dashboard from 'Components/Pages/account/dashboard';
import CustomerOrders from 'Components/Pages/account/orders';
import CustomerOrder from 'Components/Pages/account/order';
import PostListPage from 'Components/Pages/postListPage';
import Search from 'Components/Pages/search';
import Redirect from 'Components/Pages/redirect';
import { localizeRoutes } from 'Helper/localizeRoutes';
import ProductSubscriptions from 'Components/Pages/account/productSubscriptions';
import StoreLocationPage from 'Components/Pages/storeLocationPage';
import FaqPage from 'Components/Pages/faqPage';
import Career from 'Components/Pages/career'

const Routes = [
    {
        path: '/',
        component: Index.component,
        loadData: Index.loadData,
        exact: true
    },
    {
        path: '/cart',
        component: Cart.component,
        exact: true
    },
    {
        path: '/checkout',
        component: Checkout.component,
        exact: true
    },
    {
        path: '/checkout/success',
        component: CheckoutSuccessPage.component,
        exact: true
    },
    {
        path: '/signIn',
        component: SignIn.component,
        exact: true
    },
    {
        path: '/signUp',
        component: SignUp.component,
        exact: true
    },
    {
        path: '/account',
        component: Account,
        exact: true
    },
    {
        path: '/search',
        component: Search,
        exact: true
    },
    {
        path: '/account/addresses',
        component: Addresses,
        exact: true
    },
    {
        path: '/account/dashboard',
        component: Dashboard,
        exact: true
    },
    {
        path: '/account/subscriptions',
        component: ProductSubscriptions.component,
        exact: true
    },
    {
        path: '/account/orders',
        component: CustomerOrders,
        exact: true
    },
    {
        path: '/account/order/:id',
        component: CustomerOrder,
        exact: true
    },
    {
        path: "/blog",
        component: PostListPage.component,
        loadData: PostListPage.loadData,
        exact: true
    },
    {
        path: "/stores",
        component: StoreLocationPage.component,
        loadData: StoreLocationPage.loadData,
        exact: true
    },
    {
        path: "/faq",
        component: FaqPage.component,
        loadData: FaqPage.loadData,
        exact: true
    },
    {
        path: "/career",
        component: Career,
        exact: true
    },
    {
        path: '/',
        component: Common.component,
        loadData: Common.loadData
    },
    // This will redirect for example if language code should
    // be provided but has not been provided.
    {
        path: '*',
        component: Redirect,
        localize: false
    }
];

export const getRoutes = (useLocaleCode, supportedLanguageCodesInUrl = []) => useLocaleCode ? localizeRoutes(Routes, supportedLanguageCodesInUrl) : Routes