package com.daehee.cryptomock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class CyrpytomockApplication {

    public static void main(String[] args) {
        SpringApplication.run(CyrpytomockApplication.class, args);
    }

}
