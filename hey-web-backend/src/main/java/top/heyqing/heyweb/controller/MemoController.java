package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Memo;
import top.heyqing.heyweb.service.MemoService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    @GetMapping("/api/v1/public/memos")
    public ApiResponse<List<Memo>> getPublicMemos() {
        return ApiResponse.success(memoService.getPublicMemos());
    }

    @GetMapping("/api/v1/admin/memos")
    public ApiResponse<List<Memo>> getAll() {
        return ApiResponse.success(memoService.getAll());
    }

    @PostMapping("/api/v1/admin/memos")
    public ApiResponse<Memo> create(@RequestBody Memo memo) {
        return ApiResponse.success(memoService.create(memo));
    }

    @PutMapping("/api/v1/admin/memos/{id}")
    public ApiResponse<Memo> update(@PathVariable Long id, @RequestBody Memo memo) {
        return ApiResponse.success(memoService.update(id, memo));
    }

    @DeleteMapping("/api/v1/admin/memos/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        memoService.delete(id);
        return ApiResponse.success();
    }
}
