package top.heyqing.heyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import top.heyqing.heyweb.exception.BusinessException;
import top.heyqing.heyweb.model.entity.Category;
import top.heyqing.heyweb.repository.CategoryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAllByOrderBySortOrderAsc();
    }

    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> BusinessException.notFound("分类不存在"));
    }

    @Transactional
    public Category create(Category category) {
        if (categoryRepository.existsByName(category.getName())) {
            throw BusinessException.badRequest("分类名称已存在");
        }
        return categoryRepository.save(category);
    }

    @Transactional
    public Category update(Long id, Category updated) {
        Category category = getById(id);
        if (!category.getName().equals(updated.getName()) && categoryRepository.existsByName(updated.getName())) {
            throw BusinessException.badRequest("分类名称已存在");
        }
        category.setName(updated.getName());
        category.setSlug(updated.getSlug());
        category.setDescription(updated.getDescription());
        category.setSortOrder(updated.getSortOrder());
        return categoryRepository.save(category);
    }

    @Transactional
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
