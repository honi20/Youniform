package com.youniform.api.domain.diary.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.diary.entity.Diary;
import com.youniform.api.domain.diary.entity.Scope;
import com.youniform.api.domain.friend.entity.Status;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.youniform.api.domain.diary.entity.QDiary.diary;
import static com.youniform.api.domain.diary.entity.QDiaryStamp.diaryStamp;
import static com.youniform.api.domain.user.entity.QUsers.users;

@Repository
@RequiredArgsConstructor
public class DiaryCustomRepositoryImpl implements DiaryCustomRepository {

	private static final Logger log = LoggerFactory.getLogger(DiaryCustomRepositoryImpl.class);

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Diary> findByUserIdAndCursor(Long userId, Status status, LocalDate lastDiaryDate, int pageSize, boolean isAscending, boolean isUser) {
		JPAQuery<Diary> query = queryFactory.selectFrom(diary)
				.leftJoin(diary.user, users).fetchJoin()
				.leftJoin(diary.stamp, diaryStamp).fetchJoin()
				.where(diary.user.id.eq(userId))
				.orderBy(isAscending ? diary.diaryDate.asc() : diary.diaryDate.desc())
				.limit(pageSize + 1);

		if (isAscending) {
			// diaryDate >= lastDiaryDate
			query.where(diary.diaryDate.goe(lastDiaryDate));
		} else {
			// diaryDate <= lastDiaryDate
			query.where(diary.diaryDate.loe(lastDiaryDate));
		}

		if (!isUser) {
			if (status == Status.FRIEND) {
				query.where(diary.scope.eq(Scope.ALL)
						.or(diary.scope.eq(Scope.FRIENDS)));
			} else {
				query.where(diary.scope.eq(Scope.ALL));
			}
		}

		log.info(query.toString());

		List<Diary> diaries = query.fetch();
		if (diaries.size() > pageSize) {
			diaries.remove(pageSize);
		}

		return diaries;
	}

	@Override
	public List<Diary> findByUserIdAndDate(Long userId, Status status, LocalDate calendarDate, boolean isUser) {
		JPAQuery<Diary> query = queryFactory.selectFrom(diary)
				.leftJoin(diary.user, users).fetchJoin()
				.leftJoin(diary.stamp, diaryStamp).fetchJoin()
				.where(diary.user.id.eq(userId)
						.and(diary.diaryDate.year().eq(calendarDate.getYear()))
						.and(diary.diaryDate.month().eq(calendarDate.getMonthValue())))
				.orderBy(diary.diaryDate.asc());

		if (!isUser) {
			if (status == Status.FRIEND) {
				query.where(diary.scope.eq(Scope.ALL)
						.or(diary.scope.eq(Scope.FRIENDS)));
			} else {
				query.where(diary.scope.eq(Scope.ALL));
			}
		}

		log.info(query.toString());

		return query.fetch();
	}

}
