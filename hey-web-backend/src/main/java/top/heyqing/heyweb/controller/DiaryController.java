package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Diary;
import top.heyqing.heyweb.service.DiaryService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    @GetMapping("/api/v1/public/diary")
    public ApiResponse<List<Diary>> getPublicDiaries() {
        return ApiResponse.success(diaryService.getPublicDiaries());
    }

    @GetMapping("/api/v1/admin/diary")
    public ApiResponse<List<Diary>> getAll() {
        return ApiResponse.success(diaryService.getAll());
    }

    @GetMapping("/api/v1/admin/diary/{id}")
    public ApiResponse<Diary> getById(@PathVariable Long id) {
        return ApiResponse.success(diaryService.getById(id));
    }

    @PostMapping("/api/v1/admin/diary")
    public ApiResponse<Diary> create(@RequestBody Diary diary) {
        return ApiResponse.success(diaryService.create(diary));
    }

    @PutMapping("/api/v1/admin/diary/{id}")
    public ApiResponse<Diary> update(@PathVariable Long id, @RequestBody Diary diary) {
        return ApiResponse.success(diaryService.update(id, diary));
    }

    @DeleteMapping("/api/v1/admin/diary/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        diaryService.delete(id);
        return ApiResponse.success();
    }
}
