package com.youniform.api.domain.user.repository;

import com.youniform.api.domain.user.dto.MyDetailsRes;
import com.youniform.api.domain.user.entity.Users;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<Users, Long>, UserCustomRepository {
    Users findByEmail(String email);

    Optional<Users> findByUuid(String uuid);

    Users findById(long id);

    Users findByNickname(String nickname);

    List<Users> findAllByPushAlertTrue();

    @Query("SELECT u FROM Users u " +
            "WHERE u.nickname LIKE %:nickname% " +
            "ORDER BY CASE WHEN u.nickname = :nickname THEN 1 ELSE 2 END, u.nickname")
    List<Users> findUsersByNickname(@Param("nickname") String nickname);
}
