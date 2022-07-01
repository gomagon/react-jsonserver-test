const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
        ["/service/api"],
      {
        target: "http://localhost:5000",
        changeOrigin: true,
      }
    )
  );
  app.listen(3000);
};
