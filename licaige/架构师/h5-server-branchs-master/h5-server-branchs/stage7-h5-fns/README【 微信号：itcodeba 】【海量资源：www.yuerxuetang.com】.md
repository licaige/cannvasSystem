# h5-server

## 端口

-   本地 3001
-   测试机 8082

## API

-   发布作品 url `/p/10-e5bb?channel=2` ，`10` 即作品 id ，`e5bb` 即作品 uuid ，`2` 即渠道号
-   预览作品 url `/p/preview/10-e5bb` ，，`10` 即作品 id ，`e5bb` 即作品 uuid ，无需渠道号

## 其他

测试环境下，数据库依赖于 biz-editor-server

-   要和 biz-editor-server 部署到一台服务器上
-   需要 biz-editor-server 启动 docker-compose
