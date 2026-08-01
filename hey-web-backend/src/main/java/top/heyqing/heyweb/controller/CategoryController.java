package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Category;
import top.heyqing.heyweb.service.CategoryService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/api/v1/public/categories")
    public ApiResponse<List<Category>> getAll() {
        return ApiResponse.success(categoryService.getAll());
    }

    @GetMapping("/api/v1/admin/categories/{id}")
    public ApiResponse<Category> getById(@PathVariable Long id) {
        return ApiResponse.success(categoryService.getById(id));
    }

    @PostMapping("/api/v1/admin/categories")
    public ApiResponse<Category> create(@RequestBody Category category) {
        return ApiResponse.success(categoryService.create(category));
    }

    @PutMapping("/api/v1/admin/categories/{id}")
    public ApiResponse<Category> update(@PathVariable Long id, @RequestBody Category category) {
        return ApiResponse.success(categoryService.update(id, category));
    }

    @DeleteMapping("/api/v1/admin/categories/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ApiResponse.success();
    }
}
