package com.youniform.api.global.dateformat;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateFormatter {
    public static String calculateTime(LocalDateTime date) {
        Duration duration = Duration.between(date, LocalDateTime.now());
        long seconds = duration.getSeconds();

        if (seconds < TIME_MAXIMUM.SEC) {
            return seconds + "초 전";
        } else if ((seconds /= TIME_MAXIMUM.SEC) < TIME_MAXIMUM.MINUTE) {
            return seconds + "분 전";
        } else if ((seconds /= TIME_MAXIMUM.MINUTE) < TIME_MAXIMUM.HOUR) {
            return seconds + "시간 전";
        }

        return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    private static class TIME_MAXIMUM {
        public static final int SEC = 60;
        public static final int MINUTE = 60;
        public static final int HOUR = 24;
    }
}
