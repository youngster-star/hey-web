package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Video;
import top.heyqing.heyweb.repository.VideoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;

    public List<Video> getPublicVideos() {
        return videoRepository.findByVisibleTrueOrderBySortOrderAscCreateTimeDesc();
    }

    public Video getPublicVideo(String slug) {
        return videoRepository.findBySlug(slug)
                .orElseThrow(() -> BusinessException.notFound("视频不存在"));
    }

    public List<Video> getAll() {
        return videoRepository.findAll();
    }

    public Video getById(Long id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("视频不存在"));
    }

    @Transactional
    public Video create(Video video) {
        return videoRepository.save(video);
    }

    @Transactional
    public Video update(Long id, Video updated) {
        Video video = getById(id);
        video.setTitle(updated.getTitle());
        video.setSlug(updated.getSlug());
        video.setSummary(updated.getSummary());
        video.setCoverImage(updated.getCoverImage());
        video.setUrl(updated.getUrl());
        video.setSource(updated.getSource());
        video.setDuration(updated.getDuration());
        video.setVisible(updated.getVisible());
        video.setSortOrder(updated.getSortOrder());
        if (updated.getCategory() != null) video.setCategory(updated.getCategory());
        return videoRepository.save(video);
    }

    @Transactional
    public void delete(Long id) {
        videoRepository.deleteById(id);
    }

    @Transactional
    public void incrementClick(Long id) {
        videoRepository.findById(id).ifPresent(v -> {
            v.setClickCount(v.getClickCount() + 1);
            videoRepository.save(v);
        });
    }
}
