import App from '../../todos/containers/App';
import NotFoundPage from '../ui/AbcNotFoundPage'

const NAV_LINKS = {
    App: {
        path: '/app',
        nav:'/app/:filter',
        title: '主页',
        subTitle:"ABC主页可配置",
        // subLink:[App,IntroductionPage,HomePage],
        role:"public"
    },
    ListTableSample: {
        path: '/list',
        nav:'/list',
        title: '抢购',
        subTitle:"抢购",
        role:"private"
    },
    ProductPage: {
        path: '/product',
        nav:'/product',
        title: '商品',
        subTitle:"商品购物管理",
        role:"private"
    },
    UserPage: {
        path: '/user',
        nav:'/user',
        title: '用户管理',
        subTitle:"用户管理",
        role:"private"
    },
    AuthenticationPage: {
        path: '/authentication',
        nav:'/authentication',
        title: '权限管理',
        subTitle:"权限管理",
        role:"private"
    },

    IntroductionPage: {
        path: '/introduct',
        nav:'/introduct',
        title: '介绍',
        subTitle:"介绍ABC内容",
        role:"private"
    },
    HomePage: {
        path: '/home',
        nav:'/home',
        title: '主内容',
        subTitle:"介绍ABC内容",
        role:"needLogined"
    },
    HomePage: {
        path: '/todosmvc',
        nav:'/todosmvc',
        title: 'TodosMvc',
        subTitle:"Todo",
        role:"needLogined"
    }
};

export default NAV_LINKS;