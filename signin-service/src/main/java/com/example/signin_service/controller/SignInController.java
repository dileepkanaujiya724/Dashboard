package com.example.signin_service.controller;

import com.example.signin_service.entity.User;
import com.example.signin_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.signin_service.dto.SignInRequest;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class SignInController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signin")
public ResponseEntity<?> signIn(@RequestBody SignInRequest request) {
    Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

    if (userOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "Email not found"));
    }

    User user = userOptional.get();

    if (!user.getPasswordHash().equals(request.getPassword())) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid password"));
    }

    Map<String, Object> response = new HashMap<>();
    response.put("message", "Login successful");
    response.put("user", user);

    return ResponseEntity.ok(response);
}
}

