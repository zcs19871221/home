package com.cs.home;

import com.cs.home.common.StringToPatternFormatterFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

//    @Bean
//    public StringToPatternFormatterFactory decodeUriFormatterFactory() {
//        return new StringToPatternFormatterFactory();
//    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatterForFieldAnnotation(new
                StringToPatternFormatterFactory());
    }
}
