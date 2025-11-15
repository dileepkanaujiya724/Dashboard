package com.example.create_user_service.controller;

import com.example.create_user_service.entity.User;
import com.example.create_user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Create new user
    @PostMapping("/register")
public User registerUser(@RequestBody Map<String, String> userData) {
    String email = userData.get("email");
    String name = userData.get("name");
    String password = userData.get("password");

    Optional<User> existingUser = userRepository.findByEmail(email);
    if (existingUser.isPresent()) {
        throw new RuntimeException("Email already registered!");
    }

    User user = new User();
    user.setEmail(email);
    user.setName(name);
    user.setPasswordHash(password); 

    return userRepository.save(user);
}


    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update user (only name for now)
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userData) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(userData.getName());
        return userRepository.save(user);
    }

    // Set reset token (for forgot password)
    @PostMapping("/{id}/reset-token")
    public String setResetToken(@PathVariable Long id, @RequestBody String token) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setResetToken(token);
        user.setResetTokenExpiry(Instant.now().plusSeconds(3600)); // 1 hour expiry
        userRepository.save(user);

        return "Reset token set successfully";
    }

    // Find user by reset token
    @GetMapping("/reset/{token}")
    public User getUserByResetToken(@PathVariable String token) {
        return userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }
}
