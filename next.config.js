const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache') 
try{
  runtimeCaching[0].options.precacheFallback.fallbackURL = "/_offline";
}
catch(err){
  
}

// module.exports = withPWA({
// 	assetPrefix: process.env.NODE_ENV === '',
//     publicRuntimeConfig: {
//       ENDPOINT_PORT: process.env.PORT || "7000",
// 	    basePath: process.env.NODE_ENV === '',
//     },
//     // pwa: {
//     //   dest: 'public',
//     //   disable: true,//process.env.NODE_ENV === 'development',
//     //   scope: '/',
//     //   skipWaiting: false
//     // }
//   })
