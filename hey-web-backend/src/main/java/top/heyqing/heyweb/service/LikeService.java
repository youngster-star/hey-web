package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.model.entity.Like;
import top.heyqing.heyweb.repository.LikeRepository;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;

    @Transactional
    public boolean toggle(String targetType, Long targetId, String ip) {
        var existing = likeRepository.findByTargetTypeAndTargetIdAndIp(targetType, targetId, ip);
        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
            return false; // unliked
        }
        Like like = new Like();
        like.setTargetType(targetType);
        like.setTargetId(targetId);
        like.setIp(ip);
        likeRepository.save(like);
        return true; // liked
    }

    public long count(String targetType, Long targetId) {
        return likeRepository.countByTargetTypeAndTargetId(targetType, targetId);
    }

    public boolean hasLiked(String targetType, Long targetId, String ip) {
        return likeRepository.findByTargetTypeAndTargetIdAndIp(targetType, targetId, ip).isPresent();
    }
}
