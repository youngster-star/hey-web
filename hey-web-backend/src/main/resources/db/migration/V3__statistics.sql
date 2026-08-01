-- V3__statistics.sql - 第三阶段：访问统计

-- 访问日志表
CREATE TABLE t_visit_log (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    ip          VARCHAR(45)   NOT NULL,
    ip_location VARCHAR(100)  COMMENT 'IP归属地(省/市)',
    user_agent  TEXT,
    browser     VARCHAR(50),
    os          VARCHAR(50),
    device_type VARCHAR(20)   COMMENT 'PC/Mobile/Tablet',
    referer     VARCHAR(500),
    target_url  VARCHAR(500)  NOT NULL,
    session_id  VARCHAR(64),
    create_time DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_visit_time (create_time),
    INDEX idx_visit_ip (ip),
    INDEX idx_visit_target (target_url)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 点击记录表
CREATE TABLE t_click_log (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    target_type VARCHAR(30)  NOT NULL COMMENT '目标类型: article/video/audio/novel/moment/link',
    target_id   BIGINT       NOT NULL,
    ip          VARCHAR(45)  NOT NULL,
    create_time DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_click_target (target_type, target_id),
    INDEX idx_click_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 为内容表添加必要的点击/点赞计数（已有字段的表跳过）
-- t_article, t_video, t_audio, t_novel, t_moment, t_image_group 已有 click_count/like_count
