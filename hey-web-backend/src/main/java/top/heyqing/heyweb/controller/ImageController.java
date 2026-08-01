package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Image;
import top.heyqing.heyweb.model.entity.ImageGroup;
import top.heyqing.heyweb.service.ImageService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    // ===== 前台 =====
    @GetMapping("/api/v1/public/gallery")
    public ApiResponse<List<ImageGroup>> getPublicGroups() {
        return ApiResponse.success(imageService.getPublicGroups());
    }

    @GetMapping("/api/v1/public/gallery/{slug}")
    public ApiResponse<ImageGroup> getPublicGroup(@PathVariable String slug) {
        return ApiResponse.success(imageService.getPublicGroup(slug));
    }

    @GetMapping("/api/v1/public/gallery/{groupId}/images")
    public ApiResponse<List<Image>> getImages(@PathVariable Long groupId) {
        return ApiResponse.success(imageService.getImagesByGroup(groupId));
    }

    // ===== 后台 =====
    @GetMapping("/api/v1/admin/gallery")
    public ApiResponse<List<ImageGroup>> getAllGroups() {
        return ApiResponse.success(imageService.getAllGroups());
    }

    @PostMapping("/api/v1/admin/gallery")
    public ApiResponse<ImageGroup> createGroup(@RequestBody ImageGroup group) {
        return ApiResponse.success(imageService.createGroup(group));
    }

    @PutMapping("/api/v1/admin/gallery/{id}")
    public ApiResponse<ImageGroup> updateGroup(@PathVariable Long id, @RequestBody ImageGroup group) {
        return ApiResponse.success(imageService.updateGroup(id, group));
    }

    @DeleteMapping("/api/v1/admin/gallery/{id}")
    public ApiResponse<Void> deleteGroup(@PathVariable Long id) {
        imageService.deleteGroup(id);
        return ApiResponse.success();
    }

    @PostMapping("/api/v1/admin/gallery/{groupId}/images")
    public ApiResponse<Image> addImage(@PathVariable Long groupId, @RequestBody Image image) {
        return ApiResponse.success(imageService.addImage(groupId, image));
    }

    @DeleteMapping("/api/v1/admin/gallery/images/{id}")
    public ApiResponse<Void> deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
        return ApiResponse.success();
    }
}
