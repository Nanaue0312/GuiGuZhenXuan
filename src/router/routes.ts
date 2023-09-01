// 对外暴露路由配置
export const menuRoutes = [
	{
		// login
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		name: 'Login',
		meta: {
			title: '登录', //菜单路由
			hidden: true,
			icon: 'Promotion',
		},
	},
	{
		// 登录成功后的layout组件
		path: '/',
		component: () => import('@/layout/index.vue'),
		name: 'Layout',
		meta: {
			title: '',
			icon: '',
		},
		redirect: '/home',
		children: [
			{
				path: '/home',
				component: () => import('@/views/home/index.vue'),
				name: 'Home',
				meta: {
					title: '首页',
					icon: 'HomeFilled',
				},
			},
		],
	},
	{
		path: '/screen',
		component: () => import('@/views/screen/index.vue'),
		name: 'Screen',
		meta: {
			title: '数据大屏',
			icon: 'Histogram',
		},
	},
	{
		// 404
		path: '/404',
		component: () => import('@/views/404/index.vue'),
		name: '404',
		meta: {
			title: '404',
			hidden: true,
		},
	},
];
export const asyncRoutes = [
	{
		path: '/acl',
		name: 'Acl',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '权限管理',
			icon: 'WarningFilled',
		},
		redirect: '/acl/user',
		children: [
			{
				path: '/acl/user',
				name: 'Acl',
				component: () => import('@/views/acl/user/index.vue'),
				meta: {
					title: '用户管理',
					icon: 'UserFilled',
				},
			},
			{
				path: '/acl/role',
				name: 'Role',
				component: () => import('@/views/acl/role/index.vue'),
				meta: {
					title: '角色管理',
					icon: 'Avatar',
				},
			},
			{
				path: '/acl/permission',
				name: 'Permission',
				component: () => import('@/views/acl/permission/index.vue'),
				meta: {
					title: '菜单管理',
					icon: 'List',
				},
			},
		],
	},
	{
		path: '/product',
		name: 'Product',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '商品管理',
			hidden: 'false',
			icon: 'Goods',
		},
		redirect: '/product/trademark',
		children: [
			{
				path: '/product/trademark',
				name: 'Trademark',
				component: () => import('@/views/product/trademark/index.vue'),
				meta: {
					title: '品牌管理',
					icon: 'Shop',
				},
			},
			{
				path: '/product/attr',
				name: 'Attr',
				component: () => import('@/views/product/attr/index.vue'),
				meta: {
					title: '属性管理',
					icon: 'Flag',
				},
			},
			{
				path: '/product/spu',
				name: 'Spu',
				component: () => import('@/views/product/spu/index.vue'),
				meta: {
					title: 'SPU管理',
					icon: 'Calendar',
				},
			},
			{
				path: '/product/sku',
				name: 'Sku',
				component: () => import('@/views/product/sku/index.vue'),
				meta: {
					title: 'SKU管理',
					icon: 'Stopwatch',
				},
			},
		],
	},
];
export const commonRoutes = [
	{
		path: '/:pathMatch(.*)*',
		redirect: '/404',
		name: 'Any',
		meta: {
			title: '任意路由',
			hidden: true,
		},
	},
];
