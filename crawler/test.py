from app import run_kbo_crawler
import requests

def kbo_crawling_scheduler():
    game_id_list = [
        "20240815LTOB0",
        # "20240815KTSS0",
        # "20240815SKNC0",
        # "20240815HTWO0",
        # "20240815LGHH0"
    ]
    for game_id in game_id_list:
        print(game_id)
        run_kbo_crawler.delay(game_id)

kbo_crawling_scheduler()
