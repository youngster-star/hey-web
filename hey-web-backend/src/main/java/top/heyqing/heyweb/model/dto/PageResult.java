package top.heyqing.heyweb.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResult<T> {

    private List<T> records;
    private long total;
    private int page;
    private int pageSize;

    public static <T> PageResult<T> of(Page<?> page, List<T> records) {
        return new PageResult<>(records, page.getTotalElements(),
                page.getNumber() + 1, page.getSize());
    }

    public static <T> PageResult<T> of(List<T> records, long total, int page, int pageSize) {
        return new PageResult<>(records, total, page, pageSize);
    }
}
