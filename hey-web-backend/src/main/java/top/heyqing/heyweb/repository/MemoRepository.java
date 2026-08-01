package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.Memo;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    List<Memo> findByEncryptedFalseOrderBySortOrderAsc();
    List<Memo> findAllByOrderBySortOrderAsc();
    List<Memo> findByCompletedOrderBySortOrderAsc(Boolean completed);
}
