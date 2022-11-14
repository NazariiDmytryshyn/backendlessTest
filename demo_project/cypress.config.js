const { defineConfig } = require('cypress')


module.exports = defineConfig({
    env: {
        MAILOSAUR_API_KEY: "SJxy0MooCaN30RL1",
        googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
        googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    },
    e2e: {
        baseUrl: 'https://develop.backendless.com',
        chromeWebSecurity: false
    }
})



// const googleClientId = '239518018429-31kn720e2apm361eqmb3vnsga1rc2er3.apps.googleusercontent.com'
// const googleClientSecret = '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'