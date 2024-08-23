package com.youniform.api.domain.player.dto;

import com.youniform.api.domain.player.entity.Player;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PlayerListDto {
    private Long playerId;

    private String name;

    private Integer backNum;

    private String position;

    public static PlayerListDto toDto(Player player) {
        return PlayerListDto.builder()
                .playerId(player.getId())
                .name(player.getName())
                .backNum(player.getBackNum())
                .position(player.getPosition())
                .build();
    }
}
