package com.app.my_app.config;

import com.app.my_app.config.jwt.JwtAuthenticationEntryPoint;
import com.app.my_app.config.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)

public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        AppConfig appConfig = new AppConfig();

        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(appConfig.passwordEncoder());
    }


    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors();
        // Chúng tôi không cần CSRF cho ví dụ này
        httpSecurity.csrf().disable()
                // không xác thực yêu cầu cụ thể này
                .authorizeRequests().antMatchers("/authenticate", "/register", "/swagger-ui/**", "/v3/**","/swagger-resources/**", "/", "/js/**", "/css/**", "/img/**", "/demo/**","/api/auth/**").permitAll().
                // tất cả các yêu cầu khác cần được xác thực
                        anyRequest().authenticated().and().
                // đảm bảo rằng chúng tôi sử dụng phiên không trạng thái; phiên sẽ không được sử dụng để
                // lưu trữ trạng thái của người dùng.
                        exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        //Thêm bộ lọc để xác thực mã thông báo với mọi yêu cầu
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }


}