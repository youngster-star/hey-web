package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.FriendLink;
import top.heyqing.heyweb.repository.FriendLinkRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendLinkService {

    private final FriendLinkRepository friendLinkRepository;

    public List<FriendLink> getPublicLinks() {
        return friendLinkRepository.findByVisibleTrueOrderBySortOrderAsc();
    }

    public List<FriendLink> getAll() {
        return friendLinkRepository.findAll();
    }

    @Transactional
    public FriendLink create(FriendLink link) {
        return friendLinkRepository.save(link);
    }

    @Transactional
    public FriendLink update(Long id, FriendLink updated) {
        FriendLink link = friendLinkRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("友链不存在"));
        link.setName(updated.getName());
        link.setUrl(updated.getUrl());
        link.setDescription(updated.getDescription());
        link.setLogo(updated.getLogo());
        link.setVisible(updated.getVisible());
        link.setSortOrder(updated.getSortOrder());
        return friendLinkRepository.save(link);
    }

    @Transactional
    public void delete(Long id) {
        friendLinkRepository.deleteById(id);
    }
}
