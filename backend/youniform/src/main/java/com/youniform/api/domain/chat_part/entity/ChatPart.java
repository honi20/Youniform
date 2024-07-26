/*
package com.youniform.api.domain.chat_part.entity;

import com.youniform.api.domain.chat_part.entity.ChatPartPK;
import com.youniform.api.domain.user.entity.Users;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatPart {
  @EmbeddedId
  private ChatPartPK chatPartPK;

  @ManyToOne(fetch = FetchType.LAZY)
  @MapsId("userId")
  @JoinColumn(name = "user_id")
  private Users user;

  @ManyToOne(fetch = FetchType.LAZY)
  @MapsId("roomId")
  @JoinColumn(name = "room_id")
  private ChatRoom room;

  private LocalDateTime lastReadTime;
}
 */