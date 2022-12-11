package com.daehee.cryptomock.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.daehee.cryptomock.model.UserData;

public interface UserDataRepo extends MongoRepository<UserData, String> {

    @Query("{email:'?0'}")
    UserData findItemByEmail(String email);

    @Query("{name:'?0'}")
    UserData findItemByName(String name);

    Optional<UserData> findByName(String name);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<UserData> findByUsername(String username);

    @Query(value = "{name:'?0'}", fields = "{'email' : 1, 'cash' : 1}")
    List<UserData> findAll(String category);

    public long count();

}
