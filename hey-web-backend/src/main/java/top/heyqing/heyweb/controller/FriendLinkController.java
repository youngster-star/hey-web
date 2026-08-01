package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.FriendLink;
import top.heyqing.heyweb.service.FriendLinkService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FriendLinkController {

    private final FriendLinkService friendLinkService;

    @GetMapping("/api/v1/public/friend-links")
    public ApiResponse<List<FriendLink>> getPublicLinks() {
        return ApiResponse.success(friendLinkService.getPublicLinks());
    }

    @GetMapping("/api/v1/admin/friend-links")
    public ApiResponse<List<FriendLink>> getAll() {
        return ApiResponse.success(friendLinkService.getAll());
    }

    @PostMapping("/api/v1/admin/friend-links")
    public ApiResponse<FriendLink> create(@RequestBody FriendLink link) {
        return ApiResponse.success(friendLinkService.create(link));
    }

    @PutMapping("/api/v1/admin/friend-links/{id}")
    public ApiResponse<FriendLink> update(@PathVariable Long id, @RequestBody FriendLink link) {
        return ApiResponse.success(friendLinkService.update(id, link));
    }

    @DeleteMapping("/api/v1/admin/friend-links/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        friendLinkService.delete(id);
        return ApiResponse.success();
    }
}
