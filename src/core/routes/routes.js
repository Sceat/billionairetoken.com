export default loader => [
	{
		path: '/',
		name: 'home',
		// component: () => loader('home'),
		redirect: {
			name: 'swap',
		},
	},
	{
		path: '*',
		name: '404',
		component: () => loader('misc/404'),
	},
	{
		path: '/swap',
		name: 'swap',
		component: () => loader('swap'),
	},
]
