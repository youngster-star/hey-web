package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Tag;
import top.heyqing.heyweb.repository.TagRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    public Tag getById(Long id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("标签不存在"));
    }

    @Transactional
    public Tag create(Tag tag) {
        if (tagRepository.existsByName(tag.getName())) {
            throw BusinessException.badRequest("标签名称已存在");
        }
        return tagRepository.save(tag);
    }

    @Transactional
    public Tag update(Long id, Tag updated) {
        Tag tag = getById(id);
        if (!tag.getName().equals(updated.getName()) && tagRepository.existsByName(updated.getName())) {
            throw BusinessException.badRequest("标签名称已存在");
        }
        tag.setName(updated.getName());
        tag.setSlug(updated.getSlug());
        return tagRepository.save(tag);
    }

    @Transactional
    public void delete(Long id) {
        tagRepository.deleteById(id);
    }
}
