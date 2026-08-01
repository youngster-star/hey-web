package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Diary;
import top.heyqing.heyweb.repository.DiaryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public List<Diary> getPublicDiaries() {
        return diaryRepository.findByEncryptedFalseOrderByDiaryDateDesc();
    }

    public List<Diary> getAll() {
        return diaryRepository.findAllByOrderByDiaryDateDesc();
    }

    public Diary getById(Long id) {
        return diaryRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("日记不存在"));
    }

    @Transactional
    public Diary create(Diary diary) {
        return diaryRepository.save(diary);
    }

    @Transactional
    public Diary update(Long id, Diary updated) {
        Diary diary = getById(id);
        diary.setTitle(updated.getTitle());
        diary.setContent(updated.getContent());
        diary.setMood(updated.getMood());
        diary.setWeather(updated.getWeather());
        diary.setEncrypted(updated.getEncrypted());
        diary.setDiaryDate(updated.getDiaryDate());
        return diaryRepository.save(diary);
    }

    @Transactional
    public void delete(Long id) {
        diaryRepository.deleteById(id);
    }
}
