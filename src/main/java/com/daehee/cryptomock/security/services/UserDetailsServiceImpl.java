package com.daehee.cryptomock.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daehee.cryptomock.model.UserData;
import com.daehee.cryptomock.repo.UserDataRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserDataRepo userDataRepo;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserData userData = userDataRepo.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserDetailsImpl.build(userData);
	}

}
