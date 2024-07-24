package com.youniform.api.domain.message.entity;

import com.youniform.api.domain.post.entity.Post;
import com.youniform.api.domain.post_tag.entity.PostTag;
import com.youniform.api.domain.user.entity.Users;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "message_id")
  private Long id;

  /*
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private ChatPart userId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "room_id")
  private ChatPart roomId;
   */

  private String message;

  private LocalDateTime messageDate;

  private String imgUrl;
}
