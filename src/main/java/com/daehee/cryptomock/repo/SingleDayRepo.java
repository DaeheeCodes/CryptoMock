package com.daehee.cryptomock.repo;

import org.springframework.data.repository.CrudRepository;

import com.daehee.cryptomock.model.SingleDay;

public interface SingleDayRepo extends CrudRepository<SingleDay, String> {

}