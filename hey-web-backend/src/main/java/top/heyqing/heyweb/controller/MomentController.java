package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Moment;
import top.heyqing.heyweb.service.MomentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MomentController {

    private final MomentService momentService;

    @GetMapping("/api/v1/public/moments")
    public ApiResponse<List<Moment>> getPublicMoments() {
        return ApiResponse.success(momentService.getPublicMoments());
    }

    @GetMapping("/api/v1/admin/moments")
    public ApiResponse<List<Moment>> getAll() {
        return ApiResponse.success(momentService.getAll());
    }

    @PostMapping("/api/v1/admin/moments")
    public ApiResponse<Moment> create(@RequestBody Moment moment) {
        return ApiResponse.success(momentService.create(moment));
    }

    @PutMapping("/api/v1/admin/moments/{id}")
    public ApiResponse<Moment> update(@PathVariable Long id, @RequestBody Moment moment) {
        return ApiResponse.success(momentService.update(id, moment));
    }

    @DeleteMapping("/api/v1/admin/moments/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        momentService.delete(id);
        return ApiResponse.success();
    }
}
