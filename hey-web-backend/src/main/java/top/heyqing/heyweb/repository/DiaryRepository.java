package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.Diary;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByEncryptedFalseOrderByDiaryDateDesc();
    List<Diary> findAllByOrderByDiaryDateDesc();
    Optional<Diary> findByDiaryDate(LocalDate date);
}
