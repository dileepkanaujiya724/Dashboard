package com.example.forgot_password_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetEmail(String to, String token) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dilipk@itio.in");  // CRITICAL
        message.setTo(to);
        message.setSubject("Password Reset Request");

        String link = "http://localhost:3000/reset?token=" + token;
        message.setText("Click below to reset your password:\n\n" + link);

        mailSender.send(message);
    }
}
