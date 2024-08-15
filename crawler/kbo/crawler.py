from datetime import datetime
import requests
import time
from bs4 import BeautifulSoup
import re

player = dict()
def init():
    # KIA (HT)
    player["HT"] = dict()
    player["HT"]["곽도규"] = 20
    player["HT"]["임기영"] = 21
    player["HT"]["이준영"] = 22
    player["HT"]["최지민"] = 23
    player["HT"]["네일"] = 24
    player["HT"]["황동하"] = 25
    player["HT"]["장현식"] = 26
    player["HT"]["전상현"] = 27
    player["HT"]["김기훈"] = 28
    player["HT"]["양현종"] = 29
    player["HT"]["김도현"] = 30
    player["HT"]["정해영"] = 31
    player["HT"]["장재혁"] = 32
    player["HT"]["김대유"] = 33
    player["HT"]["김태군"] = 34
    player["HT"]["한준수"] = 35
    player["HT"]["김선빈"] = 36
    player["HT"]["김도영"] = 37
    player["HT"]["홍종표"] = 38
    player["HT"]["김두현"] = 39
    player["HT"]["변우혁"] = 40
    player["HT"]["서건창"] = 41
    player["HT"]["이창진"] = 42
    player["HT"]["박정우"] = 43
    player["HT"]["최원준"] = 44
    player["HT"]["이우성"] = 45
    player["HT"]["소크라테스"] = 46
    player["HT"]["나성범"] = 47
    player["HT"]["김두현"] = 48
    player["HT"]["박찬호"] = 49

    # LG (LG)
    player["LG"] = dict()
    player["LG"]["김유영"] = 50
    player["LG"]["임찬규"] = 51
    player["LG"]["정우영"] = 52
    player["LG"]["에르난데스"] = 53
    player["LG"]["최원태"] = 54
    player["LG"]["손주영"] = 55
    player["LG"]["엔스"] = 56
    player["LG"]["김영준"] = 57
    player["LG"]["이종준"] = 58
    player["LG"]["김진성"] = 59
    player["LG"]["정지현"] = 60
    player["LG"]["이지강"] = 61
    player["LG"]["유영찬"] = 62
    player["LG"]["임준형"] = 63
    player["LG"]["박동원"] = 64
    player["LG"]["허도환"] = 65
    player["LG"]["문보경"] = 66
    player["LG"]["신민재"] = 67
    player["LG"]["구본혁"] = 68
    player["LG"]["오지환"] = 69
    player["LG"]["오스틴"] = 70
    player["LG"]["김민수"] = 71
    player["LG"]["안익훈"] = 72
    player["LG"]["박해민"] = 73
    player["LG"]["김현수"] = 74
    player["LG"]["최원영"] = 75
    player["LG"]["홍창기"] = 76
    player["LG"]["최승민"] = 77
    player["LG"]["이종준"] = 78
    player["LG"]["김성진"] = 79

    # 삼성 (SS)
    player["SS"] = dict()
    player["SS"]["육선엽"] = 80
    player["SS"]["이상민"] = 81
    player["SS"]["원태인"] = 82
    player["SS"]["이승현"] = 83
    player["SS"]["오승환"] = 84
    player["SS"]["백정현"] = 85
    player["SS"]["이승민"] = 86
    player["SS"]["최지광"] = 87
    player["SS"]["레예스"] = 88
    player["SS"]["임창민"] = 89
    player["SS"]["최채흥"] = 90
    player["SS"]["이승현"] = 91
    player["SS"]["황동재"] = 92
    player["SS"]["김재윤"] = 93
    player["SS"]["이병헌"] = 94
    player["SS"]["강민호"] = 95
    player["SS"]["이재현"] = 96
    player["SS"]["안주형"] = 97
    player["SS"]["류지혁"] = 98
    player["SS"]["김영웅"] = 99
    player["SS"]["전병우"] = 100
    player["SS"]["김지찬"] = 101
    player["SS"]["박병호"] = 102
    player["SS"]["구자욱"] = 103
    player["SS"]["이성규"] = 104
    player["SS"]["윤정빈"] = 105
    player["SS"]["김현곤"] = 106
    player["SS"]["김현준"] = 107
    player["SS"]["이승민"] = 108
    player["SS"]["김재혁"] = 109

    # 두산 (OB)
    player["OB"] = dict()
    player["OB"]["박치국"] = 110
    player["OB"]["시라카와"] = 111
    player["OB"]["홍건희"] = 112
    player["OB"]["김강률"] = 113
    player["OB"]["최승용"] = 114
    player["OB"]["이병헌"] = 115
    player["OB"]["권휘"] = 116
    player["OB"]["발라조빅"] = 117
    player["OB"]["곽빈"] = 118
    player["OB"]["최원준"] = 119
    player["OB"]["김유성"] = 120
    player["OB"]["김택연"] = 121
    player["OB"]["정철원"] = 122
    player["OB"]["이교훈"] = 123
    player["OB"]["양의지"] = 124
    player["OB"]["박민준"] = 125
    player["OB"]["김기연"] = 126
    player["OB"]["이유찬"] = 127
    player["OB"]["허경민"] = 128
    player["OB"]["전민재"] = 129
    player["OB"]["강승호"] = 130
    player["OB"]["김재호"] = 131
    player["OB"]["양석환"] = 132
    player["OB"]["김태근"] = 133
    player["OB"]["정수빈"] = 134
    player["OB"]["김재환"] = 135
    player["OB"]["조수행"] = 136
    player["OB"]["제러드"] = 137
    player["OB"]["정철원"] = 138
    player["OB"]["김정우"] = 139

    # KT (KT)
    player["KT"] = dict()
    player["KT"]["고영표"] = 140
    player["KT"]["김민"] = 141
    player["KT"]["엄상백"] = 142
    player["KT"]["우규민"] = 143
    player["KT"]["김민수"] = 144
    player["KT"]["쿠에바스"] = 145
    player["KT"]["이상동"] = 146
    player["KT"]["주권"] = 147
    player["KT"]["벤자민"] = 148
    player["KT"]["조이현"] = 149
    player["KT"]["박영현"] = 150
    player["KT"]["원상현"] = 151
    player["KT"]["성재헌"] = 152
    player["KT"]["장성우"] = 153
    player["KT"]["조대현"] = 154
    player["KT"]["심우준"] = 155
    player["KT"]["김상수"] = 156
    player["KT"]["황재균"] = 157
    player["KT"]["천성호"] = 158
    player["KT"]["박민석"] = 159
    player["KT"]["오재일"] = 160
    player["KT"]["강백호"] = 161
    player["KT"]["신본기"] = 162
    player["KT"]["로하스"] = 163
    player["KT"]["송민섭"] = 164
    player["KT"]["문상철"] = 165
    player["KT"]["배정대"] = 166
    player["KT"]["김민혁"] = 167

    # SSG (SK)
    player["SK"] = dict()
    player["SK"]["이건욱"] = 168
    player["SK"]["조병현"] = 169
    player["SK"]["서진용"] = 170
    player["SK"]["송영진"] = 171
    player["SK"]["김광현"] = 172
    player["SK"]["앤더슨"] = 173
    player["SK"]["한두솔"] = 174
    player["SK"]["노경은"] = 175
    player["SK"]["문승원"] = 176
    player["SK"]["김택형"] = 177
    player["SK"]["오원석"] = 178
    player["SK"]["엘리아스"] = 179
    player["SK"]["장지훈"] = 180
    player["SK"]["이로운"] = 181
    player["SK"]["김민식"] = 182
    player["SK"]["이지영"] = 183
    player["SK"]["박성한"] = 184
    player["SK"]["김성현"] = 185
    player["SK"]["최정"] = 186
    player["SK"]["박지환"] = 187
    player["SK"]["정준재"] = 188
    player["SK"]["하재훈"] = 189
    player["SK"]["추신수"] = 190
    player["SK"]["최상민"] = 191
    player["SK"]["에레디아"] = 192
    player["SK"]["한유섬"] = 193
    player["SK"]["오태곤"] = 194
    player["SK"]["최지훈"] = 195

    # NC (NC)
    player["NC"] = dict()
    player["NC"]["임정호"] = 196
    player["NC"]["요키시"] = 197
    player["NC"]["이용찬"] = 198
    player["NC"]["최성영"] = 199
    player["NC"]["이준호"] = 200
    player["NC"]["임상현"] = 201
    player["NC"]["류진욱"] = 202
    player["NC"]["전루건"] = 203
    player["NC"]["이재학"] = 204
    player["NC"]["신민혁"] = 205
    player["NC"]["김민규"] = 206
    player["NC"]["목지훈"] = 207
    player["NC"]["손주환"] = 208
    player["NC"]["박세혁"] = 209
    player["NC"]["김형준"] = 210
    player["NC"]["박민우"] = 211
    player["NC"]["서호철"] = 212
    player["NC"]["김주원"] = 213
    player["NC"]["도태훈"] = 214
    player["NC"]["데이비슨"] = 215
    player["NC"]["김휘집"] = 216
    player["NC"]["김한별"] = 217
    player["NC"]["송승환"] = 218
    player["NC"]["박영빈"] = 219
    player["NC"]["천재환"] = 220
    player["NC"]["권희동"] = 221
    player["NC"]["김성욱"] = 222
    player["NC"]["박시원"] = 223

    # 한화 (HH)
    player["HH"] = dict()
    player["HH"]["문동주"] = 224
    player["HH"]["김기중"] = 225
    player["HH"]["이상규"] = 226
    player["HH"]["바리아"] = 227
    player["HH"]["한승혁"] = 228
    player["HH"]["이민우"] = 229
    player["HH"]["김범수"] = 230
    player["HH"]["김서현"] = 231
    player["HH"]["와이스"] = 232
    player["HH"]["박상원"] = 233
    player["HH"]["김규연"] = 234
    player["HH"]["주현상"] = 235
    player["HH"]["류현진"] = 236
    player["HH"]["최재훈"] = 237
    player["HH"]["이재원"] = 238
    player["HH"]["안치홍"] = 239
    player["HH"]["이도윤"] = 240
    player["HH"]["노시환"] = 241
    player["HH"]["하주석"] = 242
    player["HH"]["김태연"] = 243
    player["HH"]["김인환"] = 244
    player["HH"]["문현빈"] = 245
    player["HH"]["황영묵"] = 246
    player["HH"]["채은성"] = 247
    player["HH"]["페라자"] = 248
    player["HH"]["이원석"] = 249
    player["HH"]["장진혁"] = 250
    player["HH"]["이상혁"] = 251

    # 롯데 (LT)
    player["LT"] = dict()
    player["LT"]["한현희"] = 252
    player["LT"]["김진욱"] = 253
    player["LT"]["김강현"] = 254
    player["LT"]["박세웅"] = 255
    player["LT"]["구승민"] = 256
    player["LT"]["김상수"] = 257
    player["LT"]["반즈"] = 258
    player["LT"]["이민석"] = 259
    player["LT"]["진해수"] = 260
    player["LT"]["김원중"] = 261
    player["LT"]["박진"] = 262
    player["LT"]["월커슨"] = 263
    player["LT"]["송재영"] = 264
    player["LT"]["손성빈"] = 265
    player["LT"]["정보근"] = 266
    player["LT"]["정훈"] = 267
    player["LT"]["최항"] = 268
    player["LT"]["손호영"] = 269
    player["LT"]["나승엽"] = 270
    player["LT"]["노진혁"] = 271
    player["LT"]["박승욱"] = 272
    player["LT"]["고승민"] = 273
    player["LT"]["황성빈"] = 274
    player["LT"]["전준우"] = 275
    player["LT"]["장두성"] = 276
    player["LT"]["레이예스"] = 277
    player["LT"]["윤동희"] = 278
    player["LT"]["이선우"] = 279
    player["LT"]["현도훈"] = 280

    # 키움 (WO)
    player["WO"] = dict()
    player["WO"]["김성민"] = 281
    player["WO"]["조상우"] = 282
    player["WO"]["김윤하"] = 283
    player["WO"]["문성현"] = 284
    player["WO"]["주승우"] = 285
    player["WO"]["김선기"] = 286
    player["WO"]["하영민"] = 287
    player["WO"]["헤이수스"] = 288
    player["WO"]["양지율"] = 289
    player["WO"]["김동욱"] = 290
    player["WO"]["이종민"] = 291
    player["WO"]["김연주"] = 292
    player["WO"]["후라도"] = 293
    player["WO"]["김재현"] = 294
    player["WO"]["김태진"] = 295
    player["WO"]["김혜성"] = 296
    player["WO"]["김건희"] = 297
    player["WO"]["김수환"] = 298
    player["WO"]["송성문"] = 299
    player["WO"]["고영우"] = 300
    player["WO"]["최주환"] = 301
    player["WO"]["이승원"] = 302
    player["WO"]["이주형"] = 303
    player["WO"]["박수종"] = 304
    player["WO"]["주성원"] = 305
    player["WO"]["임병욱"] = 306
    player["WO"]["변상권"] = 307
    player["WO"]["박주홍"] = 308

def sendAlert(player_id):
    print("")
    # requests.get("https://youniform.site/api/alerts/player/" + str(player_id))

def game_info_crawling(response, game_id):
    try:
        soup = BeautifulSoup(response.text, "html.parser")

        inning_info = {}
        for i in range(1, 11):
            inning_info[i] = soup.find_all('span', id=lambda x: x and x.startswith('rptLiveText'+str(i)+'_'))


        if response.status_code == 200:
            game_info = {}

            for inning in inning_info:
                inning_detail = inning_info.get(inning)
                if inning not in game_info:  # KeyError 방지를 위해 초기화
                    game_info[inning] = []
                for span in inning_detail:
                    # 태그를 제거하고 텍스트만 추출
                    text = span.get_text(separator="\n")  # <br> 태그를 줄바꿈으로 처리
                    lines = text.splitlines()  # 각 줄을 분리
                    clean_lines = [line.strip() for line in lines if line.strip()]  # 각 줄의 공백을 제거하고 빈 줄은 무시
                    cleaned_text = "\n".join(clean_lines)  # 다시 줄을 합침
                    cleaned_text = cleaned_text.replace("-\n", " ")
                    cleaned_text = cleaned_text.replace("\n---------------------------------------", " ")
                    game_info[inning].append(cleaned_text)
                if inning in game_info and len(game_info[inning]) > 0 and game_info[inning][0] == "경기종료":

                    print(game_id + " : 경기 종료")
                    return "경기종료"

            return game_info
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")

def player_info_crawling(response):
    try:
        soup = BeautifulSoup(response.text, "html.parser")
        players = soup.find_all('table', class_="tList")
        ah = players[0].find_all('tr')
        ap = players[1].find_all('tr')

        hh = players[4].find_all('tr')
        hp = players[5].find_all('tr')

        home_hitter = []
        home_pitcher = []
        away_hitter = []
        away_pitcher = []

        for i in range(1, len(hh)):
            index = hh[i].find('th').get_text()
            name = hh[i].find('td').find_next('td').get_text()
            home_hitter.append(name)
            # print(str(index)+"번째 타자 "+str(name))

        for i in range(1, len(hp)):
            name = hp[i].find('td').get_text()
            home_pitcher.append(name)
            # print("홈 투수 "+name)

        for i in range(1, len(ah)):
            index = ah[i].find('th').get_text()
            name = ah[i].find('td').find_next('td').get_text()
            away_hitter.append(name)
            # print(str(index)+"번째 타자 "+str(name))

        for i in range(1, len(ap)):
            name = ap[i].find('td').get_text()
            away_pitcher.append(name)
            # print("어웨이 투수 "+name)

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")

    result = dict()
    result['home_hitter'] = home_hitter
    result['home_pitcher'] = home_pitcher
    result['away_hitter'] = away_hitter
    result['away_pitcher'] = away_pitcher
    return result

def player_appearance_crawling(game_info):
    pattern = r"^\d{1,2}(번타자)"
    pinch_hitter = r"(대타)"
    player_apperance = dict()
    if game_info == "경기종료":
        return

    for game in game_info:
        player_apperance[game] = []
        for info in game_info[game]:
            if re.search(pattern, info):
                player_apperance[game].append(info)

    return player_apperance

def inning_info_crawling(game_info):
    pattern = r"^\d{1,2}(회초|회말)"
    inning = ""
    if game_info == "경기종료":
        return
    game = 10
    for game in game_info:
        info= len(game_info[game])
        while True:
            info -= 1
            if info == -1:
                break
            if re.search(pattern, game_info[game][info]):
                inning = game_info[game][info].split(' ')[0]

    return inning

def send_pitcher_alert(current_inning, players, away_team, home_team):
    pattern = r"^\d{1,2}(회초)"

    if re.search(pattern, current_inning):
        print(player[home_team][players["home_pitcher"][0]] + home_team + " 투수 : " + players["home_pitcher"][0] + ", 등장시간 : " + datetime.now().strftime("%H:%M"))
        sendAlert(player[home_team][players["home_pitcher"][0]])
    else:
        print(player[away_team][players["away_pitcher"][0]] + away_team + " 투수 : " + players["away_pitcher"][0] + ", 등장시간 : " + datetime.now().strftime("%H:%M"))
        sendAlert(player[away_team][players["away_pitcher"][0]])

def send_hitter_alert(current_inning, current_player, away_team, home_team):
    inning = re.search(r"^\d{1,2}(회초)", current_inning)
    match = re.search(r"대타\s*(\S+)", current_player)

    if match:
        # "대타"가 포함된 경우, 해당 선수명 반환
        result = match.group(1)
    else:
        # "대타"가 없는 경우, 타자의 이름을 반환
        result = re.search(r"\d+번타자\s*(\S+)", current_player).group(1)

    if inning:
        print(player[away_team][result] + away_team + " 타자 : " + result + ", 등장시간 : " + datetime.now().strftime("%H:%M"))
        sendAlert(player[away_team][result])
    else:
        print(player[home_team][result] + home_team + " 타자 : " + result + ", 등장시간 : " + datetime.now().strftime("%H:%M"))
        sendAlert(player[home_team][result])

def crawling(game_id):
    init()
    url = "https://www.koreabaseball.com/Game/LiveTextView2.aspx"

    data = {
        "leagueId": "1",
        "seriesId": "0",
        "gameId": game_id,
        "gyear": "2024"
    }

    away_team = game_id[8:10]
    home_team = game_id[10:12]

    current_inning = ""
    current_hitter = ""
    current_pitcher = dict()
    current_pitcher["home"] = ""
    current_pitcher["away"] = ""

    game_info = "시작"
    players = dict()

    while game_info != "경기종료":
        response = requests.post(url, data=data)

        # 선수 정보 가져오기
        tmp_players = player_info_crawling(response)
        if len(tmp_players["home_hitter"]) > 0 and len(tmp_players["away_hitter"]) > 0 and len(tmp_players["away_pitcher"]) > 0 and len(tmp_players["home_pitcher"]) > 0:
            players = tmp_players
        else:
            pass

        # 경기 정보 가져오기
        game_info = game_info_crawling(response, game_id)

        # 이닝 정보 가져오기
        inning_info = inning_info_crawling(game_info)

        # 선수 등장 정보 가져오기
        player_apperance = player_appearance_crawling(game_info)


        if game_info == "경기종료":
            return

        inning = 0
        for inn in range(1, 11):
            if len(player_apperance[inn]) != 0:
                inning = inn

        if inning > 10:
            inning = 10

        if inning_info != current_inning:
            current_inning = inning_info
            current_pitcher["home"] = players["home_pitcher"]
            current_pitcher["away"] = players["away_pitcher"]
            send_pitcher_alert(current_inning, players, away_team, home_team)

        elif players["home_pitcher"] != current_pitcher["home"] or players["away_pitcher"] != current_pitcher["away"]:
            current_pitcher["home"] = players["home_pitcher"]
            current_pitcher["away"] = players["away_pitcher"]
            send_pitcher_alert(current_inning, players, away_team, home_team)

        if current_hitter != player_apperance[inning][0]:
            current_hitter = player_apperance[inning][0]
            send_hitter_alert(current_inning, current_hitter, away_team, home_team)

        time.sleep(3)

# crawling("20240808KTHT0")