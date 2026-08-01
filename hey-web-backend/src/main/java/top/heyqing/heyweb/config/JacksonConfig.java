package top.heyqing.heyweb.config;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public Module hibernate6Module() {
        Hibernate6Module module = new Hibernate6Module();
        // 延迟加载字段序列化为 null，而不是抛异常
        module.disable(Hibernate6Module.Feature.USE_TRANSIENT_ANNOTATION);
        // 不强制加载懒加载属性
        module.disable(Hibernate6Module.Feature.FORCE_LAZY_LOADING);
        return module;
    }
}
