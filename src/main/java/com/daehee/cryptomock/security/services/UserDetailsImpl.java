package com.daehee.cryptomock.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.daehee.cryptomock.model.UserData;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private String id;

	private String username;

	private String name;

	private String email;

	@JsonIgnore
	private String password;

	private String history;

	private String cash;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(String id, String username, String name, String email, String password, String history,
			String cash,
			Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.name = name;
		this.email = email;
		this.password = password;
		this.history = history;
		this.cash = cash;
		this.authorities = authorities;
	}

	public static UserDetailsImpl build(UserData userData) {
		List<GrantedAuthority> authorities = userData.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());

		return new UserDetailsImpl(
				userData.getId(),
				userData.getUsername(),
				userData.getName(),
				userData.getEmail(),
				userData.getPassword(),
				userData.getHistory(),
				userData.getCash(),
				authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public String getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public String getName() {
		return name;
	}

	public String getHistory() {
		return history;
	}

	public String getCash() {
		return cash;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}
