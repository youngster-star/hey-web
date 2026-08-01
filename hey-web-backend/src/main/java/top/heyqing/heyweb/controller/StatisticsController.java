package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.service.VisitLogService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final VisitLogService visitLogService;

    @GetMapping
    public ApiResponse<Map<String, Object>> getStats(@RequestParam(defaultValue = "30") int days) {
        return ApiResponse.success(visitLogService.getStats(days));
    }
}
