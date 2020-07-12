const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyMiddleware = require("http-proxy-middleware").createProxyMiddleware;

module.exports = function (app) {
    app.use(
        ["/api/"],
        proxyMiddleware({
            target: "http://localhost:5000"
        })
    );
};