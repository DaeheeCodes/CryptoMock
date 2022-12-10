package com.daehee.cryptomock.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daehee.cryptomock.model.UserData;
import com.daehee.cryptomock.repo.UserDataRepo;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class UserDataController {

  @Autowired
  UserDataRepo userDataRepo;

  @GetMapping("/userdata")
  public ResponseEntity<List<UserData>> getAllTutorials(@RequestParam(required = false) String email) {
    try {
      List<UserData> userdata = new ArrayList<UserData>();

      if (email == null)
        userDataRepo.findAll().forEach(userdata::add);
      else
        userDataRepo.findAll().forEach(userdata::add);
      // userDataRepo.findItemByEmail(email).forEach(userdata::add);

      if (userdata.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(userdata, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/userdata/{id}")
  public ResponseEntity<UserData> getTutorialById(@PathVariable("id") String id) {
    Optional<UserData> userData = userDataRepo.findById(id);

    if (userData.isPresent()) {
      return new ResponseEntity<>(userData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/userdata")
  public ResponseEntity<UserData> createTutorial(@RequestBody UserData userdata) {
    try {
      UserData _userdata = userDataRepo
          .save(new UserData(userdata.getUsername(), userdata.getName(), userdata.getEmail(), userdata.getPassword(),
              userdata.getHistory(), userdata.getCash()));
      return new ResponseEntity<>(_userdata, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/userdata/{id}")
  public ResponseEntity<UserData> updateTutorial(@PathVariable("id") String id, @RequestBody UserData userdata) {
    Optional<UserData> userData = userDataRepo.findById(id);

    if (userData.isPresent()) {
      UserData _userdata = userData.get();
      _userdata.setName(userdata.getName());
      _userdata.setEmail(userdata.getEmail());
      _userdata.setHistory(userdata.getHistory());
      _userdata.setCash(userdata.getCash());
      return new ResponseEntity<>(userDataRepo.save(_userdata), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/userdata/{id}")
  public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") String id) {
    try {
      userDataRepo.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/userdata")
  public ResponseEntity<HttpStatus> deleteAllTutorials() {
    try {
      userDataRepo.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /*
   * @GetMapping("/tutorials/published")
   * public ResponseEntity<List<UserData>> findByPublished() {
   * try {
   * List<UserData> tutorials = userDataRepo.findByPublished(true);
   * 
   * if (tutorials.isEmpty()) {
   * return new ResponseEntity<>(HttpStatus.NO_CONTENT);
   * }
   * return new ResponseEntity<>(tutorials, HttpStatus.OK);
   * } catch (Exception e) {
   * return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
   * }
   * }
   */

}