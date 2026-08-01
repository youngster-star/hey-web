-- V4__add_comments.sql - 为所有表和字段添加中文注释

-- =====================================================
-- 用户表
-- =====================================================
ALTER TABLE t_user MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '用户ID';
ALTER TABLE t_user MODIFY COLUMN username    VARCHAR(50)  NOT NULL               COMMENT '用户名';
ALTER TABLE t_user MODIFY COLUMN password    VARCHAR(255) NOT NULL               COMMENT '密码（BCrypt加密）';
ALTER TABLE t_user MODIFY COLUMN nickname    VARCHAR(50)                         COMMENT '昵称/显示名称';
ALTER TABLE t_user MODIFY COLUMN avatar      VARCHAR(200)                        COMMENT '头像URL';
ALTER TABLE t_user MODIFY COLUMN email       VARCHAR(100)                        COMMENT '邮箱';
ALTER TABLE t_user MODIFY COLUMN enabled     TINYINT(1)   NOT NULL DEFAULT 1     COMMENT '是否启用（1=启用 0=禁用）';
ALTER TABLE t_user MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_user MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 分类表
-- =====================================================
ALTER TABLE t_category MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '分类ID';
ALTER TABLE t_category MODIFY COLUMN name        VARCHAR(50)  NOT NULL               COMMENT '分类名称';
ALTER TABLE t_category MODIFY COLUMN slug        VARCHAR(100)                        COMMENT '分类别名（URL标识）';
ALTER TABLE t_category MODIFY COLUMN description VARCHAR(200)                        COMMENT '分类描述';
ALTER TABLE t_category MODIFY COLUMN sort_order  INT          NOT NULL DEFAULT 0     COMMENT '排序序号（升序）';
ALTER TABLE t_category MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_category MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 标签表
-- =====================================================
ALTER TABLE t_tag MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '标签ID';
ALTER TABLE t_tag MODIFY COLUMN name        VARCHAR(50)  NOT NULL               COMMENT '标签名称';
ALTER TABLE t_tag MODIFY COLUMN slug        VARCHAR(100)                        COMMENT '标签别名（URL标识）';
ALTER TABLE t_tag MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_tag MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 文章表
-- =====================================================
ALTER TABLE t_article MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '文章ID';
ALTER TABLE t_article MODIFY COLUMN title       VARCHAR(200) NOT NULL               COMMENT '文章标题';
ALTER TABLE t_article MODIFY COLUMN slug        VARCHAR(200) NOT NULL               COMMENT '文章别名（URL标识）';
ALTER TABLE t_article MODIFY COLUMN summary     TEXT                                 COMMENT '文章摘要';
ALTER TABLE t_article MODIFY COLUMN content     MEDIUMTEXT                           COMMENT '文章正文（Markdown/HTML）';
ALTER TABLE t_article MODIFY COLUMN cover_image VARCHAR(500)                        COMMENT '封面图URL';
ALTER TABLE t_article MODIFY COLUMN status      VARCHAR(20)  NOT NULL DEFAULT 'DRAFT' COMMENT '状态：DRAFT=草稿 PUBLISHED=已发布';
ALTER TABLE t_article MODIFY COLUMN visible     TINYINT(1)   NOT NULL DEFAULT 1     COMMENT '是否前台可见（1=可见 0=隐藏）';
ALTER TABLE t_article MODIFY COLUMN sort_order  INT          NOT NULL DEFAULT 0     COMMENT '自定义排序序号';
ALTER TABLE t_article MODIFY COLUMN pinned      TINYINT(1)   NOT NULL DEFAULT 0     COMMENT '是否置顶（1=置顶 0=否）';
ALTER TABLE t_article MODIFY COLUMN click_count BIGINT       NOT NULL DEFAULT 0     COMMENT '点击量';
ALTER TABLE t_article MODIFY COLUMN like_count  BIGINT       NOT NULL DEFAULT 0     COMMENT '点赞数';
ALTER TABLE t_article MODIFY COLUMN category_id BIGINT                              COMMENT '分类ID（外键）';
ALTER TABLE t_article MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_article MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 文章-标签关联表
-- =====================================================
ALTER TABLE t_article_tag MODIFY COLUMN article_id BIGINT NOT NULL COMMENT '文章ID（外键）';
ALTER TABLE t_article_tag MODIFY COLUMN tag_id     BIGINT NOT NULL COMMENT '标签ID（外键）';

-- =====================================================
-- 点赞记录表
-- =====================================================
ALTER TABLE t_like MODIFY COLUMN id          BIGINT      NOT NULL AUTO_INCREMENT COMMENT '点赞记录ID';
ALTER TABLE t_like MODIFY COLUMN target_type VARCHAR(30) NOT NULL               COMMENT '被点赞目标类型（article/video/audio/moment等）';
ALTER TABLE t_like MODIFY COLUMN target_id   BIGINT      NOT NULL               COMMENT '被点赞目标ID';
ALTER TABLE t_like MODIFY COLUMN ip          VARCHAR(45) NOT NULL               COMMENT '点赞者IP地址';
ALTER TABLE t_like MODIFY COLUMN create_time DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间';
ALTER TABLE t_like MODIFY COLUMN update_time DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 站点配置表
-- =====================================================
ALTER TABLE t_site_config MODIFY COLUMN id           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '配置项ID';
ALTER TABLE t_site_config MODIFY COLUMN config_key   VARCHAR(100) NOT NULL               COMMENT '配置键名';
ALTER TABLE t_site_config MODIFY COLUMN config_value TEXT                                 COMMENT '配置值';
ALTER TABLE t_site_config MODIFY COLUMN description  VARCHAR(200)                        COMMENT '配置说明';
ALTER TABLE t_site_config MODIFY COLUMN create_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_site_config MODIFY COLUMN update_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 视频表
-- =====================================================
ALTER TABLE t_video MODIFY COLUMN id          BIGINT        NOT NULL AUTO_INCREMENT COMMENT '视频ID';
ALTER TABLE t_video MODIFY COLUMN title       VARCHAR(200)  NOT NULL               COMMENT '视频标题';
ALTER TABLE t_video MODIFY COLUMN slug        VARCHAR(200)  NOT NULL               COMMENT '视频别名（URL标识）';
ALTER TABLE t_video MODIFY COLUMN summary     TEXT                                  COMMENT '视频简介';
ALTER TABLE t_video MODIFY COLUMN cover_image VARCHAR(500)                         COMMENT '封面图URL';
ALTER TABLE t_video MODIFY COLUMN url         VARCHAR(1000) NOT NULL               COMMENT '视频链接（嵌入iframe或自托管URL）';
ALTER TABLE t_video MODIFY COLUMN source      VARCHAR(30)   NOT NULL DEFAULT 'EMBED' COMMENT '视频来源：EMBED=嵌入 BILIBILI=哔哩哔哩 YOUTUBE=YouTube SELF=自托管';
ALTER TABLE t_video MODIFY COLUMN duration    VARCHAR(20)                          COMMENT '视频时长（如 12:30）';
ALTER TABLE t_video MODIFY COLUMN visible     TINYINT(1)    NOT NULL DEFAULT 1     COMMENT '是否前台可见（1=可见 0=隐藏）';
ALTER TABLE t_video MODIFY COLUMN sort_order  INT           NOT NULL DEFAULT 0     COMMENT '自定义排序序号';
ALTER TABLE t_video MODIFY COLUMN click_count BIGINT        NOT NULL DEFAULT 0     COMMENT '点击量';
ALTER TABLE t_video MODIFY COLUMN like_count  BIGINT        NOT NULL DEFAULT 0     COMMENT '点赞数';
ALTER TABLE t_video MODIFY COLUMN category_id BIGINT                              COMMENT '分类ID（外键）';
ALTER TABLE t_video MODIFY COLUMN create_time DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_video MODIFY COLUMN update_time DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 图集表
-- =====================================================
ALTER TABLE t_image_group MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '图集ID';
ALTER TABLE t_image_group MODIFY COLUMN title       VARCHAR(200) NOT NULL               COMMENT '图集标题';
ALTER TABLE t_image_group MODIFY COLUMN slug        VARCHAR(200) NOT NULL               COMMENT '图集别名（URL标识）';
ALTER TABLE t_image_group MODIFY COLUMN description TEXT                                 COMMENT '图集描述';
ALTER TABLE t_image_group MODIFY COLUMN cover_image VARCHAR(500)                        COMMENT '封面图URL';
ALTER TABLE t_image_group MODIFY COLUMN visible     TINYINT(1)   NOT NULL DEFAULT 1     COMMENT '是否前台可见（1=可见 0=隐藏）';
ALTER TABLE t_image_group MODIFY COLUMN sort_order  INT          NOT NULL DEFAULT 0     COMMENT '自定义排序序号';
ALTER TABLE t_image_group MODIFY COLUMN click_count BIGINT       NOT NULL DEFAULT 0     COMMENT '点击量';
ALTER TABLE t_image_group MODIFY COLUMN like_count  BIGINT       NOT NULL DEFAULT 0     COMMENT '点赞数';
ALTER TABLE t_image_group MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_image_group MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 图片表
-- =====================================================
ALTER TABLE t_image MODIFY COLUMN id            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '图片ID';
ALTER TABLE t_image MODIFY COLUMN group_id      BIGINT       NOT NULL               COMMENT '所属图集ID（外键）';
ALTER TABLE t_image MODIFY COLUMN url           VARCHAR(500) NOT NULL               COMMENT '图片OSS地址';
ALTER TABLE t_image MODIFY COLUMN thumbnail_url VARCHAR(500)                        COMMENT '缩略图OSS地址';
ALTER TABLE t_image MODIFY COLUMN alt_text      VARCHAR(200)                        COMMENT '图片替代文本';
ALTER TABLE t_image MODIFY COLUMN sort_order    INT          NOT NULL DEFAULT 0     COMMENT '排序序号（同一图集内）';
ALTER TABLE t_image MODIFY COLUMN create_time   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_image MODIFY COLUMN update_time   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 音频/音乐表
-- =====================================================
ALTER TABLE t_audio MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '音频ID';
ALTER TABLE t_audio MODIFY COLUMN title       VARCHAR(200) NOT NULL               COMMENT '歌曲/音频标题';
ALTER TABLE t_audio MODIFY COLUMN slug        VARCHAR(200) NOT NULL               COMMENT '音频别名（URL标识）';
ALTER TABLE t_audio MODIFY COLUMN artist      VARCHAR(100)                        COMMENT '歌手/艺术家';
ALTER TABLE t_audio MODIFY COLUMN album       VARCHAR(200)                        COMMENT '专辑名称';
ALTER TABLE t_audio MODIFY COLUMN cover_image VARCHAR(500)                        COMMENT '专辑封面图URL';
ALTER TABLE t_audio MODIFY COLUMN url         VARCHAR(500) NOT NULL               COMMENT '音频文件OSS地址';
ALTER TABLE t_audio MODIFY COLUMN lyric_id    BIGINT                              COMMENT '关联歌词ID（外键）';
ALTER TABLE t_audio MODIFY COLUMN duration    VARCHAR(20)                         COMMENT '音频时长（如 03:45）';
ALTER TABLE t_audio MODIFY COLUMN visible     TINYINT(1)   NOT NULL DEFAULT 1     COMMENT '是否前台可见（1=可见 0=隐藏）';
ALTER TABLE t_audio MODIFY COLUMN sort_order  INT          NOT NULL DEFAULT 0     COMMENT '自定义排序序号';
ALTER TABLE t_audio MODIFY COLUMN click_count BIGINT       NOT NULL DEFAULT 0     COMMENT '点击量';
ALTER TABLE t_audio MODIFY COLUMN like_count  BIGINT       NOT NULL DEFAULT 0     COMMENT '点赞数';
ALTER TABLE t_audio MODIFY COLUMN category_id BIGINT                              COMMENT '分类ID（外键）';
ALTER TABLE t_audio MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_audio MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 歌词表
-- =====================================================
ALTER TABLE t_audio_lyric MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '歌词ID';
ALTER TABLE t_audio_lyric MODIFY COLUMN title       VARCHAR(200)                        COMMENT '歌词对应歌曲名';
ALTER TABLE t_audio_lyric MODIFY COLUMN artist      VARCHAR(100)                        COMMENT '歌词对应歌手';
ALTER TABLE t_audio_lyric MODIFY COLUMN content     MEDIUMTEXT   NOT NULL               COMMENT 'LRC歌词原文';
ALTER TABLE t_audio_lyric MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_audio_lyric MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 小说表
-- =====================================================
ALTER TABLE t_novel MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '小说ID';
ALTER TABLE t_novel MODIFY COLUMN title       VARCHAR(200) NOT NULL               COMMENT '小说标题';
ALTER TABLE t_novel MODIFY COLUMN slug        VARCHAR(200) NOT NULL               COMMENT '小说别名（URL标识）';
ALTER TABLE t_novel MODIFY COLUMN summary     TEXT                                 COMMENT '小说简介';
ALTER TABLE t_novel MODIFY COLUMN cover_image VARCHAR(500)                        COMMENT '封面图URL';
ALTER TABLE t_novel MODIFY COLUMN author      VARCHAR(100)                        COMMENT '作者';
ALTER TABLE t_novel MODIFY COLUMN visible     TINYINT(1)   NOT NULL DEFAULT 1     COMMENT '是否前台可见（1=可见 0=隐藏）';
ALTER TABLE t_novel MODIFY COLUMN sort_order  INT          NOT NULL DEFAULT 0     COMMENT '自定义排序序号';
ALTER TABLE t_novel MODIFY COLUMN click_count BIGINT       NOT NULL DEFAULT 0     COMMENT '点击量';
ALTER TABLE t_novel MODIFY COLUMN like_count  BIGINT       NOT NULL DEFAULT 0     COMMENT '点赞数';
ALTER TABLE t_novel MODIFY COLUMN category_id BIGINT                              COMMENT '分类ID（外键）';
ALTER TABLE t_novel MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_novel MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 小说章节表
-- =====================================================
ALTER TABLE t_novel_chapter MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '章节ID';
ALTER TABLE t_novel_chapter MODIFY COLUMN novel_id    BIGINT       NOT NULL               COMMENT '所属小说ID（外键）';
ALTER TABLE t_novel_chapter MODIFY COLUMN title       VARCHAR(200) NOT NULL               COMMENT '章节标题';
ALTER TABLE t_novel_chapter MODIFY COLUMN content     MEDIUMTEXT                          COMMENT '章节正文';
ALTER TABLE t_novel_chapter MODIFY COLUMN chapter_num INT          NOT NULL               COMMENT '章节序号';
ALTER TABLE t_novel_chapter MODIFY COLUMN word_count  INT          DEFAULT 0             COMMENT '字数统计';
ALTER TABLE t_novel_chapter MODIFY COLUMN click_count BIGINT       NOT NULL DEFAULT 0     COMMENT '点击量';
ALTER TABLE t_novel_chapter MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_novel_chapter MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 日记表
-- =====================================================
ALTER TABLE t_diary MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '日记ID';
ALTER TABLE t_diary MODIFY COLUMN title       VARCHAR(200) NOT NULL               COMMENT '日记标题';
ALTER TABLE t_diary MODIFY COLUMN content     MEDIUMTEXT                          COMMENT '日记正文';
ALTER TABLE t_diary MODIFY COLUMN mood        VARCHAR(30)                         COMMENT '心情：HAPPY=开心 SAD=悲伤 NEUTRAL=平静 EXCITED=兴奋 ANGRY=生气';
ALTER TABLE t_diary MODIFY COLUMN weather     VARCHAR(30)                         COMMENT '天气：SUNNY=晴 CLOUDY=多云 RAINY=雨 SNOWY=雪 WINDY=风';
ALTER TABLE t_diary MODIFY COLUMN encrypted   TINYINT(1)   NOT NULL DEFAULT 0     COMMENT '是否加密（1=仅自己可见 0=公开）';
ALTER TABLE t_diary MODIFY COLUMN diary_date  DATE         NOT NULL               COMMENT '日记日期';
ALTER TABLE t_diary MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_diary MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 备忘录表
-- =====================================================
ALTER TABLE t_memo MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '备忘录ID';
ALTER TABLE t_memo MODIFY COLUMN title       VARCHAR(200) NOT NULL               COMMENT '备忘录标题';
ALTER TABLE t_memo MODIFY COLUMN content     TEXT                                 COMMENT '备忘录内容';
ALTER TABLE t_memo MODIFY COLUMN completed   TINYINT(1)   NOT NULL DEFAULT 0     COMMENT '是否完成（1=已完成 0=未完成）';
ALTER TABLE t_memo MODIFY COLUMN encrypted   TINYINT(1)   NOT NULL DEFAULT 0     COMMENT '是否加密（1=仅自己可见 0=公开）';
ALTER TABLE t_memo MODIFY COLUMN sort_order  INT          NOT NULL DEFAULT 0     COMMENT '自定义排序序号';
ALTER TABLE t_memo MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_memo MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 说说/碎碎念表
-- =====================================================
ALTER TABLE t_moment MODIFY COLUMN id          BIGINT        NOT NULL AUTO_INCREMENT COMMENT '说说ID';
ALTER TABLE t_moment MODIFY COLUMN content     TEXT          NOT NULL               COMMENT '说说内容';
ALTER TABLE t_moment MODIFY COLUMN images      VARCHAR(2000)                        COMMENT '图片URL列表（JSON数组格式）';
ALTER TABLE t_moment MODIFY COLUMN visible     TINYINT(1)    NOT NULL DEFAULT 1     COMMENT '是否前台可见（1=可见 0=隐藏）';
ALTER TABLE t_moment MODIFY COLUMN click_count BIGINT        NOT NULL DEFAULT 0     COMMENT '点击量';
ALTER TABLE t_moment MODIFY COLUMN like_count  BIGINT        NOT NULL DEFAULT 0     COMMENT '点赞数';
ALTER TABLE t_moment MODIFY COLUMN create_time DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_moment MODIFY COLUMN update_time DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 友链表
-- =====================================================
ALTER TABLE t_friend_link MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '友链ID';
ALTER TABLE t_friend_link MODIFY COLUMN name        VARCHAR(100) NOT NULL               COMMENT '友链名称/站点名';
ALTER TABLE t_friend_link MODIFY COLUMN url         VARCHAR(500) NOT NULL               COMMENT '友链URL';
ALTER TABLE t_friend_link MODIFY COLUMN description VARCHAR(200)                        COMMENT '友链描述';
ALTER TABLE t_friend_link MODIFY COLUMN logo        VARCHAR(500)                        COMMENT '友链Logo图片URL';
ALTER TABLE t_friend_link MODIFY COLUMN visible     TINYINT(1)   NOT NULL DEFAULT 1     COMMENT '是否前台可见（1=可见 0=隐藏）';
ALTER TABLE t_friend_link MODIFY COLUMN sort_order  INT          NOT NULL DEFAULT 0     COMMENT '自定义排序序号';
ALTER TABLE t_friend_link MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
ALTER TABLE t_friend_link MODIFY COLUMN update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间';

-- =====================================================
-- 访问日志表
-- =====================================================
ALTER TABLE t_visit_log MODIFY COLUMN id          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '访问记录ID';
ALTER TABLE t_visit_log MODIFY COLUMN ip          VARCHAR(45)  NOT NULL               COMMENT '访客IP地址';
ALTER TABLE t_visit_log MODIFY COLUMN ip_location VARCHAR(100)                        COMMENT 'IP归属地（省/市）';
ALTER TABLE t_visit_log MODIFY COLUMN user_agent  TEXT                                 COMMENT '浏览器User-Agent原始字符串';
ALTER TABLE t_visit_log MODIFY COLUMN browser     VARCHAR(50)                         COMMENT '解析出的浏览器类型';
ALTER TABLE t_visit_log MODIFY COLUMN os          VARCHAR(50)                         COMMENT '解析出的操作系统';
ALTER TABLE t_visit_log MODIFY COLUMN device_type VARCHAR(20)                         COMMENT '设备类型：PC=电脑 Mobile=手机 Tablet=平板';
ALTER TABLE t_visit_log MODIFY COLUMN referer     VARCHAR(500)                        COMMENT '来源页面URL（Referer）';
ALTER TABLE t_visit_log MODIFY COLUMN target_url  VARCHAR(500) NOT NULL               COMMENT '访问的目标页面URL';
ALTER TABLE t_visit_log MODIFY COLUMN session_id  VARCHAR(64)                         COMMENT '会话标识';
ALTER TABLE t_visit_log MODIFY COLUMN create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '访问时间';

-- =====================================================
-- 点击记录表
-- =====================================================
ALTER TABLE t_click_log MODIFY COLUMN id          BIGINT      NOT NULL AUTO_INCREMENT COMMENT '点击记录ID';
ALTER TABLE t_click_log MODIFY COLUMN target_type VARCHAR(30) NOT NULL               COMMENT '目标类型（article/video/audio/novel/moment/link）';
ALTER TABLE t_click_log MODIFY COLUMN target_id   BIGINT      NOT NULL               COMMENT '目标ID';
ALTER TABLE t_click_log MODIFY COLUMN ip          VARCHAR(45) NOT NULL               COMMENT '点击者IP地址';
ALTER TABLE t_click_log MODIFY COLUMN create_time DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '点击时间';
