import Index from '../views/index/index.vue'

export const loginRouter={
    path:'/login',
    name:'login',
    meta:{
        title:'登录注册'
    },
    component: (resolve) => require(['../views/login/login.vue'], resolve)
}

export const appRouter=[
    {
        path:'/',
        name:'banner',
        meta:{
            title:'首页轮播图'
        },
        icon: 'md-images',
        redirect: '/banner-list',
        component:Index,
        children:[
            {
                path:'banner-list',
                name:'banner-list',
                icon: 'md-image',
                meta:{
                    title:"图片列表"
                },
                component: (resolve) => require(['../views/banner/banner-list.vue'], resolve)
            },
            {
                path:'banner-add',
                name:'banner-add',
                icon: 'md-add',
                meta:{
                    title:"图片添加"
                },
                component: (resolve) => require(['../views/banner/banner-add.vue'], resolve)
            }
        ],
    },
    {
        path:'/',
        name:'journalism',
        icon: 'ios-albums',
        meta:{
            title:'新闻',  
        },  
        component:Index,
        children:[
            {
                path:'journalism-list',
                name:'journalism-list',
                icon: 'ios-list',
                meta:{
                    title:"新闻列表",
                },
                component: (resolve) => require(['../views/journalism/journalism-list.vue'], resolve)
            },
            {
                path:'journalism-add',
                name:'journalism-add',
                icon: 'md-add',
                meta:{
                    title:"新闻添加",
                },
                component: (resolve) => require(['../views/journalism/journalism-add.vue'], resolve)
            }
        ],
    },
    // {
    //     path:'/',
    //     name:"solution",
    //     component:Index,
    //     icon:'ios-information-circle-outline',
    //     meta:{
    //         title:'解决方案'
    //     },
    //     children:[
    //         {
    //             path: 'solution-list',
    //             name: 'solution-list',
    //             icon: "ios-mail-outline",
    //             meta:{
    //                 title: '方案列表'
    //             },
    //             component: (resolve) => require(['../views/solution/solution-list.vue'], resolve)
    //         },
    //         {
    //             path: 'solution-add',
    //             name: 'solution-add',
    //             icon: "ios-log-in",
    //             meta:{
    //                 title: '方案添加'
    //             },
    //             component: (resolve) => require(['../views/solution/solution-add.vue'], resolve)
    //         },
    //     ]
    // },
    {
        path:'/',
        name:"goods",
        component:Index,
        icon:'md-albums',
        meta:{
            title:'产品中心'
        },
        children:[
            {
                path: 'goods-list',
                name: 'goods-list',
                icon: "md-list",
                meta:{
                    title: '产品列表'
                },
                component: (resolve) => require(['../views/goods/goods-list.vue'], resolve)
            },
            {
                path: 'goods-add',
                name: 'goods-add',
                icon: "md-add",
                meta:{
                    title: '产品添加'
                },
                component: (resolve) => require(['../views/goods/goods-add.vue'], resolve)
            },
        ]
    },
    {
        path:'/',
        name:"handle",
        component:Index,
        icon:'md-clipboard',
        meta:{
            title:'即时办理'
        },
        children:[
            {
                path: 'handle-list',
                name: 'handle-list',
                icon: "ios-chatbubbles",
                meta:{
                    title: '申请信息'
                },
                component: (resolve) => require(['../views/handle/handle-list.vue'], resolve)
            },
            {
                path: 'address-list',
                name: 'address-list',
                icon: "logo-buffer",
                meta:{
                    title: '楼宇列表'
                },
                component: (resolve) => require(['../views/handle/address-list.vue'], resolve)
            },
            {
                path: 'address-add',
                name: 'address-add',
                icon: "md-add",
                meta:{
                    title: '楼宇添加'
                },
                component: (resolve) => require(['../views/handle/address-add.vue'], resolve)
            },
        ]
    },
    {
        path:'/',
        name:"recruit",
        component:Index,
        icon:'ios-contacts',
        meta:{
            title:'招聘'
        },
        children:[
            {
                path:'recruit-list',
                name:'recruit-list',
                icon:'ios-paper',
                meta:{
                    title:'岗位列表'
                },
                component:(resolve) => require(['../views/recruit/recruit-list.vue'], resolve)
            },
            {
                path:'recruit-add',
                name:'recruit-add',
                icon:'md-done-all',
                meta:{
                    title:'发布招聘'
                },
                component:(resolve) => require(['../views/recruit/recruit-add.vue'], resolve)
            }
        ]

    },
    {
        path:'/',
        name:"question",
        component:Index,
        icon:'md-contacts',
        meta:{
            title:'客户提交'
        },
        children:[
            {
                path: 'twoHours',
                name: 'twoHours',
                icon: "md-chatbubbles",
                meta:{
                    title: '两小时问答'
                },
                component: (resolve) => require(['../views/question/twoHours.vue'], resolve)
            },
            // {
            //     path: 'immediatelyHandle',
            //     name: 'immediatelyHandle',
            //     icon: "ios-calendar-outline",
            //     meta:{
            //         title: '即时办理'
            //     },
            //     component: (resolve) => require(['../views/question/immediatelyHandle.vue'], resolve)
            // },
        ]
    },
    
]

export const routers=[
    ...appRouter,
    loginRouter
]