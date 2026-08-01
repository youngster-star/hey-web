-- =====================================================
-- 测试数据脚本 - 涵盖所有模块
-- =====================================================

-- 分类（4个）
INSERT INTO t_category (name, slug, description, sort_order) VALUES
('技术', 'tech', '编程技术相关', 1),
('生活', 'life', '日常生活记录', 2),
('音乐', 'music', '音乐推荐与分享', 3),
('阅读', 'reading', '读书笔记与心得', 4);

-- 标签（8个）
INSERT INTO t_tag (name, slug) VALUES
('Java', 'java'),
('Spring Boot', 'spring-boot'),
('React', 'react'),
('TypeScript', 'typescript'),
('Docker', 'docker'),
('旅行', 'travel'),
('美食', 'food'),
('摄影', 'photography');

-- 文章（6篇：2篇草稿 + 4篇已发布，第1篇置顶）
INSERT INTO t_article (title, slug, summary, content, cover_image, status, visible, pinned, click_count, like_count, category_id, create_time, update_time) VALUES
('Spring Boot 3 实战入门', 'spring-boot-3-guide', '全面解析 Spring Boot 3 新特性与实际项目应用。', '## 概述\n\nSpring Boot 3 带来了许多令人兴奋的新特性，包括原生镜像支持、虚拟线程、以及 Jakarta EE 迁移等。\n\n## 核心特性\n\n### 1. 基线升级\n- Java 17 作为最低版本\n- Jakarta EE 9+ 替代 Java EE\n\n### 2. 原生镜像\n使用 GraalVM 可以将应用编译为原生可执行文件，启动时间从秒级降到毫秒级。\n\n### 3. 虚拟线程\n基于 Project Loom，Spring Boot 3.2 开始支持虚拟线程，大幅提升并发处理能力。', NULL, 'PUBLISHED', 1, 1, 1520, 38, 1, '2026-06-15 10:00:00', '2026-07-20 14:30:00'),
('TypeScript 高级类型技巧', 'typescript-advanced-types', '掌握条件类型、模板字面量类型等高级特性。', '## 条件类型\n\n```typescript\ntype IsString<T> = T extends string ? true : false;\n```\n\n## 模板字面量类型\n\n```typescript\ntype EventName<T extends string> = `on${Capitalize<T>}`;\n```\n\n## 映射类型\n\n```typescript\ntype Readonly<T> = { readonly [K in keyof T]: T[K] };\n```', NULL, 'PUBLISHED', 1, 0, 890, 21, 1, '2026-06-20 09:00:00', '2026-07-18 11:00:00'),
('周末京郊徒步记录', 'weekend-hiking', '北京周边最美徒步路线分享。', '## 路线：香山-植物园穿越\n\n全程约 12 公里，累计爬升 600 米，适合初级徒步爱好者。\n\n### 装备建议\n- 登山鞋（必备）\n- 2L 饮用水\n- 防晒霜\n- 能量棒\n\n### 沿途风景\n秋天的香山红叶确实美得令人窒息，推荐 10 月底前往。', NULL, 'PUBLISHED', 1, 0, 640, 15, 2, '2026-07-05 16:00:00', '2026-07-05 16:00:00'),
('我的 NAS 搭建方案', 'my-nas-setup', '从硬件选择到系统配置的完整 NAS 方案。', '## 硬件清单\n\n| 组件 | 型号 | 价格 |\n|------|------|------|\n| CPU | Intel N100 | 600 |\n| 主板 | 畅网 N100 | 800 |\n| 内存 | 16GB DDR5 | 350 |\n| 硬盘 | 西数 4TB × 2 | 1400 |\n\n## 系统选择\n\n我使用了 Unraid 系统，支持 Docker 和虚拟机，灵活度很高。\n\n## Docker 服务\n\n- Jellyfin 媒体中心\n- NextCloud 私有云盘\n- Home Assistant 智能家居\n- Nginx Proxy Manager 反向代理', NULL, 'PUBLISHED', 1, 0, 1200, 28, 1, '2026-07-12 20:00:00', '2026-08-01 08:00:00'),
('React Server Components 深入理解', 'react-server-components', 'RSC 的本质与最佳实践（草稿）', '这是一篇关于 RSC 的深入文章...仍在写作中。', NULL, 'DRAFT', 0, 0, 0, 0, 1, '2026-07-30 22:00:00', '2026-07-30 22:00:00'),
('2026年个人年度总结', '2026-year-review', '回顾这一年的成长与收获（草稿）', '## 技术成长\n\n## 读书清单\n\n## 旅行足迹\n\n等待年底补充...', NULL, 'DRAFT', 0, 0, 0, 0, 2, '2026-07-31 23:00:00', '2026-07-31 23:00:00');

-- 视频（4个）
INSERT INTO t_video (title, slug, summary, cover_image, url, source, duration, visible, sort_order, click_count, like_count, category_id, create_time) VALUES
('Spring Boot 项目结构最佳实践', 'spring-boot-structure', '探讨如何组织大型 Spring Boot 项目的目录结构。', NULL, 'https://www.bilibili.com/video/BV1xx411c7mD', 'BILIBILI', '25:30', 1, 1, 450, 12, 1, '2026-06-10 12:00:00'),
('Docker Compose 编排微服务', 'docker-compose-microservices', '使用 Docker Compose 一键启动多服务开发环境。', NULL, 'https://www.youtube.com/watch?v=demo123', 'YOUTUBE', '18:20', 1, 2, 320, 8, 1, '2026-06-18 15:00:00'),
('Vlog | 一个人去大理发呆的三天', 'travel-dali-vlog', '大理三天慢生活记录。', NULL, 'https://www.bilibili.com/video/BV1xx411c8nE', 'BILIBILI', '12:15', 1, 3, 780, 22, 2, '2026-07-01 10:00:00'),
('我的桌面搭建方案', 'desk-setup-tour', '2026版桌面配置全览，无线化办公体验。', NULL, '/uploads/videos/desk-setup.mp4', 'SELF', '08:45', 1, 4, 210, 6, 1, '2026-07-15 18:00:00');

-- 图集（2个）
INSERT INTO t_image_group (title, slug, description, cover_image, visible, sort_order, click_count, like_count, create_time) VALUES
('大理旅行相册', 'dali-travel-photos', '2026年夏天的大理之旅，蓝天白云苍山洱海。', NULL, 1, 1, 350, 14, '2026-07-02 12:00:00'),
('桌面美学', 'desk-aesthetics', '桌面布置灵感合集，极简主义风格。', NULL, 1, 2, 280, 9, '2026-07-16 20:00:00');

-- 图片（每个图集3张，共6张）
INSERT INTO t_image (group_id, url, thumbnail_url, alt_text, sort_order) VALUES
(1, '/uploads/images/dali-1.jpg', '/uploads/images/thumb/dali-1.jpg', '洱海日出', 1),
(1, '/uploads/images/dali-2.jpg', '/uploads/images/thumb/dali-2.jpg', '大理古城', 2),
(1, '/uploads/images/dali-3.jpg', '/uploads/images/thumb/dali-3.jpg', '苍山远眺', 3),
(2, '/uploads/images/desk-1.jpg', '/uploads/images/thumb/desk-1.jpg', '全景', 1),
(2, '/uploads/images/desk-2.jpg', '/uploads/images/thumb/desk-2.jpg', '桌面特写', 2),
(2, '/uploads/images/desk-3.jpg', '/uploads/images/thumb/desk-3.jpg', '灯光氛围', 3);

-- 歌词（3首）
INSERT INTO t_audio_lyric (title, artist, content) VALUES
('夜空中最亮的星', '逃跑计划', '[ti:夜空中最亮的星]\n[ar:逃跑计划]\n[00:00.00]夜空中最亮的星\n[00:15.00]能否听清\n[00:19.00]那仰望的人\n[00:22.00]心底的孤独和叹息\n[00:30.00]夜空中最亮的星\n[00:35.00]能否记起\n[00:39.00]曾与我同行\n[00:42.00]消失在风里的身影'),
('晴天', '周杰伦', '[ti:晴天]\n[ar:周杰伦]\n[00:00.00]故事的小黄花\n[00:04.00]从出生那年就飘着\n[00:08.00]童年的荡秋千\n[00:11.00]随记忆一直晃到现在'),
('起风了', '买辣椒也用券', '[ti:起风了]\n[ar:买辣椒也用券]\n[00:00.00]这一路上走走停停\n[00:04.00]顺着少年漂流的痕迹\n[00:08.00]迈出车站的前一刻\n[00:11.00]竟有些犹豫');

-- 音频/音乐（5首）
INSERT INTO t_audio (title, slug, artist, album, cover_image, url, lyric_id, duration, visible, sort_order, click_count, like_count, category_id, create_time) VALUES
('夜空中最亮的星', 'brightest-star', '逃跑计划', '世界', NULL, '/uploads/audio/brightest-star.mp3', 1, '04:12', 1, 1, 520, 18, 3, '2026-06-05 10:00:00'),
('晴天', 'sunny-day', '周杰伦', '叶惠美', NULL, '/uploads/audio/sunny-day.mp3', 2, '04:30', 1, 2, 890, 35, 3, '2026-06-05 11:00:00'),
('起风了', 'wind-rises', '买辣椒也用券', '起风了', NULL, '/uploads/audio/wind-rises.mp3', 3, '05:25', 1, 3, 670, 22, 3, '2026-06-08 14:00:00'),
('Lemon', 'lemon', '米津玄师', 'STRAY SHEEP', NULL, '/uploads/audio/lemon.mp3', NULL, '04:16', 1, 4, 430, 15, 3, '2026-06-12 09:00:00'),
('卡农 (钢琴版)', 'canon-piano', 'Various Artists', '经典钢琴曲集', NULL, '/uploads/audio/canon-piano.mp3', NULL, '05:10', 1, 5, 310, 10, 3, '2026-06-20 16:00:00');

-- 小说（2本）
INSERT INTO t_novel (title, slug, summary, cover_image, author, visible, sort_order, click_count, like_count, category_id, create_time) VALUES
('星辰大海', 'star-ocean', '一艘探索飞船在未知星系中发现了一个古老的文明遗迹，由此揭开了一段横跨万年的秘密。', NULL, '何以晴', 1, 1, 1100, 32, 4, '2026-05-01 08:00:00'),
('代码人生', 'code-life', '一个程序员穿越到异世界，用编程思维解决魔法世界问题的奇妙故事。', NULL, '何以晴', 1, 2, 760, 19, 4, '2026-06-01 08:00:00');

-- 小说章节（每本3章，共6章）
INSERT INTO t_novel_chapter (novel_id, title, content, chapter_num, word_count, click_count, create_time) VALUES
(1, '序章：启航', '公元 2187 年，人类星际探索舰队「希望号」从地球轨道出发，目的地是距太阳系 12 光年的天苑四星系。船长林星河站在舰桥上，望着逐渐变小的蓝色星球，内心充满了复杂的情绪...', 0, 2100, 450, '2026-05-01 08:00:00'),
(1, '第一章：异星信号', '航行的第三个月，通讯官突然监测到一个持续且有规律的电磁信号。这个信号以特定的频率脉冲，明显不是自然现象所能产生...', 1, 3200, 380, '2026-05-15 10:00:00'),
(1, '第二章：遗迹', '探测器在行星表面着陆后传回了第一组画面。那是一座巨大的金属结构，虽然经历了漫长岁月的侵蚀，但依然能辨认出它曾经是一座宏伟的建筑...', 2, 2800, 320, '2026-06-01 12:00:00'),
(2, '第一章：Bug 穿越', '李明是一个普通的 Java 程序员。那天他在调试一个诡异的 Bug，连续加班三天后，他在工位上睡着了。醒来时发现自己躺在一片茂密的森林中...', 1, 2500, 310, '2026-06-01 08:00:00'),
(2, '第二章：魔法即代码', '经过几天的摸索，李明发现这个世界的魔法本质上就是一种编程语言。咒语是函数调用，魔法阵是算法流程图，魔杖是编译器...', 2, 2600, 280, '2026-06-15 10:00:00'),
(2, '第三章：第一个「程序」', '李明决定写一个简单的「Hello World」——让一块石头悬浮起来。他仔细研究了魔法书上的符文结构，发现它们和正则表达式惊人地相似...', 3, 2400, 240, '2026-07-01 14:00:00');

-- 日记（4篇：2篇公开 + 2篇私密）
INSERT INTO t_diary (title, content, mood, weather, encrypted, diary_date, create_time) VALUES
('今天天气真好', '阳光透过窗户洒在键盘上，泡了一杯龙井，开始新的一天。上午写完了 Spring Boot 的文章初稿，下午去公园走了走。湖边的柳树已经绿了，春天来了。', 'HAPPY', 'SUNNY', 0, '2026-07-20', '2026-07-20 22:00:00'),
('下雨天的碎碎念', '下雨了，在家宅了一天。看了三集《三体》动画，感觉还不错。晚上煮了一锅番茄牛腩，暖呼呼的很治愈。', 'NEUTRAL', 'RAINY', 0, '2026-07-25', '2026-07-25 21:30:00'),
('一些不想公开的想法', '最近在思考职业发展的方向，有很多不确定性。也许应该更勇敢地走出舒适区。', 'SAD', 'CLOUDY', 1, '2026-07-28', '2026-07-28 23:00:00'),
('密码相关笔记', '服务器密码已更新，新密码使用了更复杂的组合。备份密钥存放在安全位置。', 'NEUTRAL', 'SUNNY', 1, '2026-08-01', '2026-08-01 09:00:00');

-- 备忘录（4条：2条完成 + 2条未完成，1条私密）
INSERT INTO t_memo (title, content, completed, encrypted, sort_order, create_time) VALUES
('更新网站代码', '将最新版本的代码推送到 GitHub 并部署到服务器。', 1, 0, 1, '2026-07-10 09:00:00'),
('买生日礼物', '给XX准备生日礼物（他喜欢摄影，可以考虑一个镜头）。', 0, 0, 2, '2026-07-15 14:00:00'),
('整理 NAS 文件', 'NAS 上的文件需要重新分类整理，尤其是照片目录。', 1, 0, 3, '2026-07-18 10:00:00'),
('服务器续费提醒', '阿里云服务器 2026年9月到期，需要提前一个月续费。预算约 3000元/年。', 0, 1, 4, '2026-07-20 08:00:00');

-- 说说（6条）
INSERT INTO t_moment (content, images, visible, click_count, like_count, create_time) VALUES
('新部署了一套 NAS，All in One 方案，功耗只有15W，太爽了！😄', NULL, 1, 180, 8, '2026-07-10 15:30:00'),
('今天的咖啡特别好喝，大概是因为终于把那个 Bug 修好了 ☕', NULL, 1, 95, 5, '2026-07-12 10:00:00'),
('分享一组周末拍的照片 📸', '["/uploads/images/moment-1.jpg","/uploads/images/moment-2.jpg","/uploads/images/moment-3.jpg"]', 1, 220, 12, '2026-07-14 18:00:00'),
('尝试了一下 Rust 语言，所有权机制确实很有意思，但学习曲线是真的陡 🤔', NULL, 1, 150, 7, '2026-07-18 21:00:00'),
('买了一台 3D 打印机，第一个作品是一个猫猫模型，虽然耳朵打歪了但是还是很可爱 🐱', NULL, 1, 260, 15, '2026-07-22 14:00:00'),
('晚上吃了一碗超级好吃的拉面，汤底熬了据说12小时，值得一试 🍜', NULL, 1, 130, 6, '2026-07-28 20:00:00');

-- 友链（4个）
INSERT INTO t_friend_link (name, url, description, logo, visible, sort_order, create_time) VALUES
('阮一峰的网络日志', 'https://www.ruanyifeng.com', '科技爱好者周刊，每周五更新。', NULL, 1, 1, '2026-06-01 10:00:00'),
('CoolShell', 'https://coolshell.cn', '陈皓的技术博客（R.I.P. 🕯️）', NULL, 1, 2, '2026-06-01 11:00:00'),
('Hacker News', 'https://news.ycombinator.com', '技术新闻聚合站，每日必读。', NULL, 1, 3, '2026-06-05 09:00:00'),
('小众软件', 'https://www.appinn.com', '发现好用的小众软件工具。', NULL, 1, 4, '2026-06-10 14:00:00');

-- 点赞记录（模拟不同 IP 的点赞行为，覆盖多个内容类型）
INSERT INTO t_like (target_type, target_id, ip, create_time) VALUES
('article', 1, '192.168.1.100', '2026-07-01 10:00:00'),
('article', 1, '192.168.1.101', '2026-07-02 11:00:00'),
('article', 2, '192.168.1.100', '2026-07-03 14:00:00'),
('video', 1, '192.168.1.102', '2026-07-05 16:00:00'),
('audio', 2, '192.168.1.103', '2026-07-08 09:00:00'),
('audio', 2, '192.168.1.100', '2026-07-09 10:00:00'),
('novel', 1, '192.168.1.104', '2026-07-10 13:00:00'),
('moment', 3, '192.168.1.105', '2026-07-15 18:00:00');

-- 访问日志（模拟30天 × 每天若干条，覆盖各地IP）
INSERT INTO t_visit_log (ip, ip_location, user_agent, browser, os, device_type, referer, target_url, session_id, create_time) VALUES
('123.45.67.89', '北京 BEIJING', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0', 'Chrome', 'Windows', 'PC', NULL, '/articles/spring-boot-3-guide', 'sess-001', '2026-08-01 08:00:00'),
('123.45.67.89', '北京 BEIJING', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0', 'Chrome', 'Windows', 'PC', '/articles/spring-boot-3-guide', '/', 'sess-001', '2026-08-01 08:01:00'),
('222.128.1.100', '上海 SHANGHAI', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0) AppleWebKit/605.1.15', 'Safari', 'iOS', 'Mobile', 'https://www.google.com', '/articles/typescript-advanced-types', 'sess-002', '2026-08-01 09:00:00'),
('58.33.12.56', '上海 SHANGHAI', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) Safari/17.5', 'Safari', 'macOS', 'PC', NULL, '/', 'sess-003', '2026-08-01 09:30:00'),
('113.87.65.43', '深圳 SHENZHEN', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/126.0.0.0', 'Edge', 'Windows', 'PC', NULL, '/videos', 'sess-004', '2026-08-01 10:00:00'),
('180.169.100.50', '广州 GUANGZHOU', 'Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/126.0.0.0', 'Chrome', 'Android', 'Mobile', 'https://www.baidu.com', '/articles/weekend-hiking', 'sess-005', '2026-08-01 10:15:00'),
('61.135.169.12', '杭州 HANGZHOU', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) Chrome/126.0.0.0', 'Chrome', 'macOS', 'PC', NULL, '/audio', 'sess-006', '2026-08-01 11:00:00'),
('125.70.200.88', '成都 CHENGDU', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/128.0', 'Firefox', 'Windows', 'PC', NULL, '/novels/star-ocean', 'sess-007', '2026-08-01 11:30:00'),
('218.201.10.55', '重庆 CHONGQING', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0) AppleWebKit/605.1.15', 'Safari', 'iOS', 'Mobile', NULL, '/moments', 'sess-008', '2026-08-01 12:00:00'),
('116.25.100.32', '深圳 SHENZHEN', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0', 'Chrome', 'Windows', 'PC', 'https://www.google.com', '/articles/my-nas-setup', 'sess-009', '2026-08-01 13:00:00'),
('219.137.50.100', '广州 GUANGZHOU', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) Chrome/126.0.0.0', 'Chrome', 'macOS', 'PC', NULL, '/', 'sess-010', '2026-08-01 14:00:00'),
('202.96.88.100', '北京 BEIJING', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/126.0.0.0', 'Edge', 'Windows', 'PC', NULL, '/videos/docker-compose-microservices', 'sess-011', '2026-08-01 14:30:00'),
('58.33.12.56', '上海 SHANGHAI', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) Safari/17.5', 'Safari', 'macOS', 'PC', NULL, '/articles/spring-boot-3-guide', 'sess-003', '2026-08-01 09:32:00'),
('101.80.50.200', '南京 NANJING', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0', 'Chrome', 'Windows', 'PC', NULL, '/gallery/dali-travel-photos', 'sess-012', '2026-08-01 15:00:00'),
('111.200.50.100', '武汉 WUHAN', 'Mozilla/5.0 (Linux; Android 14; Samsung S24) Chrome/126.0.0.0', 'Chrome', 'Android', 'Mobile', NULL, '/memos', 'sess-013', '2026-08-01 15:30:00');

-- 点击记录
INSERT INTO t_click_log (target_type, target_id, ip, create_time) VALUES
('article', 1, '192.168.1.100', '2026-08-01 08:00:00'),
('article', 1, '192.168.1.101', '2026-08-01 08:05:00'),
('article', 2, '192.168.1.102', '2026-08-01 09:00:00'),
('article', 3, '192.168.1.103', '2026-08-01 10:00:00'),
('article', 4, '192.168.1.104', '2026-08-01 11:00:00'),
('video', 1, '192.168.1.100', '2026-08-01 12:00:00'),
('video', 3, '192.168.1.101', '2026-08-01 12:30:00'),
('audio', 2, '192.168.1.105', '2026-08-01 13:00:00'),
('novel', 1, '192.168.1.106', '2026-08-01 14:00:00'),
('moment', 4, '192.168.1.107', '2026-08-01 15:00:00'),
('link', 1, '192.168.1.100', '2026-08-01 16:00:00'),
('link', 2, '192.168.1.101', '2026-08-01 16:05:00');
