-- team
INSERT INTO team (team_id, foundation, match_count, rank, win, winning_rate, home_ground, hometown, name)
VALUES (1, CURRENT_DATE, 3, 1, 2, 66.6, '홈그라운드', '서울', '팀 이름');

-- users
INSERT INTO users (user_id, is_deleted, push_alert, theme, created_at, last_write_diary, team_id, email, introduce,
                   nickname, password, profile_url, provider_type, uuid)
VALUES (123, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1, 'test@google.com', '자기소개111', 'User1', 'sdklrjsr39324',
        's3 url', 'local', '1604b772-adc0-4212-8a90-81186c57f598');

-- stamp
INSERT INTO DIARY_STAMP(stamp_id, img_url, label) VALUES(1, 'http://youniform.com/sticker1.png', 'sticker1');

-- diary
INSERT INTO DIARY(diary_id, user_id, stamp_id, diary_date, scope) VALUES(1, 123, 1, '2024-07-31', 'FRIENDS');