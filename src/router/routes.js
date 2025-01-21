const NotFound = () => import('@/views/Error.vue');
const Login = () => import('@/components/Auth/Login.vue');
const Dashboard = () => import('@/components/Dashboard/Index.vue');

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/dashboard',
        name: 'Home',
        component: Dashboard,
        meta: {
            requiresAuth: true
        },
        children: [
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            requiresAuth: false
        }
    },
]

export default routes