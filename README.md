## chat
chat demo powered by AWS Elastic Beanstalk and Redis

```
# 가상환경 활성화
python3 -m venv venv
source venv/bin/activate
# 패키지 설치
pip install -r requirements.txt
# 실행
uvicorn application:application --reload
```