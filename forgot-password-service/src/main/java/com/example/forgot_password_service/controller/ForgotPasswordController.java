package com.example.forgot_password_service.controller;

import com.example.forgot_password_service.entity.User;
import com.example.forgot_password_service.repository.UserRepository;
import com.example.forgot_password_service.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/forgot")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ================================
    // 1️⃣ REQUEST RESET LINK
    // ================================
    @PostMapping("/request")
    public ResponseEntity<Map<String, String>> requestReset(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        Map<String, String> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(email);

        // Anti-enumeration response
        if (userOpt.isEmpty()) {
            response.put("message", "If an account with that email exists, a reset link has been sent.");
            return ResponseEntity.ok(response);
        }

        User user = userOpt.get();

        // Generate token
        String token = UUID.randomUUID().toString();

        user.setResetToken(token);
        user.setResetTokenExpiry(Instant.now().plusSeconds(3600)); // 1 hour
        userRepository.save(user);

        emailService.sendResetEmail(email, token);

        response.put("message", "Reset link sent successfully!");
        return ResponseEntity.ok(response);
    }

    // ================================
    // 2️⃣ RESET PASSWORD
    // ================================
    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {

        Map<String, String> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByResetToken(token);

        if (userOpt.isEmpty()) {
            response.put("message", "Invalid token!");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOpt.get();

        if (user.getResetTokenExpiry() == null || user.getResetTokenExpiry().isBefore(Instant.now())) {
            response.put("message", "Token expired!");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        response.put("message", "Password reset successful!");
        return ResponseEntity.ok(response);
    }
}
