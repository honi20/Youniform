from app import run_kbo_crawler

def kbo_crawling_scheduler():
    game_id_list = [
        "20240810NCLG0",
        "20240810OBSK0",
        "20240810LTKT0",
        "20240810SSHT0",
        "20240810WOHH0"
    ]
    for game_id in game_id_list:
        run_kbo_crawler.delay(game_id)

kbo_crawling_scheduler()