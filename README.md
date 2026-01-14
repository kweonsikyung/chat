# 가상환경 활성화
source venv/bin/activate
# 패키지 설치
pip install -r requirements.txt
# 실행
uvicorn application:application --reload