
const path      = require('path')

module.exports = {
    entry:'./src/main.js',
    module:{
        rules:[
            {
               test:/\.svelte$/,
               use:{
                    loader:'svelte-loader',
                    options:{
                        emitCss:true,
                        hotReload:true
                    }
                }
            }
        ]
    }
}