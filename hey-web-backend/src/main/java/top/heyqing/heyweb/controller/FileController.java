package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.service.OssService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/upload")
@RequiredArgsConstructor
public class FileController {

    private final OssService ossService;

    @PostMapping
    public ApiResponse<Map<String, String>> upload(@RequestParam("file") MultipartFile file) {
        String url = ossService.upload(file);
        Map<String, String> result = new HashMap<>();
        result.put("url", url);
        result.put("fileName", file.getOriginalFilename());
        return ApiResponse.success(result);
    }
}
