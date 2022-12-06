package com.daehee.cryptomock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class CyrpytomockApplication {

    public static void main(String[] args) {
        SpringApplication.run(CyrpytomockApplication.class, args);
    }

}

/*
 * > netstat -ano | findstr 8080
 * 
 * TCP 0.0.0.0:*<port used>* 0.0.0.0:0 LISTENING *<pid>*
 * TCP [::]:*<port used>* [::]:0 LISTENING *<pid>*
 * 
 * > taskkill /F /PID
 * 
 * curl http://localhost:8080/api/singleDays
 *  ./mvnw spring-boot:run
 * 
 */