@echo off
chcp 65001 >nul
echo ============================================
echo   清除测试数据 - HeyWeb
echo ============================================
echo.
echo ⚠️  确定要清除所有测试数据吗？（保留管理员账号）
echo.
set /p CONFIRM=输入 Y 确认，其他任意键取消:
if /i not "%CONFIRM%"=="Y" (
    echo 已取消。
    pause
    exit /b
)

echo.
echo 正在连接数据库...
echo 注意：保留 t_user 中的 admin 账号，保留 t_site_config 默认配置

REM 清除所有测试数据，保留 admin 用户和默认配置
mysql -u root -p1234 hey_web -e ^
"SET FOREIGN_KEY_CHECKS=0; ^
DELETE FROM t_click_log; ^
ALTER TABLE t_click_log AUTO_INCREMENT=1; ^
DELETE FROM t_visit_log; ^
ALTER TABLE t_visit_log AUTO_INCREMENT=1; ^
DELETE FROM t_like; ^
ALTER TABLE t_like AUTO_INCREMENT=1; ^
DELETE FROM t_image WHERE id > 0; ^
ALTER TABLE t_image AUTO_INCREMENT=1; ^
DELETE FROM t_image_group; ^
ALTER TABLE t_image_group AUTO_INCREMENT=1; ^
DELETE FROM t_audio_lyric; ^
ALTER TABLE t_audio_lyric AUTO_INCREMENT=1; ^
DELETE FROM t_audio; ^
ALTER TABLE t_audio AUTO_INCREMENT=1; ^
DELETE FROM t_video; ^
ALTER TABLE t_video AUTO_INCREMENT=1; ^
DELETE FROM t_novel_chapter; ^
ALTER TABLE t_novel_chapter AUTO_INCREMENT=1; ^
DELETE FROM t_novel; ^
ALTER TABLE t_novel AUTO_INCREMENT=1; ^
DELETE FROM t_diary; ^
ALTER TABLE t_diary AUTO_INCREMENT=1; ^
DELETE FROM t_memo; ^
ALTER TABLE t_memo AUTO_INCREMENT=1; ^
DELETE FROM t_moment; ^
ALTER TABLE t_moment AUTO_INCREMENT=1; ^
DELETE FROM t_friend_link; ^
ALTER TABLE t_friend_link AUTO_INCREMENT=1; ^
DELETE FROM t_article_tag; ^
DELETE FROM t_article; ^
ALTER TABLE t_article AUTO_INCREMENT=1; ^
DELETE FROM t_tag; ^
ALTER TABLE t_tag AUTO_INCREMENT=1; ^
DELETE FROM t_category; ^
ALTER TABLE t_category AUTO_INCREMENT=1; ^
DELETE FROM t_site_config WHERE id > 3; ^
ALTER TABLE t_site_config AUTO_INCREMENT=4; ^
SET FOREIGN_KEY_CHECKS=1;"

echo.
echo ✅ 测试数据已清除！
echo    保留: admin 账号 和 站点默认配置
echo.
pause
