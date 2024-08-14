from celery import Celery
from kbo.crawler import crawling

app = Celery('app',  broker='redis://celery_broker:6379')
app.config_from_object('kbo.config')


@app.task(queue="KBO", default_retry_delay=30 * 60, max_retries=1)
def run_kbo_crawler(game_id):
    try:
        print('Crawling game {}'.format(game_id))
        crawling(game_id)
    except Exception as e:
        print(e)

# def kbo_crawling_scheduler():
#     game_id_list = [
#         "20240808LGOB0",
#         "20240808HHSS0",
#         "20240808KTHT0",
#         "20240808SKWO0"
#     ]
#     for game_id in game_id_list:
#         run_kbo_crawler.delay(game_id)