package com.youniform.api.global.mail.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;
    private static final String senderEmail= "palette.youniform@gmail.com";
    private static final Integer LEFTLIMIT = 48;
    private static final Integer RIGHTLIMIT = 122;
    private static final Integer TARGETSTRINGLENGTH = 10;
    private static final String EMAIL_REGEX =
            "^[a-zA-Z0-9_+&*-]+(?:\\." +
                    "[a-zA-Z0-9_+&*-]+)*@" +
                    "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                    "A-Z]{2,7}$";

    public boolean isValidEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public String generateRandomString(){
        Random random = new Random();
        return random.ints(LEFTLIMIT,RIGHTLIMIT + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(TARGETSTRINGLENGTH)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public MimeMessage CreateMail(String uuid, String mail, String verify) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + uuid + "</h1>";
            body += "<h1>" + verify + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    public String sendMail(String mail, String uuid) {
        String verify  = generateRandomString();
        MimeMessage message = CreateMail(uuid, mail, verify);
        javaMailSender.send(message);
        return verify;
    }
}