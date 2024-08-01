package com.youniform.api;

import com.youniform.api.config.RedisTestContainerConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ActiveProfiles("test") // 테스트 시 application-test.properties 사용
@ContextConfiguration(initializers = RedisTestContainerConfig.class)
class ApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
