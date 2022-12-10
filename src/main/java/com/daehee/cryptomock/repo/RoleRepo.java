package com.daehee.cryptomock.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.daehee.cryptomock.model.ERole;
import com.daehee.cryptomock.model.Role;

public interface RoleRepo extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
