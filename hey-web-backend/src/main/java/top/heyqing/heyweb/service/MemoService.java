package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Memo;
import top.heyqing.heyweb.repository.MemoRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

    public List<Memo> getPublicMemos() {
        return memoRepository.findByEncryptedFalseOrderBySortOrderAsc();
    }

    public List<Memo> getAll() {
        return memoRepository.findAllByOrderBySortOrderAsc();
    }

    public Memo getById(Long id) {
        return memoRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("备忘录不存在"));
    }

    @Transactional
    public Memo create(Memo memo) {
        return memoRepository.save(memo);
    }

    @Transactional
    public Memo update(Long id, Memo updated) {
        Memo memo = getById(id);
        memo.setTitle(updated.getTitle());
        memo.setContent(updated.getContent());
        memo.setCompleted(updated.getCompleted());
        memo.setEncrypted(updated.getEncrypted());
        memo.setSortOrder(updated.getSortOrder());
        return memoRepository.save(memo);
    }

    @Transactional
    public void delete(Long id) {
        memoRepository.deleteById(id);
    }
}
