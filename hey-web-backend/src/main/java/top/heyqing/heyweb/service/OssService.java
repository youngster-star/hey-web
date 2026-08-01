package top.heyqing.heyweb.service;

import cn.hutool.core.util.IdUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * OSS 文件存储服务
 * 当前使用本地存储模拟，后续替换为阿里云 OSS / 腾讯云 COS SDK
 */
@Slf4j
@Service
public class OssService {

    @Value("${oss.upload-dir:uploads}")
    private String uploadDir;

    @Value("${oss.base-url:http://localhost:8080/uploads}")
    private String baseUrl;

    public String upload(MultipartFile file) {
        try {
            String datePath = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
            String ext = getExtension(file.getOriginalFilename());
            String fileName = IdUtil.fastSimpleUUID() + "." + ext;
            String relativePath = datePath + "/" + fileName;

            Path fullPath = Paths.get(uploadDir, relativePath);
            Files.createDirectories(fullPath.getParent());
            file.transferTo(fullPath.toFile());

            String url = baseUrl + "/" + relativePath.replace("\\", "/");
            log.info("File uploaded: {}", url);
            return url;
        } catch (IOException e) {
            throw new RuntimeException("文件上传失败", e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null) return "unknown";
        int dot = filename.lastIndexOf('.');
        return dot > -1 ? filename.substring(dot + 1) : "unknown";
    }
}
