package com.example.signin_service.service;

import com.example.signin_service.entity.User;
import com.example.signin_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SignInService {

    @Autowired
    private UserRepository userRepository;

    public String signIn(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return "Email not found";
        }

        User user = userOpt.get();

        if (user.getPasswordHash() != null && user.getPasswordHash().equals(password)) {
            return "Login successful! Welcome, " + user.getName();
        } else {
            return "Invalid password";
        }
    }
}
