package com.example.create_user_service.repository;

import com.example.create_user_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // find user by email (used for login or checking duplicates)
    Optional<User> findByEmail(String email);

    // find user by reset token (used for forgot password flow)
    Optional<User> findByResetToken(String resetToken);
}
