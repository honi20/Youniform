package com.youniform.api.domain.chat_part.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatPartPK implements Serializable {
  private Long userId;

  private Long roomId;
}