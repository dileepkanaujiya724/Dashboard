package com.example.create_user_service.service;

import com.example.create_user_service.entity.User;
import com.example.create_user_service.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    // constructor injection (best practice)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // create a new user
    public User createUser(String email, String name, String password) {
        // check if email already exists
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User(email, name, password);
        return userRepository.save(user);
    }

    // find all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // find by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // find by id
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    // save updated user
    public User save(User user) {
        return userRepository.save(user);
    }

    // set reset token and expiry
    public void setResetToken(Long id, String token, Instant expiry) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setResetToken(token);
            user.setResetTokenExpiry(expiry);
            userRepository.save(user);
        }
    }

    // find by reset token
    public Optional<User> findByResetToken(String token) {
        return userRepository.findByResetToken(token);
    }
}
