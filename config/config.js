export default {
  theme: {
    "@primary-color": '#40a9ff'
  },
  plugins:[
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      locale: {
        enable: true
      }
    }]
  ],
  routes:[{
    path: '/',
    component: '../layout/BasicLayout',
    routes: [{
      path: '/helloworld',
      component: './HelloWorld',
    }, {
      path: '/dashboard',
      routes:[
        {path: '/dashboard/analysis', component: './dashboard/Analysis'},
        {path: '/dashboard/monitor', component: './dashboard/Monitor'},
        {path: '/dashboard/workplace', component: './dashboard/Workplace'}
      ]
    }, {
      path: '/puzzlecards', component: './puzzlecards' 
    }, {
      path: '/list', component: './list' 
    }]
  }]
}