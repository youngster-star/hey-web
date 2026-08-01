package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Moment;
import top.heyqing.heyweb.repository.MomentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MomentService {

    private final MomentRepository momentRepository;

    public List<Moment> getPublicMoments() {
        return momentRepository.findByVisibleTrueOrderByCreateTimeDesc();
    }

    public List<Moment> getAll() {
        return momentRepository.findAll();
    }

    @Transactional
    public Moment create(Moment moment) {
        return momentRepository.save(moment);
    }

    @Transactional
    public Moment update(Long id, Moment updated) {
        Moment moment = momentRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("说说不存在"));
        moment.setContent(updated.getContent());
        moment.setImages(updated.getImages());
        moment.setVisible(updated.getVisible());
        return momentRepository.save(moment);
    }

    @Transactional
    public void delete(Long id) {
        momentRepository.deleteById(id);
    }
}
