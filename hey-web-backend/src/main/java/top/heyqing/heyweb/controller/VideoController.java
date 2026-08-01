package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Video;
import top.heyqing.heyweb.service.VideoService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping("/api/v1/public/videos")
    public ApiResponse<List<Video>> getPublicVideos() {
        return ApiResponse.success(videoService.getPublicVideos());
    }

    @GetMapping("/api/v1/public/videos/{slug}")
    public ApiResponse<Video> getPublicVideo(@PathVariable String slug) {
        Video video = videoService.getPublicVideo(slug);
        videoService.incrementClick(video.getId());
        return ApiResponse.success(video);
    }

    @GetMapping("/api/v1/admin/videos")
    public ApiResponse<List<Video>> getAll() {
        return ApiResponse.success(videoService.getAll());
    }

    @GetMapping("/api/v1/admin/videos/{id}")
    public ApiResponse<Video> getById(@PathVariable Long id) {
        return ApiResponse.success(videoService.getById(id));
    }

    @PostMapping("/api/v1/admin/videos")
    public ApiResponse<Video> create(@RequestBody Video video) {
        return ApiResponse.success(videoService.create(video));
    }

    @PutMapping("/api/v1/admin/videos/{id}")
    public ApiResponse<Video> update(@PathVariable Long id, @RequestBody Video video) {
        return ApiResponse.success(videoService.update(id, video));
    }

    @DeleteMapping("/api/v1/admin/videos/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        videoService.delete(id);
        return ApiResponse.success();
    }
}
