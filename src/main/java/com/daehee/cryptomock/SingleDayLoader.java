package com.daehee.cryptomock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.net.URL;

@Component
public class SingleDayLoader implements CommandLineRunner {

    private SingleDayRepo repository;

    @Autowired
    public void DatabaseLoader(SingleDayRepo repository) {
        this.repository = repository;
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

        for (SingleDay singleDay2 : singleDay) {
            this.repository.save(singleDay2);
        }
    }
}