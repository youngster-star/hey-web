# HeyWeb — 何以晴个人网站

基于 **Spring Boot 3.3 + Next.js 16** 构建的个人网站，记录生活与思考。

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端框架 | Spring Boot 3.3, Spring Security 6, JWT |
| 数据库 | MySQL 8.x, Flyway 迁移 |
| 前端框架 | Next.js 16 (App Router, Turbopack), React 19 |
| UI | Tailwind CSS v4, shadcn/ui v4, magicui, cult-ui |
| 动画 | Framer Motion, three.js (WebGL) |
| 图标 | lucide-react, @radix-ui/react-icons |
| 3D | IconCloud (Canvas), ThreeDPhotoCarousel (CSS 3D) |

## 项目结构

```
hey-web/
├── src/main/java/com/heyweb/    # Spring Boot 后端
│   ├── config/                   # Security, Jackson, CORS 配置
│   ├── controller/               # REST API 控制器
│   ├── entity/                   # JPA 实体
│   ├── repository/               # 数据访问层
│   └── service/                  # 业务逻辑
├── src/main/resources/
│   ├── db/migration/             # Flyway SQL 迁移脚本
│   └── application.yml           # 后端配置
├── hey-web-frontend/             # Next.js 前端
│   └── src/
│       ├── app/                  # App Router 页面
│       │   ├── admin/            # 管理后台 (12个管理页)
│       │   ├── about/            # 关于页
│       │   ├── articles/         # 文章 (列表+详情)
│       │   ├── gallery/          # 相册 (列表+详情)
│       │   └── ...               # 视频/音频/小说/日记/归档等
│       ├── components/
│       │   ├── ui/               # 19个 UI 组件 (shadcn/magicui/cult-ui)
│       │   ├── common/           # Breadcrumb, LikeButton, SearchDialog
│       │   ├── layout/           # SiteHeader (共享导航+主题切换)
│       │   └── providers/        # ThemeProvider, QueryProvider
│       └── lib/                  # API 客户端, 工具函数
└── UI.md                         # UI 设计文档
```

## 功能特性

- **暗色/亮色模式** — AnimatedThemeToggler 全局切换
- **Hero 动画** — OrbitingCircles 轨道环绕 + BlurFade 淡入
- **动态跑马灯** — Marquee 3D 展示最新说说/备忘/日记
- **内容展示** — BentoGrid 探索卡片 + CutoutCard 文章样式
- **WebGL 特效** — ShaderLensBlur 光影交互
- **3D 旋转木马** — ThreeDPhotoCarousel 照片展示
- **Terminal 动画** — 打字机效果展示安装命令
- **像素化加载** — PixelImage 图片加载过渡
- **面包屑导航** — 全站自动面包屑
- **点赞系统** — IP 去重 + 实时切换
- **全功能管理后台** — 12 个管理页面 (文章/视频/相册/音频/小说/日记/备忘/说说/友链/分类/标签)

## 快速开始

### 环境要求

- **JDK 17+** (推荐 JDK 21)
- **Node.js 20+**
- **MySQL 8.x**

### 后端

```bash
# 配置环境变量
export JAVA_HOME=/path/to/jdk-21

# 创建数据库
mysql -u root -p -e "CREATE DATABASE heyweb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"

# 启动 (Flyway 会自动建表)
cd hey-web
./mvnw spring-boot:run
# 后端运行在 http://localhost:8080
```

### 前端

```bash
cd hey-web-frontend
npm install
npm run dev
# 前端运行在 http://localhost:3000
```

### 管理后台

访问 `http://localhost:3000/admin/login`  
默认账号: `admin` / `admin123`

## 开发笔记

- Git 远程: `dkb` → `git@github.com:youngster-star/hey-web.git`
- 前端 API 基址: `NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1`
- Hibernate `open-in-view: true` (避免 Jackson 序列化 LazyInitializationException)
- 已注册 `jackson-datatype-hibernate6` 处理 Hibernate 代理
- shadcn 组件通过 CLI 安装: `npx shadcn@latest add <component>`

## 版本历史

| 阶段 | 提交 | 内容 |
|------|------|------|
| 第一阶段 | `cd4ef99` | 项目初始化与基础搭建 |
| 第二阶段 | `701c8ab` | 内容扩展模块 |
| 第三阶段 | `02fea25` | 交互与统计 |
| 第四阶段 | `48940b6` | 安全修复、管理页面补全、首页重设计 |
| 第五阶段 | `065cb11` | 面包屑、详情页、点赞、归档、心情/天气 |
| 第六阶段 | `fca3520` | UI 全面升级 — magicui + cult-ui |
