package com.youniform.api.domain.alert.entity;

import com.youniform.api.domain.user.entity.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Alert {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "alert_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Users user;

	@Column(nullable = false)
	private String content;

	private String link;

	@Column(nullable = false)
	private Boolean isRead;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private AlertType type;
}
