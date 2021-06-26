module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'daoyun',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  

  
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [
    "~plugins/vue-resource",
    {src: '~/plugins/ElementUI', ssr: true },
    {src:'~/plugins/axios-plugin2'},
    {src:'~/plugins/axios-plugin'},
    {src: "~/plugins/localStorage", ssr: false },
    {src: "~/plugins/routeguard", ssr: false },
  ],
  build: {
    vendor: ['element-ui']
  },
  
  

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extend(config,ctx){
      　　config.node = {
      　　　　fs:"empty"
      　　}
      }
      
  },

   
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    "cookie-universal-nuxt",
    ["cookie-universal-nuxt", { alias: "cookiz" }]
  ],
  axios: {
      proxy: true, // 表示开启代理
      //prefix: '/api', // 表示给请求url加个前缀 /api
      browserBaseURL: "http://49.235.70.189:8080/",
      withCredentials: true,
      // credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target: 'http://49.235.70.189:8080/', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      }
    },
    
    
  }





}

