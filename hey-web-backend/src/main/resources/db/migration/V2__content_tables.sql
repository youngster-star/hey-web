-- V2__content_tables.sql - 第二阶段：内容扩展表

-- 视频表
CREATE TABLE t_video (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    slug         VARCHAR(200) NOT NULL UNIQUE,
    summary      TEXT,
    cover_image  VARCHAR(500),
    url          VARCHAR(1000) NOT NULL COMMENT '视频链接（嵌入或自托管URL）',
    source       VARCHAR(30)  NOT NULL DEFAULT 'EMBED' COMMENT '来源: EMBED/BILIBILI/YOUTUBE/SELF',
    duration     VARCHAR(20)  COMMENT '时长，如 12:30',
    visible      TINYINT(1)   NOT NULL DEFAULT 1,
    sort_order   INT          NOT NULL DEFAULT 0,
    click_count  BIGINT       NOT NULL DEFAULT 0,
    like_count   BIGINT       NOT NULL DEFAULT 0,
    category_id  BIGINT,
    create_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_video_category (category_id),
    INDEX idx_video_visible (visible),
    CONSTRAINT fk_video_category FOREIGN KEY (category_id) REFERENCES t_category(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 图集表
CREATE TABLE t_image_group (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    slug         VARCHAR(200) NOT NULL UNIQUE,
    description  TEXT,
    cover_image  VARCHAR(500),
    visible      TINYINT(1)   NOT NULL DEFAULT 1,
    sort_order   INT          NOT NULL DEFAULT 0,
    click_count  BIGINT       NOT NULL DEFAULT 0,
    like_count   BIGINT       NOT NULL DEFAULT 0,
    create_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 图片表
CREATE TABLE t_image (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    group_id        BIGINT       NOT NULL,
    url             VARCHAR(500) NOT NULL COMMENT 'OSS 图片地址',
    thumbnail_url   VARCHAR(500) COMMENT '缩略图',
    alt_text        VARCHAR(200),
    sort_order      INT          NOT NULL DEFAULT 0,
    create_time     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_image_group (group_id),
    CONSTRAINT fk_image_group FOREIGN KEY (group_id) REFERENCES t_image_group(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 音频/音乐表
CREATE TABLE t_audio (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    slug         VARCHAR(200) NOT NULL UNIQUE,
    artist       VARCHAR(100) COMMENT '歌手/艺术家',
    album        VARCHAR(200) COMMENT '专辑名',
    cover_image  VARCHAR(500) COMMENT '专辑封面',
    url          VARCHAR(500) NOT NULL COMMENT '音频文件 OSS URL',
    lyric_id     BIGINT       COMMENT '关联歌词ID',
    duration     VARCHAR(20)  COMMENT '时长',
    visible      TINYINT(1)   NOT NULL DEFAULT 1,
    sort_order   INT          NOT NULL DEFAULT 0,
    click_count  BIGINT       NOT NULL DEFAULT 0,
    like_count   BIGINT       NOT NULL DEFAULT 0,
    category_id  BIGINT,
    create_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_audio_category (category_id),
    INDEX idx_audio_artist (artist),
    CONSTRAINT fk_audio_category FOREIGN KEY (category_id) REFERENCES t_category(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 歌词表（LRC 格式逐行存储）
CREATE TABLE t_audio_lyric (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200),
    artist      VARCHAR(100),
    content     MEDIUMTEXT   NOT NULL COMMENT 'LRC 歌词原文',
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 小说表
CREATE TABLE t_novel (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    slug         VARCHAR(200) NOT NULL UNIQUE,
    summary      TEXT,
    cover_image  VARCHAR(500),
    author       VARCHAR(100),
    visible      TINYINT(1)   NOT NULL DEFAULT 1,
    sort_order   INT          NOT NULL DEFAULT 0,
    click_count  BIGINT       NOT NULL DEFAULT 0,
    like_count   BIGINT       NOT NULL DEFAULT 0,
    category_id  BIGINT,
    create_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_novel_category (category_id),
    CONSTRAINT fk_novel_category FOREIGN KEY (category_id) REFERENCES t_category(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 小说章节表
CREATE TABLE t_novel_chapter (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    novel_id    BIGINT       NOT NULL,
    title       VARCHAR(200) NOT NULL,
    content     MEDIUMTEXT,
    chapter_num INT          NOT NULL COMMENT '章节序号',
    word_count  INT          DEFAULT 0 COMMENT '字数',
    click_count BIGINT       NOT NULL DEFAULT 0,
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_chapter_novel (novel_id, chapter_num),
    CONSTRAINT fk_chapter_novel FOREIGN KEY (novel_id) REFERENCES t_novel(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 日记表
CREATE TABLE t_diary (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    content     MEDIUMTEXT,
    mood        VARCHAR(30)  COMMENT '心情: HAPPY/SAD/NEUTRAL/EXCITED/...',
    weather     VARCHAR(30)  COMMENT '天气: SUNNY/CLOUDY/RAINY/...',
    encrypted   TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '是否加密（仅自己可见）',
    diary_date  DATE         NOT NULL COMMENT '日记日期',
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_diary_date (diary_date),
    INDEX idx_diary_encrypted (encrypted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 备忘录表
CREATE TABLE t_memo (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    content     TEXT,
    completed   TINYINT(1)   NOT NULL DEFAULT 0,
    encrypted   TINYINT(1)   NOT NULL DEFAULT 0,
    sort_order  INT          NOT NULL DEFAULT 0,
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_memo_completed (completed),
    INDEX idx_memo_encrypted (encrypted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 说说/碎碎念表
CREATE TABLE t_moment (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    content     TEXT         NOT NULL,
    images      VARCHAR(2000) COMMENT '图片URL列表，JSON数组',
    visible     TINYINT(1)   NOT NULL DEFAULT 1,
    click_count BIGINT       NOT NULL DEFAULT 0,
    like_count  BIGINT       NOT NULL DEFAULT 0,
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_moment_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 友链表
CREATE TABLE t_friend_link (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    url         VARCHAR(500) NOT NULL,
    description VARCHAR(200),
    logo        VARCHAR(500),
    visible     TINYINT(1)   NOT NULL DEFAULT 1,
    sort_order  INT          NOT NULL DEFAULT 0,
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
