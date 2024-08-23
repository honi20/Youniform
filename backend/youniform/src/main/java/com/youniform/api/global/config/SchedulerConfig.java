package com.youniform.api.global.config;

import com.youniform.api.domain.alert.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SchedulerConfig {
    private final AlertService alertService;

    @Scheduled(cron = "0 20 22 * * 1")
    public void sendAlert(){
        alertService.sendCleanSweepAlert();
    }
}
