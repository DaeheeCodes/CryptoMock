package com.daehee.cryptomock;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.URL;

@SpringBootApplication
public class CyrpytomockApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(CyrpytomockApplication.class, args);
    }

    @Override
    public void run(String[] args) throws IOException {

        /*
         * File jsonFile = new ClassPathResource("SingleDay.json").getFile();
         * String jsonString = Files.readString(jsonFile.toPath());
         */

        // create ObjectMapper instance
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        // read JSON file and convert to a customer object
        SingleDay singleDay[] = objectMapper.readValue(new URL("https://api.binance.us/api/v3/ticker/24hr"),
                SingleDay[].class);

        // print customer details
        // System.out.println(Arrays.toString(singleDay));
        System.out.println(singleDay[0]);
    }
}

/*
 * > netstat -ano | findstr 8080
 * 
 * TCP 0.0.0.0:*<port used>* 0.0.0.0:0 LISTENING *<pid>*
 * TCP [::]:*<port used>* [::]:0 LISTENING *<pid>*
 * 
 * > taskkill /F /PID
 */