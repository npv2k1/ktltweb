package com.app.my_app.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


/**
 * It tells Spring to scan the package com.app.my_app.domain for JPA entities and the package com.app.my_app.repos for
 * Spring Data repositories
 */
@Configuration
@EntityScan("com.app.my_app.domain")
@EnableJpaRepositories("com.app.my_app.repos")
@EnableTransactionManagement
public class DomainConfig {
}
