package top.heyqing.heyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import top.heyqing.heyweb.model.dto.ApiResponse;
import top.heyqing.heyweb.model.entity.Audio;
import top.heyqing.heyweb.model.entity.AudioLyric;
import top.heyqing.heyweb.service.AudioService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AudioController {

    private final AudioService audioService;

    // ===== 前台 =====
    @GetMapping("/api/v1/public/audio")
    public ApiResponse<List<Audio>> getPublicAudios() {
        return ApiResponse.success(audioService.getPublicAudios());
    }

    @GetMapping("/api/v1/public/audio/{slug}")
    public ApiResponse<Audio> getPublicAudio(@PathVariable String slug) {
        Audio audio = audioService.getPublicAudio(slug);
        audioService.incrementClick(audio.getId());
        return ApiResponse.success(audio);
    }

    @GetMapping("/api/v1/public/audio/lyric/{id}")
    public ApiResponse<AudioLyric> getLyric(@PathVariable Long id) {
        return ApiResponse.success(audioService.getLyric(id));
    }

    // ===== 后台 =====
    @GetMapping("/api/v1/admin/audio")
    public ApiResponse<List<Audio>> getAll() {
        return ApiResponse.success(audioService.getAll());
    }

    @GetMapping("/api/v1/admin/audio/{id}")
    public ApiResponse<Audio> getById(@PathVariable Long id) {
        return ApiResponse.success(audioService.getById(id));
    }

    @PostMapping("/api/v1/admin/audio")
    public ApiResponse<Audio> create(@RequestBody Audio audio) {
        return ApiResponse.success(audioService.create(audio));
    }

    @PutMapping("/api/v1/admin/audio/{id}")
    public ApiResponse<Audio> update(@PathVariable Long id, @RequestBody Audio audio) {
        return ApiResponse.success(audioService.update(id, audio));
    }

    @DeleteMapping("/api/v1/admin/audio/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        audioService.delete(id);
        return ApiResponse.success();
    }

    @PostMapping("/api/v1/admin/audio/lyric")
    public ApiResponse<AudioLyric> createLyric(@RequestBody AudioLyric lyric) {
        return ApiResponse.success(audioService.createLyric(lyric));
    }

    @PutMapping("/api/v1/admin/audio/lyric/{id}")
    public ApiResponse<AudioLyric> updateLyric(@PathVariable Long id, @RequestBody AudioLyric lyric) {
        return ApiResponse.success(audioService.updateLyric(id, lyric));
    }
}
