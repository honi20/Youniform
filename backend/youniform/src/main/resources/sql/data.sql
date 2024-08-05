-- team
INSERT INTO team (team_id, foundation, match_count, rank, win, winning_rate, home_ground, hometown, name)
VALUES (1, CURRENT_DATE, 3, 1, 2, 66.6, '홈그라운드', '서울', '팀 이름');

-- users
INSERT INTO users (user_id, is_deleted, push_alert, theme, created_at, last_write_diary, team_id, email, introduce,
                   nickname, password, profile_url, provider_type, uuid)
VALUES (123, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1, 'test@google.com', '자기소개111', 'User1', 'sdklrjsr39324',
        's3 url', 'local', '1604b772-adc0-4212-8a90-81186c57f598'),
       (124, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1, 'test@google.com', '자기소개222', 'User2', 'eogheoghWkd',
        's3 url', 'local', '1604b772-adc0-4212-8a90-81186c57f100');

-- stamp
INSERT INTO DIARY_STAMP (stamp_id, img_url)
VALUES (1, 'http://youniform.com/sticker1.png'),
       (2, 'http://youniform.com/stamp2.png'),
       (3, 'http://youniform.com/stamp3.png');

-- diary
INSERT INTO DIARY (diary_id, user_id, stamp_id, diary_date, scope)
VALUES (123, 123, 1, '2024-07-31', 'FRIENDS'),
       (124, 123, 1, '2024-07-01', 'ALL'),
       (125, 123, 1, '2024-07-12', 'PRIVATE'),
       (126, 124, 1, '2024-08-01', 'ALL');

-- friend
INSERT INTO FRIEND (user_id, friend_id, status, last_visited) VALUES (123, 124, 'FRIEND', CURRENT_DATE);
INSERT INTO FRIEND (user_id, friend_id, status, last_visited) VALUES (124, 123, 'FRIEND', CURRENT_DATE);

-- chat_room
INSERT INTO CHAT_ROOM (room_id, room_name, room_state) VALUES (1, 'Room 1', TRUE);
INSERT INTO CHAT_ROOM (room_id, room_name, room_state) VALUES (2, 'Room 2', TRUE);

-- chat_part
INSERT INTO CHAT_PART (user_id, room_id, last_read_time) VALUES (123, 1, CURRENT_TIMESTAMP);
INSERT INTO CHAT_PART (user_id, room_id, last_read_time) VALUES (124, 1, CURRENT_TIMESTAMP);
INSERT INTO CHAT_PART (user_id, room_id, last_read_time) VALUES (123, 2, CURRENT_TIMESTAMP);

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
