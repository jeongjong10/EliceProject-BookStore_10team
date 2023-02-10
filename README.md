<hr />

# 십시일반 웹 개발 서비스
- 서비스의 한 줄 소개를 작성하세요.


## 서비스 구성 안내

## 1. 서비스 소개

- Javascript.js, React.js
- Node.js, Express.js, MongoDB

- 웹서비스에 대한 자세한 개요 등


## 2. 서비스 주요 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
  - 주요 기능 (주된 활용성) 및 서브 기능 소개
  - 프로젝트만의 차별점, 기대 효과

## 3. 서비스 구성도
  - 서비스 구조도 그림 (사용한 기술 스택)
  - 와이어프레임 figma : https://www.figma.com/file/yr7i1KO0DRpgRhR3tmml64/elice-1%EC%B0%A8-%ED%8C%80-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=311%3A2
  - API 명세 : https://www.notion.so/API-d25a39b6f4ec4f18a1b6b9e2f92928d1

## 4. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 멤버1 | 팀장/프론트엔드 개발 |
| 멤버2 | 백엔드 개발 |

**멤버별 responsibility**

1. 멤버 1: 팀장/프론트엔드 담당

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 멤버 2: 백엔드 담당

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 API 완성
- 수정 단계: 피드백 반영해서 백엔드 설계 수정

## 5. 실행 방법
- 백엔드 :
  ```bash
  1. mongodb 실행 (아틀라스)
  2. npm start
  ```
  - 프론트 엔드 :
  ```bash
  1. npm start)
  ```
## 6. 프로젝트 기반 구축

###  백엔드 : Express 서버 구축 및 DB 셋팅
- npm install express-generator -g (express generator)
- express --view=pug (메인 앱 생성)
- npm install (필요한 파일 자동 다운로드)
- npm i nodemon -D (코드 수정시 서버 자동으로 재시작(DevDependency))

- -> 개발 단계 실행 : npm run dev 명령어
- -> 릴리즈 단계 : npm start 명령어


## 7. 버전
  - 프로젝트의 버전 기입 (예: 1.0.0)

## 8. FAQ
  - 자주 받는 질문 정리
  - 예시) 이 서비스는 어떻게 실행하면 되나요?
    - git clone을 하신 후 아래 커맨드를 입력하시면 됩니다. ~~~
