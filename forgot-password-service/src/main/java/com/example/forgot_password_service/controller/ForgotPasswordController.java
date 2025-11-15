package com.example.forgot_password_service.controller;

import com.example.forgot_password_service.entity.User;
import com.example.forgot_password_service.repository.UserRepository;
import com.example.forgot_password_service.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
//import java.util.List;
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

@PostMapping("/request")
public String requestReset(@RequestBody Map<String, String> body) {
    String email = body.get("email");
    Optional<User> userOpt = userRepository.findByEmail(email);
    if (userOpt.isEmpty()) {
        throw new RuntimeException("Email not found!");
    }

    User user = userOpt.get();
    String token = UUID.randomUUID().toString();
    user.setResetToken(token);
    user.setResetTokenExpiry(Instant.now().plusSeconds(3600));
    userRepository.save(user);

    emailService.sendResetEmail(email, token); // ✅ Send mail here
    return "Reset token generated successfully and email sent!";
}


    // Reset Password
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

        if (user.getResetTokenExpiry().isBefore(Instant.now())) {
            response.put("message", "Token expired!");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPasswordHash(newPassword);
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        response.put("message", "Password reset successful!");
        return ResponseEntity.ok(response);
    }
}
