-- team
INSERT INTO team (team_id, foundation, match_count, rank, win, winning_rate, home_ground, hometown, name)
VALUES (1, CURRENT_DATE, 3, 1, 2, 66.6, '홈그라운드', '서울', '팀 이름');

-- users
INSERT INTO users (user_id, is_deleted, push_alert, theme, created_at, last_write_diary, team_id, email, introduce,
                   nickname, password, profile_url, provider_type, uuid)
VALUES (123, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1, 'test@google.com', '자기소개111', 'User1', 'sdklrjsr39324',
        's3 url', 'local', '1604b772-adc0-4212-8a90-81186c57f598'),
       (124, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1, 'test@test.com', '자기소개222', 'User2', '$2a$10$Uip6WzTSUcBLXVV0LrWvGexHndE7a5DqaIrDa3a7g1XS8n8Inlpe6',
        's3 url', 'local', '1604b772-adc0-4212-8a90-81186c57f100');

-- stamp
INSERT INTO DIARY_STAMP (stamp_id, img_url)
VALUES (1, 'http://youniform.com/sticker1.png'),
       (2, 'http://youniform.com/stamp2.png'),
       (3, 'http://youniform.com/stamp3.png');

-- diary
INSERT INTO DIARY (user_id, stamp_id, diary_date, scope, img_url)
VALUES (123, 1, '2024-07-31', 'FRIENDS', 'diary1'),
       (123, 1, '2024-07-01', 'ALL', 'diary2'),
       (123, 1, '2024-07-12', 'PRIVATE', 'diary3'),
       (124, 1, '2024-08-01', 'ALL', 'diary4');

-- diary resource
INSERT INTO DIARY_RESOURCE (resource_id, img_url, type, category)
VALUES (1, 'background_1.png', 'BACKGROUND', 'RED'),
       (2, 'background_2.png', 'BACKGROUND', 'BLUE'),
       (3, 'sticker_baseball.png', 'STICKER', 'BASEBALL'),
       (4, 'sticker_retro.png', 'STICKER', 'RETRO'),
       (5, 'sticker_cute.png', 'STICKER', 'CUTE'),
       (6, 'sticker_letter.png', 'STICKER', 'LETTER'),
       (7, 'theme_1.png', 'THEME', 'NONE'),
       (8, 'theme_2.png', 'THEME', 'NONE');

-- alert
INSERT INTO ALERT(receiver_id, sender_id, type, content, link, is_read, created_at)
VALUES (123, 124, 'FRIEND_REQUEST', '', 'friend link', false, '2024-07-31T16:47:20.394415'),
       (123, 124, 'POST_COMMENT', '최강 몬스터즈 우승', 'post link', false, '2024-07-31T21:50:20.394415'),
       (123, 124, 'FRIEND_REQUEST', '', 'friend link', true, DATEADD('HOUR', -1, CURRENT_TIMESTAMP)),
       (123, 124, 'POST_COMMENT', '대호 이번주 홈런 침', 'post link', false, '2024-08-03T20:47:20.394415'),
       (124, 123, 'POST_COMMENT', '하이하이', 'post link', true, '2024-08-05T11:23:20.394415');

-- tag
INSERT INTO TAG(contents)
VALUES ('최강'),
       ('몬스터즈'),
       ('최고'),
       ('홈런');

-- post
INSERT INTO POST(user_id, img_url, contents, date)
VALUES (123, 'https://youniforms3.s3.ap-northeast-2.amazonaws.com/post/upload_2024-08-06_22_42_06.png',
        '최강 몬스터즈 진짜 최고!!', current_date),
    (124, null, '최강 몬스터즈', current_date);

-- post_tag
INSERT INTO POST_TAG(post_id, tag_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4);

-- like_post
INSERT INTO LIKE_POST(user_id, post_id)
VALUES(123, 1);

-- comment
INSERT INTO COMMENT(user_id, post_id, content, created_at, updated_at)
VALUES(123, 1, '멋져요', DATEADD('HOUR', -2, CURRENT_TIMESTAMP), null),
      (124, 1, '응원합니다', DATEADD('HOUR', -1, CURRENT_TIMESTAMP), DATEADD('MINUTE', -5, CURRENT_TIMESTAMP));

-- photocard
INSERT INTO PHOTOCARD(user_id, img_url, created_at)
VALUES (123, 'photocard1.png', CURRENT_TIME),
       (123, 'photocard2.png', CURRENT_TIME),
       (124, 'photocard3.png', CURRENT_TIME);