package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.user.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
    Optional<Users> findByUuid(String uuid);
    Users findById(long id);
}
