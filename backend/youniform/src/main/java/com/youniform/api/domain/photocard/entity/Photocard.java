package com.youniform.api.domain.photocard.entity;

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
public class Photocard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "photocard_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private Users user;

	private String name;

	private String description;

	private LocalDateTime createdAt;
}
