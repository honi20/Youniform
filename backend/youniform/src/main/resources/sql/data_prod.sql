-- team
INSERT INTO team (team_id, foundation, match_count, rank, win, winning_rate, home_ground, hometown, name)
VALUES (1000, CURRENT_DATE, 3, 1, 2, 66.6, '홈그라운드', '서울', '팀 이름');

-- users
INSERT INTO users (user_id, is_deleted, push_alert, theme, created_at, last_write_diary, team_id, email, introduce,
                   nickname, password, profile_url, provider_type, uuid)
VALUES (123, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1000, 'user1@naver.com', '자기소개111', 'User1',
        '$2a$10$joNMmm0t5dDpM0g5UibESOdk3rBgVvza/yrd0gqZwsIIAdWslwCUG',
        'https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png',
        'local', '1604b772-adc0-4212-8a90-81186c57f598'),
       (124, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1000, 'test@test.com', '자기소개222', 'User2',
        '$2a$10$Uip6WzTSUcBLXVV0LrWvGexHndE7a5DqaIrDa3a7g1XS8n8Inlpe6',
        'https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png',
        'local', '1604b772-adc0-4212-8a90-81186c57f100');

-- stamp
INSERT INTO DIARY_STAMP (img_url)
VALUES ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp1.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp2.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp3.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp4.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp5.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp6.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp7.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp8.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp9.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp10.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp11.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp12.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp13.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp14.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp15.png'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/stamp/stamp16.png');

-- diary
INSERT INTO DIARY (diary_id, user_id, stamp_id, diary_date, scope, img_url)
VALUES (123, 123, 1, '2024-07-31', 'FRIENDS', 'diary1'),
       (124, 123, 1, '2024-07-01', 'ALL', 'diary2'),
       (125, 123, 1, '2024-07-12', 'PRIVATE', 'diary3'),
       (126, 124, 1, '2024-08-01', 'ALL', 'diary4');

-- friend
INSERT INTO FRIEND (user_id, friend_id, status, last_visited)
VALUES (123, 124, 'FRIEND', CURRENT_DATE);
INSERT INTO FRIEND (user_id, friend_id, status, last_visited)
VALUES (124, 123, 'FRIEND', CURRENT_DATE);

-- diary resource : background
INSERT INTO DIARY_RESOURCE (img_url, type, category)
VALUES ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/white/white.png', 'BACKGROUND', 'WHITE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/white/grid_white.png', 'BACKGROUND', 'WHITE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/white/paper_white.png', 'BACKGROUND', 'WHITE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/white/daily_white.png', 'BACKGROUND', 'WHITE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/white/baseball_white.png', 'BACKGROUND',
        'WHITE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/white/retro_white.png', 'BACKGROUND', 'WHITE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/gray/gray.png', 'BACKGROUND', 'GRAY'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/gray/grid_gray.png', 'BACKGROUND', 'GRAY'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/gray/paper_gray.png', 'BACKGROUND', 'GRAY'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/gray/daily_gray.png', 'BACKGROUND', 'GRAY'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/gray/baseball_gray.png', 'BACKGROUND', 'GRAY'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/gray/retro_gray.png', 'BACKGROUND', 'GRAY'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/pink/pink.png', 'BACKGROUND', 'RED'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/pink/grid_pink.png', 'BACKGROUND', 'RED'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/pink/paper_pink.png', 'BACKGROUND', 'RED'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/pink/daily_pink.png', 'BACKGROUND', 'RED'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/pink/baseball_pink.png', 'BACKGROUND', 'RED'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/pink/retro_pink.png', 'BACKGROUND', 'RED'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/orange/orange.png', 'BACKGROUND', 'ORANGE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/orange/grid_orange.png', 'BACKGROUND',
        'ORANGE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/orange/paper_orange.png', 'BACKGROUND',
        'ORANGE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/orange/daily_orange.png', 'BACKGROUND',
        'ORANGE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/orange/baseball_orange.png', 'BACKGROUND',
        'ORANGE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/orange/retro_orange.png', 'BACKGROUND',
        'ORANGE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/yellow/yellow.png', 'BACKGROUND', 'YELLOW'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/yellow/grid_yellow.png', 'BACKGROUND',
        'YELLOW'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/yellow/paper_yellow.png', 'BACKGROUND',
        'YELLOW'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/yellow/daily_yellow.png', 'BACKGROUND',
        'YELLOW'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/yellow/baseball_yellow.png', 'BACKGROUND',
        'YELLOW'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/yellow/retro_yellow.png', 'BACKGROUND',
        'YELLOW'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/green/green.png', 'BACKGROUND', 'GREEN'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/green/grid_green.png', 'BACKGROUND', 'GREEN'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/green/paper_green.png', 'BACKGROUND', 'GREEN'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/green/daily_green.png', 'BACKGROUND', 'GREEN'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/green/baseball_green.png', 'BACKGROUND',
        'GREEN'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/green/retro_green.png', 'BACKGROUND', 'GREEN'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/blue/blue.png', 'BACKGROUND', 'BLUE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/blue/grid_blue.png', 'BACKGROUND', 'BLUE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/blue/paper_blue.png', 'BACKGROUND', 'BLUE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/blue/daily_blue.png', 'BACKGROUND', 'BLUE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/blue/baseball_blue.png', 'BACKGROUND', 'BLUE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/blue/retro_blue.png', 'BACKGROUND', 'BLUE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/purple/purple.png', 'BACKGROUND', 'PURPLE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/purple/grid_purple.png', 'BACKGROUND',
        'PURPLE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/purple/paper_purple.png', 'BACKGROUND',
        'PURPLE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/purple/daily_purple.png', 'BACKGROUND',
        'PURPLE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/purple/baseball_purple.png', 'BACKGROUND',
        'PURPLE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/purple/retro_purple.png', 'BACKGROUND',
        'PURPLE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/black/black.png', 'BACKGROUND', 'BLACK'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/black/grid_black.png', 'BACKGROUND', 'BLACK'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/black/paper_black.png', 'BACKGROUND', 'BLACK'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/black/daily_black.png', 'BACKGROUND', 'BLACK'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/black/baseball_black.png', 'BACKGROUND',
        'BLACK'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/background/black/retro_black.png', 'BACKGROUND', 'BLACK'),
       ('theme_1.png', 'THEME', 'NONE'),
       ('theme_2.png', 'THEME', 'NONE');

-- diary resource : sticker_baseball
INSERT INTO DIARY_RESOURCE (img_url, type, category)
VALUES ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/monsters.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/baseball.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/bat.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/bat2.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/glove.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/hat.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/price.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/winner.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/doosan.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/hanhwa.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/kia.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/kt.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/lotte.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/nc.png', 'STICKER', 'BASEBALL'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/baseball/samsung.png', 'STICKER', 'BASEBALL');

-- diary resource : sticker_retro
INSERT INTO DIARY_RESOURCE (img_url, type, category)
VALUES ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/candy.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/cat.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/glass.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/good.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/heart.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/icecream1.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/icecream2.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/note1.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/note2.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/ribbon.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/star.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/watermelon.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_1.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_2.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_3.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_4.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_5.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_6.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_7.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_8.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_9.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_heart_10.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_1.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_2.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_3.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_4.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_5.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_6.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_7.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_8.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_9.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_face_10.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_1.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_2.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_3.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_4.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_5.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_6.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_7.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_8.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/retro/bubble_9.png', 'STICKER', 'RETRO');

-- diary resource : sticker_cute
INSERT INTO DIARY_RESOURCE (img_url, type, category)
VALUES ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/monday.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/tuesday.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/wednesday.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/thursday.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/friday.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/saturday.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/sunday.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/check.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/check1.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/check2.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/check3.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/check4.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/check_no', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/check_ok', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/clip.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/cloudy.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/face1.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/face2.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/face3.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/face4.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/face5.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/heart.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/label1.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/label2.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/label3.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/label4.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/moon.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/must_do.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/o.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/ok.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/rainny.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/smile.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/snowy.png	', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/star1.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/star2.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/star3.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/star4.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/study.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/sunny.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/thank_you.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/x.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/yes.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/index1.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/index2.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon1.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon2.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon3.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon4.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon5.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon6.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon7.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon8.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon9.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon10.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon11.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon12.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon13.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon14.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon15.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon16.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon17.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon18.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon19.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon20.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon21.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon22.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon23.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon24.png', 'STICKER', 'CUTE'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/cute/icon25.png', 'STICKER', 'CUTE');


-- diary resource : sticker_letter
INSERT INTO DIARY_RESOURCE (img_url, type, category)
VALUES ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_1.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_2.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_3.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_4.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_5.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_6.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_7.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_8.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_9.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_10.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_11.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_12.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_13.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_14.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_15.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_16.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_17.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_18.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_19.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_20.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_21.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_22.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_23.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_24.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_25.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_26.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_27.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_28.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_29.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_30.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_31.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_32.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_33.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_34.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_35.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/circle_36.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_1.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_2.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_3.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_4.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_5.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_6.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_7.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_8.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_9.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_10.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_11.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_12.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_13.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_14.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_15.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_16.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_17.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_18.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_19.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_20.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_21.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_22.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_23.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_24.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_25.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_26.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_27.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_28.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_29.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_30.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_31.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_32.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_33.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_34.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_35.png', 'STICKER', 'RETRO'),
       ('https://youniforms3.s3.ap-northeast-2.amazonaws.com/sticker/letter/heart_36.png', 'STICKER', 'RETRO');

-- chat_room
INSERT INTO CHAT_ROOM (room_id, room_name, room_state)
VALUES (1000, '몬스터즈 응원방', TRUE),
       (1, '김문호 응원방', TRUE),
       (2, '정근우 응원방', TRUE),
       (3, '박용택 응원방', TRUE),
       (4, '이대호 응원방', TRUE),
       (5, '정의윤 응원방', TRUE),
       (6, '최수현 응원방', TRUE),
       (7, '박재욱 응원방', TRUE),
       (8, '정성훈 응원방', TRUE),
       (9, '유태웅 응원방', TRUE),
       (10, '문교원 응원방', TRUE),
       (11, '임상우 응원방', TRUE),
       (12, '윤상혁 응원방', TRUE),
       (13, '이대은 응원방', TRUE),
       (14, '신재영 응원방', TRUE),
       (15, '오주원 응원방', TRUE),
       (16, '유희관 응원방', TRUE),
       (17, '장원삼 응원방', TRUE),
       (18, '니퍼트 응원방', TRUE),
       (19, '송승준 응원방', TRUE);

-- chat_part
INSERT INTO CHAT_PART (user_id, room_id, last_read_time)
VALUES (123, 3, CURRENT_TIMESTAMP);
INSERT INTO CHAT_PART (user_id, room_id, last_read_time)
VALUES (123, 4, CURRENT_TIMESTAMP);
INSERT INTO CHAT_PART (user_id, room_id, last_read_time)
VALUES (123, 9, CURRENT_TIMESTAMP);

-- alert
INSERT INTO ALERT(alert_id, receiver_id, sender_id, type, content, pk, is_read, created_at)
VALUES (123, 123, 124, 'FRIEND_REQUEST', '', null, false, '2024-07-31T16:47:20.394415'),
       (124, 123, 124, 'POST_COMMENT', '최강 몬스터즈 우승', 1, false, '2024-07-31T21:50:20.394415'),
       (125, 123, 124, 'FRIEND_REQUEST', '', null, true, '2024-08-01T11:23:20.394415'),
       (126, 123, 124, 'POST_COMMENT', '대호 이번주 홈런 침', 1, false, '2024-08-03T20:47:20.394415'),
       (127, 124, 123, 'POST_COMMENT', '하이하이', 1, true, '2024-08-05T11:23:20.394415');

-- tag
INSERT INTO TAG(contents)
VALUES ('최강야구'),
       ('최강'),
       ('몬스터즈'),
       ('최고'),
       ('홈런'),
       ('최강몬스터즈');

-- post
INSERT INTO POST(user_id, img_url, contents, date)
VALUES (123,
        'https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png',
        '최강 몬스터즈 진짜 최고!!', current_date),
       (124, null, '최강 몬스터즈1', current_date),
       (124, null, '최강 몬스터즈2', current_date),
       (124, null, '최강 몬스터즈3', current_date),
       (124, null, '최강 몬스터즈4', current_date),
       (124, null, '최강 몬스터즈5', current_date);

-- post_tag
INSERT INTO POST_TAG(post_id, tag_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (2, 2);

-- like_post
INSERT INTO LIKE_POST(user_id, post_id)
VALUES (123, 1);

-- comment
INSERT INTO COMMENT(user_id, post_id, content, created_at, updated_at)
VALUES (123, 1, '멋져요', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 2 HOUR), null),
       (124, 1, '응원합니다', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 HOUR), DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 5 MINUTE));

-- player : hitter
INSERT INTO PLAYER(player_id, team_id, name, age, back_num, batting_average, hit, homerun, steal, position, two_way)
VALUES (1, 1000, '김문호', '1987-06-22', 24, 0.111, 1, 0, 0, '외야수', '좌투좌타'),
       (2, 1000, '정근우', '1982-10-02', 8, 0.200, 2, 0, 2, '2루수', '우투우타'),
       (3, 1000, '박용택', '1979-04-21', 33, 0.000, 0, 0, 0, '외야수', '우투좌타'),
       (4, 1000, '이대호', '1982-06-21', 10, 0.556, 5, 1, 0, '1루수', '우투우타'),
       (5, 1000, '정의윤', '1986-07-25', 37, 0.000, 0, 0, 0, '외야수', '우투우타'),
       (6, 1000, '최수현', '1996-11-15', 2, 0.111, 1, 0, 0, '유틸리티', '우투좌타'),
       (7, 1000, '박재욱', '1995-12-06', 12, 0.333, 3, 0, 0, '포수', '우투우타'),
       (8, 1000, '정성훈', '1980-06-27', 16, 0.250, 2, 0, 0, '3루수', '우투우타'),
       (9, 1000, '유태웅', '2002-03-13', 1, 0.250, 1, 0, 0, '내야수', '우투우타'),
       (10, 1000, '문교원', '2004-07-19', 5, 0.000, 0, 0, 0, '내야수', '우투좌타'),
       (11, 1000, '임상우', '2003-01-03', 52, 0.200, 1, 0, 0, '내야수', '우투좌타'),
       (12, 1000, '윤상혁', '1999-11-19', 35, 0.333, 1, 0, 0, '외야수', '우투좌타');

-- player : pitcher
INSERT INTO PLAYER(player_id, team_id, name, age, back_num, era, whip, win, struck, position, two_way)
VALUES (13, 1000, '이대은', '1989-03-23', 11, 3.11, 1.61, 2, 9, '투수', '우투좌타'),
       (14, 1000, '신재영', '1989-11-18', 19, 6.00, 2.00, 1, 1, '투수', '우사우타'),
       (15, 1000, '오주원', '1985-03-31', 15, 0.00, 0.33, 0, 0, '투수', '좌투좌타'),
       (16, 1000, '유희관', '1987-06-01', 47, 0.00, 0.00, 4, 0, '투수', '좌투좌타'),
       (17, 1000, '장원삼', '1983-06-09', 13, 0.00, 0.00, 0, 2, '투수', '좌투좌타'),
       (18, 1000, '니퍼트', '1981-05-06', 40, 2.45, 1.90, 0, 4, '투수', '우투우타'),
       (19, 1000, '송승준', '1980-06-29', 21, 0.00, 0.00, 1, 0, '투수', '우투우타');

-- player cheering song
INSERT INTO CHEERING_SONG(song_id, player_id, title, lyrics, type, link)
VALUES (1, 4, '롯데 이대호',
        '오~ 롯데 이대호~ 오오~ 롯데 이대호~ 오<br>오~ 롯데 이대호~ 롯데 이대호~ 롯데 이대호~ 오오 오오오오~<br>오~ 롯데 이대호~ 오오~ 롯데 이대호~ 오<br>오~ 롯데 이대호~ 롯데 이대호~ 롯데 이대호~',
        'APPEARANCE', 'https://youtu.be/oO0NQUNa_RE?si=XvR3MQfOqhegKlDX&t=422'),
       (2, 4, '홈런 이대호', '홈!런! 이!대!호!<br>홈!런! 이!대!호!', 'CHEERING',
        'https://youtu.be/oO0NQUNa_RE?si=5dC__YrewLXfZ5lq&t=455'),
       (3, 3, '나타나', '왜 내 눈 앞에 나타나~ (박!용!택!)<br>왜 네가 자꾸 나타나~(박!용!택!)Mbr>두 눈을 감고 누우면<br>왜 네 얼굴이 떠올라(L!G~ 박!용!택!)',
        'APPEARANCE', 'https://youtu.be/YZBZ_XeBNCc?si=sPb9YScja3fjThmG'),
       (4, 3, '무적 LG 박용택',
        '무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오',
        'CHEERING', 'https://youtu.be/YZBZ_XeBNCc?si=vbGa2mv5RMqb2X6C&t=21'),
       (5, 9, '유태웅 응원가', '유!태!웅! 날려버려~<br>유!태!웅! 날려버려~', 'CHEERING', null);

-- team cheering song
INSERT INTO TEAM_SONG(team_song_id, team_id, titlE, lyrics, type, link)
VALUES (1, 1000, '승리하라 몬스터즈여',
        '몬!스!터!즈! 승!리!하!리!라!<br>우리는 승리의 최강 몬스터즈<br>승리를 위해서 달려간다 워우 오오<br>우리는 승리의 최강 몬스터즈<br>오늘도 승리한다<br><br>우리는 승리의 최강 몬스터즈<br>승리를 위해서 달려간다 워우 오오<br>우리는 승리의 최강 몬스터즈<br>오늘도 승리한다<br><br>오! 오오! 오오오! 몬!스!터!즈!<br>오! 오오! 오오오! 승!리!하!리!라!<br>오! 오오! 오오오! 몬!스!터!즈!<br>오늘도 승리한다<br>언제나 승리한다',
        'OFFICIAL', 'https://youtu.be/HAhw5IG5BmY?si=_oWn-ZVxC6OF7SSb&t=25'),
       (2, 1000, '몬스터즈 승리 영원하라',
        '몬!스!터!즈!<br>최강 몬스터즈 승리 영원하라<br>힘차게 날려라 저 멀리까지<br>우리의! 함성을! 여기에 모아서<br>지금부터 외쳐라 몬!스!터!즈!<br>워어어어어<br><br>몬!스!터!즈!<br>최강 몬스터즈 승리 영원하라<br>힘차게 달려라 승리를 향해<br>우리의! 함성을! 여기에 모아서<br>지금부터 외쳐라 몬!스!터!즈!<br>워어어어어',
        'OFFICIAL', 'https://youtu.be/cEHB2nsqFTw?si=iCq-PBbtt9JyYgnd');

-- user favorite player
INSERT INTO USER_PLAYER(user_id, player_id, push_alert)
VALUES (123, 3, true),
       (123, 4, true),
       (123, 9, true);