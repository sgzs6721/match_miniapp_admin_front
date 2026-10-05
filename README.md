# 乒乓赛事 Web 运营管理台

基于现有 Spring Boot 管理员接口构建的响应式 Web 数据看板，包含：

- 运营总览：赛事、参赛人次、报名费、待处理事项、城市分布和近期动态
- 赛事分析：赛制结构、用户结构、城市赛事/参与/流水明细
- 闲时场馆：场馆、球台、预约时长、预约交易额和城市明细
- 入驻审核：机构主办方与个人组织者的汇总及待审列表
- 操作动态：管理员和系统关键操作日志

## 本地启动

```bash
npm install
npm run dev
```

默认地址为 `http://localhost:5174`，开发服务器会把 `/api` 代理到 `http://localhost:8080`。可通过 `ADMIN_API_PROXY` 修改后端地址。

## 登录

当前复用小程序管理员的 JWT 鉴权。粘贴管理员 Bearer Token 后，页面会调用 `/api/auth/userinfo` 验证账号的 `admin=1` 权限。没有可用后端时可点击“预览演示数据”查看完整界面。

生产环境可在 `.env.local` 中设置：

```bash
VITE_API_BASE_URL=https://your-api.example.com/api
```

## 构建

```bash
npm run build
```

构建结果位于 `dist/`，可由 Nginx 或对象存储托管。
