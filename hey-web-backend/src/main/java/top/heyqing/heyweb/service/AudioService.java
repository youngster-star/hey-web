package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Audio;
import top.heyqing.heyweb.model.entity.AudioLyric;
import top.heyqing.heyweb.repository.AudioLyricRepository;
import top.heyqing.heyweb.repository.AudioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AudioService {

    private final AudioRepository audioRepository;
    private final AudioLyricRepository lyricRepository;

    // ===== 音频 =====
    public List<Audio> getPublicAudios() {
        return audioRepository.findAll();
    }

    public Audio getPublicAudio(String slug) {
        return audioRepository.findBySlug(slug)
                .orElseThrow(() -> BusinessException.notFound("音频不存在"));
    }

    public List<Audio> getAll() {
        return audioRepository.findAll();
    }

    public Audio getById(Long id) {
        return audioRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("音频不存在"));
    }

    @Transactional
    public Audio create(Audio audio) {
        return audioRepository.save(audio);
    }

    @Transactional
    public Audio update(Long id, Audio updated) {
        Audio audio = getById(id);
        audio.setTitle(updated.getTitle());
        audio.setSlug(updated.getSlug());
        audio.setArtist(updated.getArtist());
        audio.setAlbum(updated.getAlbum());
        audio.setCoverImage(updated.getCoverImage());
        audio.setUrl(updated.getUrl());
        audio.setDuration(updated.getDuration());
        audio.setVisible(updated.getVisible());
        audio.setSortOrder(updated.getSortOrder());
        if (updated.getLyric() != null) audio.setLyric(updated.getLyric());
        if (updated.getCategory() != null) audio.setCategory(updated.getCategory());
        return audioRepository.save(audio);
    }

    @Transactional
    public void delete(Long id) {
        audioRepository.deleteById(id);
    }

    @Transactional
    public void incrementClick(Long id) {
        audioRepository.findById(id).ifPresent(a -> {
            a.setClickCount(a.getClickCount() + 1);
            audioRepository.save(a);
        });
    }

    // ===== 歌词 =====
    public AudioLyric getLyric(Long id) {
        return lyricRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("歌词不存在"));
    }

    @Transactional
    public AudioLyric createLyric(AudioLyric lyric) {
        return lyricRepository.save(lyric);
    }

    @Transactional
    public AudioLyric updateLyric(Long id, AudioLyric updated) {
        AudioLyric lyric = getLyric(id);
        lyric.setTitle(updated.getTitle());
        lyric.setArtist(updated.getArtist());
        lyric.setContent(updated.getContent());
        return lyricRepository.save(lyric);
    }

    @Transactional
    public void deleteLyric(Long id) {
        lyricRepository.deleteById(id);
    }
}
