package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Image;
import top.heyqing.heyweb.model.entity.ImageGroup;
import top.heyqing.heyweb.repository.ImageGroupRepository;
import top.heyqing.heyweb.repository.ImageRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageGroupRepository groupRepository;
    private final ImageRepository imageRepository;

    // ===== 图集 =====
    public List<ImageGroup> getPublicGroups() {
        return groupRepository.findAll();
    }

    public ImageGroup getPublicGroup(String slug) {
        return groupRepository.findBySlug(slug)
                .orElseThrow(() -> BusinessException.notFound("图集不存在"));
    }

    public List<ImageGroup> getAllGroups() {
        return groupRepository.findAll();
    }

    @Transactional
    public ImageGroup createGroup(ImageGroup group) {
        return groupRepository.save(group);
    }

    @Transactional
    public ImageGroup updateGroup(Long id, ImageGroup updated) {
        ImageGroup group = groupRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("图集不存在"));
        group.setTitle(updated.getTitle());
        group.setSlug(updated.getSlug());
        group.setDescription(updated.getDescription());
        group.setCoverImage(updated.getCoverImage());
        group.setVisible(updated.getVisible());
        group.setSortOrder(updated.getSortOrder());
        return groupRepository.save(group);
    }

    @Transactional
    public void deleteGroup(Long id) {
        groupRepository.deleteById(id);
    }

    // ===== 图片 =====
    public List<Image> getImagesByGroup(Long groupId) {
        return imageRepository.findByGroupIdOrderBySortOrderAsc(groupId);
    }

    @Transactional
    public Image addImage(Long groupId, Image image) {
        ImageGroup group = groupRepository.findById(groupId)
                .orElseThrow(() -> BusinessException.notFound("图集不存在"));
        image.setGroup(group);
        return imageRepository.save(image);
    }

    @Transactional
    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }
}
