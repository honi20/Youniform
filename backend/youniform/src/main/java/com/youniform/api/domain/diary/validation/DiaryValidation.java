package com.youniform.api.domain.diary.validation;

import com.youniform.api.domain.diary.dto.DiaryContentDto;
import com.youniform.api.domain.diary.dto.DiaryContentObjectDto;
import com.youniform.api.global.exception.CustomException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import static com.youniform.api.global.statuscode.ErrorCode.*;

public class DiaryValidation {
	public static void isInvalidDate(String diaryDate) {
		try {
			LocalDate.parse(diaryDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		} catch (DateTimeParseException e) {
			throw new CustomException(INVALID_DIARY_DATE);
		}
	}

	public static void isInvalidContents(DiaryContentDto contents) {
		if (contents.getVersion().isEmpty()) {
			throw new CustomException(INVALID_DIARY_CONTENTS);
		}

		if (contents.getBackground().isEmpty()) {
			throw new CustomException(INVALID_DIARY_CONTENTS);
		}

		if (contents.getBackgroundImage().getType() == null
				|| !contents.getBackgroundImage().getType().equals("image")) {
			throw new CustomException(INVALID_DIARY_CONTENTS);
		}

		for (DiaryContentObjectDto dto : contents.getObjects()) {
			if (dto.getType() == null
					|| !(dto.getType().equals("image") || dto.getType().equals("textbox"))) {
				throw new CustomException(INVALID_DIARY_CONTENTS);
			}
		}
	}

	public static void isInvalidScope(String scope) {
		if (!(scope.equals("ALL") || scope.equals("FRIENDS") || scope.equals("PRIVATE"))) {
			throw new CustomException(INVALID_DIARY_SCOPE);
		}
	}
}
