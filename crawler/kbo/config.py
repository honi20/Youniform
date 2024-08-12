from celery.schedules import crontab

CELERY_BROKER_URL='redis://celery_broker:8379',
# CELERY_RESULT_BACKEND='redis://i11a308.p.ssafy.io:6379'

# celery beat
CELERY_TIMEZONE = 'Asia/Seoul'
CELERY_ENABLE_UTC = False

CELERYBEAT_SCHEDULE = {
    'KBO_crawling': {
        'task':'tasks.crawling',
        'schedule': crontab(minute='30', hour='18'),
        'args': ()
    }
}

RETRY_CNT = 3