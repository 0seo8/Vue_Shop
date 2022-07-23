#  <img width="24" alt="logo" src="https://user-images.githubusercontent.com/90392240/180437693-14283fbd-c33a-4b20-bf7c-dad8a40ca31f.png">  Electron Market(5조) 

> **admin 접근**
- 회원가입시 이메일에 admin이 포함되는 이메일만 admin페이지에 접근할 수 있습니다.
- 예) `electron@admin.com`

> **프로젝트 진행 노션 링크**
- [노션](https://crystal-iridium-e5c.notion.site/Electron-Market-5-ee3e572d9ad342249c627c89fae1c648)
- [저장소](https://github.com/cham9994/team5)

## 📑 과제 ****요구사항 분석****

- 제공받은 [API 분석](https://velog.io/@0seo8/vue-%EA%B7%B8%EB%A3%B9-%EA%B3%BC%EC%A0%9C)한 후 인증, 계좌, 제품(사용자/관리자) API에 따른 데이터 처리 플로우 및 [유저플로우](https://files.slack.com/files-pri/T037VJK5UJE-F03LE6VC0F6/_______________________________2022-06-20______________7.14.59.png) 이해
- vue 프레임 워크를 사용한 웹 페이지 개발

## ****🤲 함께한 멤버****
|<img src="https://ifh.cc/g/WA6smO.jpg" width="100">|<img src="https://user-images.githubusercontent.com/96939562/180461086-da6f1274-799c-411c-bf62-cbcb133b6a5e.png"  width="100">|<img src="https://user-images.githubusercontent.com/96939562/180471277-a6c8c214-142a-40ef-8dca-82d26f1b8ff0.png" height="100">|<img src="https://user-images.githubusercontent.com/96939562/180461628-dab196b8-693d-4fc9-86e9-c2cf58bb494c.png" height="100">|
|:---:|:---:|:---:|:---:|
|**[장경찬](https://www.notion.so/84282eb5faf64e36b615a9532b4997ac)** |**[노영서](https://www.notion.so/9655821a935746a5bb492b813a4f608e)**|**[최효근](https://www.notion.so/dd1b512b55214cc5bc39cb7c68dfd192)**|**[김신협](https://www.notion.so/9c5a9c8b3c52409ab8616a82f4eb38f3)**

## ✨ 팀 프로젝트 결과

### 배포 주소

[DEMO](https://strong-bonbon-5bceeb.netlify.app/)

### 저장소 주소

[](https://github.com/cham9994/team5/tree/develop)

### 🗓 프로젝트 기간

2022년 6월 20일 - 7월 21일 

[🚀 Project Plan (1)](https://www.notion.so/f8b6b18ed5644e438a3b24693dd2fee0)

- **6월 27일 회의**
🍀**회의전**
    1. [과제 저장소](https://github.com/KDT1-FE/KDT2-JS-Team) 포크
    2. 각 팀원들은 브랜치 생성
    3. Vue 프로젝트 기본 구성 (Pinia/Vue Router 설치, 로그인/회원가입 기본 구현 등..)
    4. 기본 구성 커밋 후 `main` 브랜치 푸쉬
    5. 각 팀원이 기본 구성된 `main` 브랜치로 체크아웃
    6. 각 팀원이 자신이 구현할 내용으로 브랜치 생성해서 체크아웃, 예시) `git checkout -b Team5_login-style`
    7. 각 팀원이 구현한 내용이 완료되면 그때그때 `main` 브랜치로 Pull Request 생성 후 코드 리뷰 후 병합
    8. `main` 브랜치에서 최종 완성되면, 과제저장소로 Pull Request 생성해 최종 과제 제출
    
    🍀**회의 후**
    
    - 컨셉
        - 에어앤비처럼 숙소 예약 어플 ⇒ 쇼핑몰
    - 환경설정 → 스타일 툴, 협업 방식
        - 개인 브랜치에서 작업이 완료
        - `git switch develop`
        - git pull
        - `git merge 내브랜치`
        - 슬랙에 꼭 보고 까지
        - `git switch 내꺼`
        - `git pull origin develop`
        - 작업시작
    
- **7월 4일 회의**
    
    🍀**회의전**
    
    - 공통
        - [x]  css 컬러 변수 설정
            - 글꼴 설정 - GmarketSans 설치 후 적용
        - [x]  base.scss 설정 (초기 px, rem 단위 및 reset.css ⇒ cdn은 부트스트랩이 덮음)
        - [ ]  git prefix
        - [x]  vue bootstrap / bootstrap
        - [x]  develop 및 브랜치 정리
        - [x]  TheHeader user router설정
        - [x]  footer
        - 로딩이미지 설정
        - 노영서 파트
            - 현재까지 작업 내용 및 해야할 부분
                
                `공통`
                
                - [x]  가격 ,000 설정 toLocalString('ko-KR’) / store? vue? 고민 중
                
                `TheHeader.vue`(헤더영역) 
                
                - [x]  디자인
                - [x]  반응형 설정
                - [x]  DarkMode 토글
                - [ ]  *~~장바구니(상품 + 되는 경우 count 증가 설정)~~*
                - [ ]  *~~> `MyCart.vue` 😅~~*
                - [x]  **search기능 구현**
                
                `swiper.vue`
                
                - [x]  디자인
                - [x]  이미지 삽입
                - [x]  페이지네이션 색상 변경
                
                `MainSectionLIst.vue`(홈화면의 상품 리스트 영역)
                
                - [x]  디자인
                - [x]  >`ProductList.vue` >`ProductItem.vue` >`DetailProduct.vue`
                
                `DetailProduct.vue`
                
                - [x]  디자인
                - [x]  기능구현
                - [x]  >`OrderForm.vue`
                
                `OrderForm.vue` 
                
                - [x]  디자인
                - [x]  기능구현
                - [ ]  코드 정리 필요
                - [x]  **주문자 정보 수정 가능?**
                - [x]  >`OrderList.vue`
                
                `OrderList.vue`
                
                - [x]  디자인
                - [x]  기능구현
                - [x]  >`PurchaseItem.vue`
                
                `상품리스트페이지`
                
                - [x]  구현
            - user파트 로컬스토로지에 저장하는 token key 이름 확인
            - `OrderForm.vue` 에서 주문자 정보 수정 가능한지 체크⭐
            - 전체 계좌불러와 담는 account - state 이름명 확인
            - guard.js 체크 후 설정
        
        🍀**회의후**
        
        **Git다루기**
        
        ```
        $ git switch develop //develop브랜치로 이동
        $ git pull origin develop // 최신 develop를 받아옴
        $ git switch [내브랜치]
        $ git merge develop //내 브랜치에 develop merge
        $ git push origin [내 브랜치]
        
        // github - team5로 이동 - pull request
        // 슬랙에 보고
        ps. 본인 브랜치에는 꾸준히 push해줘도 좋을 것 같습니다!!(작업량 및 다른 파트에서 필요한 코드 확인가능!)
        
        ```
        
        **style설정**
        
        - Google Font 설정
        - header영역에 겹치지 않도록 padding-top설정
        
        **해야할 부분 정리**
        
        🐥 **경찬**
        
        - admin 토근 어떻게 처리를 할지 고민
        - 디지털 태그 넣기
        - 태그 \["a", "b"] 와 같이 , 형식으로 수정
        - 컴포넌트 내 api호출 부분 store로 옮겨보기
        - 공통 mutation 1개로 통일해보기
        - (슬쩍) 디자인 수정할 부분 조언해주기:hatched_chick:
        
        🐥**효근**
        
        - The Header 마이페이지 이모티콘에 mypage 연결
        - 사용자 정보를 local storage에 저장되지 않도록 수정
        - store 내 api 수정해보기
        - 공통 mutation 1개로 통일해보기
        - guard.js 코드 완성 후 마이페이지 버튼 클릭시 login으로 redirect시키기
        - 컴포넌트 디자인해보기
        
        🐥 **영서**
        
        - 메인페이지의 카드 디자인 하기
        - OrderList영역 hover 스타일 삽입하기(admin참고)
        - OrderList영역 상세내용 버튼 클릭 시 모달 구현하기
        - 상품 주문페이지 내부에서 연결된 계좌 조회 api 호출 및 사용하기
        - guard.js 코드 완성 후 주문하기 버튼 클릭시 login으로 redirect시키기
        - 경찬님의 noImage.js 적용해보기
        - view가 작아지는 경우 TheHeader 처리하기
        - 태그 영역 한번 만들어보기
        - 장바구니 고민해보기
        
        🐥 **공통**
        
        - footer영역
            - home으로 가는 router 설정 제거, github이모티콘 넣기 + 팀git 연결
        - gaurd.js 로직 짜기
        - swiper에 들어갈 이미지 보이면 모아놓기
        - 404페이지만들기
        
        🐥 **정리해야할 부분**
        
        - index.html의 google font정리 필요
        - package.json 정리
            - vue bootstrap / vue-awesome-swiper 제거
            - sweetalert2 vs vue sweetalert2?
        - store>user.js 삭제
- **7월 8일 회의**
    
    **추가 기능 구현**
    
    - [x]  스와이퍼
    - [x]  ~~prettier~~
    - [x]  ~~제품목록 css~~
    - [x]  ~~네비게이션가드~~
    - [x]  ~~부트스트랩 min.js => 다른방법찾는중~~
    - [x]  로딩
    - [x]  ~~헤더 404처리~~
    - [x]  프로필이미지
    - [x]  ~~회원정보 수정~~
    - [x]  + 노션정리
    - [x]  + SEO설정
    - [x]  + 배포
