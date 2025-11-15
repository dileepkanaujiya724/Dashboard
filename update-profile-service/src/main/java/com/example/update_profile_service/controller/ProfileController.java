package com.example.update_profile_service.controller;

import com.example.update_profile_service.entity.User;
import com.example.update_profile_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    // Update profile by user ID
    @PutMapping("/update/{id}")
public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody User updatedUser) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (optionalUser.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    User user = optionalUser.get();

    if (updatedUser.getName() != null) {
        user.setName(updatedUser.getName());
    }

    if (updatedUser.getEmail() != null) {
        user.setEmail(updatedUser.getEmail());
    }

    if (updatedUser.getPasswordHash() != null) {
        user.setPasswordHash(updatedUser.getPasswordHash());
    }

    User savedUser = userRepository.save(user);
    return ResponseEntity.ok(savedUser); // ✅ Return JSON
}

}
