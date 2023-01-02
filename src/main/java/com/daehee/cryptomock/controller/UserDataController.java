package com.daehee.cryptomock.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
import com.daehee.cryptomock.security.services.UserDetailsImpl;
import com.daehee.cryptomock.payload.response.JwtResponse;
import com.daehee.cryptomock.payload.response.MessageResponse;
import com.daehee.cryptomock.security.jwt.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/userDatas")
public class UserDataController {

  private static final Logger logger = LoggerFactory.getLogger(UserDataController.class);

  @Autowired
  UserDataRepo userDataRepo;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  AuthenticationManager authenticationManager;

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/userDatas")
  public ResponseEntity<List<UserData>> getAllUserData(@RequestParam(required = false) String email) {
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

  @GetMapping("/userDatas/{id}")
  public ResponseEntity<UserData> getUserDataById(@PathVariable("id") String id, Authentication authentication) {
    Optional<UserData> userData = userDataRepo.findById(id);
    Optional<UserData> temp = userDataRepo.findById("638b8d00d9cf3102d2dcc638");

    if (authentication != null) {

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      String currentId = userDetails.getId();
      if (Objects.equals(id, currentId)) {
        if (userData.isPresent()) {
          return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
      }
    } else if ("638b8d00d9cf3102d2dcc638".equals(id)) {

      if (temp.isPresent()) {
        return new ResponseEntity<>(temp.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }

    return new ResponseEntity<>(HttpStatus.FORBIDDEN);

  }

  @PostMapping("/userdata")
  public ResponseEntity<UserData> createUserData(@RequestBody UserData userdata) {
    try {
      UserData _userdata = userDataRepo
          .save(new UserData(userdata.getUsername(), userdata.getName(), userdata.getEmail(), userdata.getPassword(),
              userdata.getHistory(), userdata.getCash()));
      return new ResponseEntity<>(_userdata, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/userdata/{id}")
  public ResponseEntity<UserData> updateUserData(@PathVariable("id") String id, @RequestBody UserData userdata,
      Authentication authentication) {
    Optional<UserData> userData = userDataRepo.findById(id);

    if (authentication != null) {

      UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
      String currentId = userDetails.getId();
      if (Objects.equals(id, currentId)) {
        if (userData.isPresent()) {
          UserData _userdata = userData.get();
          _userdata.setName(userdata.getName());
          _userdata.setEmail(userdata.getEmail());
          _userdata.setHistory(userdata.getHistory());
          _userdata.setCash(userdata.getCash());
          userDataRepo.save(_userdata);
          logger.info("success");
          return new ResponseEntity<>(userDataRepo.save(_userdata), HttpStatus.OK);
        }
      } else {
        logger.info("invalid");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
    }
    logger.info("forbidden");
    return new ResponseEntity<>(HttpStatus.FORBIDDEN);

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

}