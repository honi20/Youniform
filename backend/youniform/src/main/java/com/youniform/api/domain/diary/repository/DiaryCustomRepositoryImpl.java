package com.youniform.api.domain.diary.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.diary.entity.Diary;
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
	public List<Diary> findByUserIdAndCursor(Long userId, LocalDate lastDiaryDate, int pageSize, boolean isAscending) {
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
		log.info(query.toString());

		List<Diary> diaries = query.fetch();
		if (diaries.size() > pageSize) {
			diaries.remove(pageSize);
		}

		return diaries;
	}
}
