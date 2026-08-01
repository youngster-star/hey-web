package top.heyqing.heyweb.service;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.useragent.UserAgent;
import cn.hutool.http.useragent.UserAgentUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.lionsoul.ip2region.xdb.Searcher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import top.heyqing.heyweb.model.entity.VisitLog;
import top.heyqing.heyweb.repository.VisitLogRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class VisitLogService {

    private final VisitLogRepository visitLogRepository;
    private Searcher ipSearcher;

    @Value("${ip2region.db-path:classpath:ip2region/ip2region.xdb}")
    private String dbPath;

    @jakarta.annotation.PostConstruct
    public void init() {
        try {
            // IP2Region 默认从 classpath 加载
            ipSearcher = null; // 本地无 xdb 文件时先置空，后续通过下载获取
            log.info("IP2Region searcher init placeholder");
        } catch (Exception e) {
            log.warn("IP2Region init failed: {}", e.getMessage());
        }
    }

    @Async
    public void record(HttpServletRequest request, String targetUrl) {
        try {
            String ip = getClientIp(request);
            String ua = request.getHeader("User-Agent");
            String referer = request.getHeader("Referer");

            UserAgent agent = UserAgentUtil.parse(ua);
            VisitLog log = new VisitLog();
            log.setIp(ip);
            log.setIpLocation(parseLocation(ip));
            log.setUserAgent(ua);
            log.setBrowser(agent.getBrowser().toString());
            log.setOs(agent.getOs().toString());
            log.setDeviceType(agent.isMobile() ? "Mobile" : "PC");
            log.setReferer(referer);
            log.setTargetUrl(targetUrl);
            log.setSessionId(request.getSession().getId());
            log.setCreateTime(LocalDateTime.now());
            visitLogRepository.save(log);
        } catch (Exception e) {
            // 不阻断主流程
        }
    }

    public Map<String, Object> getStats(int days) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);
        Map<String, Object> stats = new LinkedHashMap<>();

        // PV/UV 日趋势
        List<Object[]> dailyRaw = visitLogRepository.dailyStats(since);
        List<Map<String, Object>> daily = new ArrayList<>();
        for (Object[] row : dailyRaw) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("date", row[0].toString());
            item.put("pv", row[1]);
            item.put("uv", row[2]);
            daily.add(item);
        }
        stats.put("daily", daily);

        // 总 PV/UV
        long totalPv = visitLogRepository.countByCreateTimeAfter(since);
        stats.put("totalPv", totalPv);
        stats.put("totalUv", visitLogRepository.count());

        // 地区分布
        List<Object[]> regionRaw = visitLogRepository.regionStats(since);
        List<Map<String, Object>> region = new ArrayList<>();
        for (Object[] row : regionRaw) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("name", row[0]);
            item.put("value", row[1]);
            region.add(item);
        }
        stats.put("region", region);

        // 浏览器
        List<Object[]> browserRaw = visitLogRepository.browserStats(since);
        List<Map<String, Object>> browser = new ArrayList<>();
        for (Object[] row : browserRaw) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("name", row[0]);
            item.put("value", row[1]);
            browser.add(item);
        }
        stats.put("browser", browser);

        // 操作系统
        List<Object[]> osRaw = visitLogRepository.osStats(since);
        List<Map<String, Object>> os = new ArrayList<>();
        for (Object[] row : osRaw) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("name", row[0]);
            item.put("value", row[1]);
            os.add(item);
        }
        stats.put("os", os);

        // 热门页面
        List<Object[]> pageRaw = visitLogRepository.topPages(since);
        List<Map<String, Object>> pages = new ArrayList<>();
        for (Object[] row : pageRaw) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("url", row[0]);
            item.put("count", row[1]);
            pages.add(item);
        }
        stats.put("topPages", pages);

        return stats;
    }

    private String parseLocation(String ip) {
        // 简化版：返回预定义格式；后续可通过 IP2Region xdb 精确查询
        if (StrUtil.isBlank(ip) || "127.0.0.1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)) {
            return "本地";
        }
        if (ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) {
            return "局域网";
        }
        return ip.substring(0, Math.min(ip.lastIndexOf('.'), ip.length()));
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (StrUtil.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (StrUtil.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (StrUtil.isNotBlank(ip) && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }
}
