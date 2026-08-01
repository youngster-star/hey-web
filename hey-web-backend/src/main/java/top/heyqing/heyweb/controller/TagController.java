package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Tag;
import top.heyqing.heyweb.service.TagService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping("/api/v1/public/tags")
    public ApiResponse<List<Tag>> getAll() {
        return ApiResponse.success(tagService.getAll());
    }

    @GetMapping("/api/v1/admin/tags/{id}")
    public ApiResponse<Tag> getById(@PathVariable Long id) {
        return ApiResponse.success(tagService.getById(id));
    }

    @PostMapping("/api/v1/admin/tags")
    public ApiResponse<Tag> create(@RequestBody Tag tag) {
        return ApiResponse.success(tagService.create(tag));
    }

    @PutMapping("/api/v1/admin/tags/{id}")
    public ApiResponse<Tag> update(@PathVariable Long id, @RequestBody Tag tag) {
        return ApiResponse.success(tagService.update(id, tag));
    }

    @DeleteMapping("/api/v1/admin/tags/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        tagService.delete(id);
        return ApiResponse.success();
    }
}
