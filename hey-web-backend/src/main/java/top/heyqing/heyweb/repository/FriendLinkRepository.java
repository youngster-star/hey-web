package top.heyqing.heyweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import top.heyqing.heyweb.model.entity.FriendLink;

import java.util.List;

public interface FriendLinkRepository extends JpaRepository<FriendLink, Long> {
    List<FriendLink> findByVisibleTrueOrderBySortOrderAsc();
}
