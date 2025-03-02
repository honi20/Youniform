package com.youniform.api.domain.alert.entity;

import com.youniform.api.domain.user.entity.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

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
	@JoinColumn(name = "receiver_id")
	private Users receiver;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sender_id")
	private Users sender;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private AlertType type;

	private String content;

	private Long pk;

	@Column(nullable = false)
	@ColumnDefault("false")
	private Boolean isRead;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	public void updateIsRead() {
		this.isRead = true;
	}
}
