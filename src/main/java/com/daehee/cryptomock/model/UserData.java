package com.daehee.cryptomock.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("userdata")
public class UserData {

    @Id
    private String id;

    private String name;
    private String email;
    private String history;
    private int cash;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    public UserData(String name, String email, String history, int cash) {
        super();
        this.name = name;
        this.email = email;
        this.history = history;
        this.cash = cash;
    }
}
