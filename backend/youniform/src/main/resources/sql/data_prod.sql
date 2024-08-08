-- team
INSERT INTO team (team_id, foundation, match_count, rank, win, winning_rate, home_ground, hometown, name)
VALUES (1, CURRENT_DATE, 3, 1, 2, 66.6, '홈그라운드', '서울', '팀 이름');

-- users
INSERT INTO users (user_id, is_deleted, push_alert, theme, created_at, last_write_diary, team_id, email, introduce,
                   nickname, password, profile_url, provider_type, uuid)
VALUES (123, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1, 'test@google.com', '자기소개111', 'User1', '$2a$10$0EMRXBOjq3aEqYROBSC44O36f8YrhiJ35d4A/IgcRhrrhSM6C9Tf6',
        'https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png', 'local', '1604b772-adc0-4212-8a90-81186c57f598'),
       (124, false, true, 1, CURRENT_DATE, CURRENT_DATE, 1, 'test@test.com', '자기소개222', 'User2', '$2a$10$Uip6WzTSUcBLXVV0LrWvGexHndE7a5DqaIrDa3a7g1XS8n8Inlpe6',
        'https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png', 'local', '1604b772-adc0-4212-8a90-81186c57f100');

-- stamp
INSERT INTO DIARY_STAMP (stamp_id, img_url)
VALUES (1, 'http://youniform.com/sticker1.png'),
       (2, 'http://youniform.com/stamp2.png'),
       (3, 'http://youniform.com/stamp3.png');

-- diary
INSERT INTO DIARY (diary_id, user_id, stamp_id, diary_date, scope, img_url)
VALUES (123, 123, 1, '2024-07-31', 'FRIENDS', 'diary1'),
       (124, 123, 1, '2024-07-01', 'ALL', 'diary2'),
       (125, 123, 1, '2024-07-12', 'PRIVATE', 'diary3'),
       (126, 124, 1, '2024-08-01', 'ALL', 'diary4');

-- friend
INSERT INTO FRIEND (user_id, friend_id, status, last_visited) VALUES (123, 124, 'FRIEND', CURRENT_DATE);
INSERT INTO FRIEND (user_id, friend_id, status, last_visited) VALUES (124, 123, 'FRIEND', CURRENT_DATE);

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

-- chat_room
INSERT INTO CHAT_ROOM (room_id, room_name, room_state) VALUES (1, '1번 방', TRUE);
INSERT INTO CHAT_ROOM (room_id, room_name, room_state) VALUES (2, '2번 방', TRUE);

-- chat_part
INSERT INTO CHAT_PART (user_id, room_id, last_read_time) VALUES (123, 1, CURRENT_TIMESTAMP);
INSERT INTO CHAT_PART (user_id, room_id, last_read_time) VALUES (124, 1, CURRENT_TIMESTAMP);
INSERT INTO CHAT_PART (user_id, room_id, last_read_time) VALUES (123, 2, CURRENT_TIMESTAMP);

-- alert
INSERT INTO ALERT(alert_id, receiver_id, sender_id, type, content, link, is_read, created_at)
VALUES (123, 123, 124, 'FRIEND_REQUEST', '', 'friend link', false, '2024-07-31T16:47:20.394415'),
       (124, 123, 124, 'POST_COMMENT', '최강 몬스터즈 우승', 'post link', false, '2024-07-31T21:50:20.394415'),
       (125, 123, 124, 'FRIEND_REQUEST', '', 'friend link', true, '2024-08-01T11:23:20.394415'),
       (126, 123, 124, 'POST_COMMENT', '대호 이번주 홈런 침', 'post link', false, '2024-08-03T20:47:20.394415'),
       (127, 124, 123, 'POST_COMMENT', '하이하이', 'post link', true, '2024-08-05T11:23:20.394415');

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
VALUES (123, 'https://youniforms3.s3.ap-northeast-2.amazonaws.com/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png',
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
VALUES(123, 1);

-- comment
    INSERT INTO COMMENT(user_id, post_id, content, created_at, updated_at)
VALUES(123, 1, '멋져요', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 2 HOUR), null),
    (124, 1, '응원합니다', DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 HOUR), DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 5 MINUTE));

-- photocard
INSERT INTO PHOTOCARD(photocard_id, user_id, img_url, created_at)
VALUES (123, 123, 'photocard1.png', CURRENT_TIME),
       (124, 123, 'photocard2.png', CURRENT_TIME),
       (125, 124, 'photocard3.png', CURRENT_TIME);

-- player : hitter
INSERT INTO PLAYER(player_id, team_id, name, age, back_num, batting_average, hit, homerun, steal, position, two_way)
VALUES (1, 1, '김문호', '1987-06-22', 24, 0.111, 1, 0, 0, '외야수', '좌투좌타'),
       (2, 1, '정근우', '1982-10-02', 8, 0.200, 2, 0, 2, '2루수', '우투우타'),
       (3, 1, '박용택', '1979-04-21', 33, 0.000, 0, 0, 0, '외야수', '우투좌타'),
       (4, 1, '이대호', '1982-06-21', 10, 0.556, 5, 1, 0, '1루수', '우투우타'),
       (5, 1, '정의윤', '1986-07-25', 37, 0.000, 0, 0, 0, '외야수', '우투우타'),
       (6, 1, '최수현', '1996-11-15', 2, 0.111, 1, 0, 0, '유틸리티', '우투좌타'),
       (7, 1, '박재욱', '1995-12-06', 12, 0.333, 3, 0, 0, '포수', '우투우타'),
       (8, 1, '정성훈', '1980-06-27', 16, 0.250, 2, 0, 0, '3루수', '우투우타'),
       (9, 1, '유태웅', '2002-03-13', 1, 0.250, 1, 0, 0, '내야수', '우투우타'),
       (10, 1, '문교원', '2004-07-19', 5, 0.000, 0, 0, 0, '내야수', '우투좌타'),
       (11, 1, '임상우', '2003-01-03', 52, 0.200, 1, 0, 0, '내야수', '우투좌타'),
       (12, 1, '윤상혁', '1999-11-19', 35, 0.333, 1, 0, 0, '외야수', '우투좌타');

-- player : pitcher
INSERT INTO PLAYER(player_id, team_id, name, age, back_num, era, whip, win, struck, position, two_way)
VALUES (13, 1, '이대은', '1989-03-23', 11, 3.11, 1.61, 2, 9, '투수', '우투좌타'),
       (14, 1, '신재영', '1989-11-18', 19, 6.00, 2.00, 1, 1, '투수', '우사우타'),
       (15, 1, '오주원', '1985-03-31', 15, 0.00, 0.33, 0, 0, '투수', '좌투좌타'),
       (16, 1, '유희관', '1987-06-01', 47, 0.00, 0.00, 4, 0, '투수', '좌투좌타'),
       (17, 1, '장원삼', '1983-06-09', 13, 0.00, 0.00, 0, 2, '투수', '좌투좌타'),
       (18, 1, '니퍼트', '1981-05-06', 40, 2.45, 1.90, 0, 4, '투수', '우투우타'),
       (19, 1, '송승준', '1980-06-29', 21, 0.00, 0.00, 1, 0, '투수', '우투우타');

-- player cheering song
INSERT INTO CHEERING_SONG(song_id, player_id, title, lyrics, type, link)
VALUES (1, 4, '롯데 이대호', '오~ 롯데 이대호~ 오오~ 롯데 이대호~ 오<br>오~ 롯데 이대호~ 롯데 이대호~ 롯데 이대호~ 오오 오오오오~<br>오~ 롯데 이대호~ 오오~ 롯데 이대호~ 오<br>오~ 롯데 이대호~ 롯데 이대호~ 롯데 이대호~', 'APPEARANCE', 'https://youtu.be/oO0NQUNa_RE?si=XvR3MQfOqhegKlDX&t=422'),
       (2, 4, '홈런 이대호', '홈!런! 이!대!호!<br>홈!런! 이!대!호!', 'CHEERING', 'https://youtu.be/oO0NQUNa_RE?si=5dC__YrewLXfZ5lq&t=455'),
       (3, 3, '나타나', '왜 내 눈 앞에 나타나~ (박!용!택!)<br>왜 네가 자꾸 나타나~(박!용!택!)Mbr>두 눈을 감고 누우면<br>왜 네 얼굴이 떠올라(L!G~ 박!용!택!)', 'APPEARANCE', 'https://youtu.be/YZBZ_XeBNCc?si=sPb9YScja3fjThmG'),
       (4, 3, '무적 LG 박용택', '무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오', 'CHEERING', 'https://youtu.be/YZBZ_XeBNCc?si=vbGa2mv5RMqb2X6C&t=21'),
       (5, 9, '박용택 응원가', '유!태!웅! 날려버려~<br>유!태!웅! 날려버려~', 'CHEERING', null);

-- team cheering song
INSERT INTO TEAM_SONG(team_song_id, team_id, titlE, lyrics, type, link)
VALUES (1, 1, '승리하라 몬스터즈여', '몬!스!터!즈! 승!리!하!리!라!<br>우리는 승리의 최강 몬스터즈<br>승리를 위해서 달려간다 워우 오오<br>우리는 승리의 최강 몬스터즈<br>오늘도 승리한다<br><br>우리는 승리의 최강 몬스터즈<br>승리를 위해서 달려간다 워우 오오<br>우리는 승리의 최강 몬스터즈<br>오늘도 승리한다<br><br>오! 오오! 오오오! 몬!스!터!즈!<br>오! 오오! 오오오! 승!리!하!리!라!<br>오! 오오! 오오오! 몬!스!터!즈!<br>오늘도 승리한다<br>언제나 승리한다', 'OFFICIAL', 'https://youtu.be/HAhw5IG5BmY?si=_oWn-ZVxC6OF7SSb&t=25'),
       (2, 1, '몬스터즈 승리 영원하라', '몬!스!터!즈!<br>최강 몬스터즈 승리 영원하라<br>힘차게 날려라 저 멀리까지<br>우리의! 함성을! 여기에 모아서<br>지금부터 외쳐라 몬!스!터!즈!<br>워어어어어<br><br>몬!스!터!즈!<br>최강 몬스터즈 승리 영원하라<br>힘차게 달려라 승리를 향해<br>우리의! 함성을! 여기에 모아서<br>지금부터 외쳐라 몬!스!터!즈!<br>워어어어어', 'OFFICIAL', 'https://youtu.be/cEHB2nsqFTw?si=iCq-PBbtt9JyYgnd');