const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://acliapi.uppmkt.com/', // 后台服务地址以及端口号
            changeOrigin: true, // 是否开启代理
        }),
    );
};
