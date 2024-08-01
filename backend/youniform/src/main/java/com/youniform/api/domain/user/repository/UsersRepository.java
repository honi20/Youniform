package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}