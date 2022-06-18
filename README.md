# 🤝 팀 프로젝트

- 과제 기한: 
  - 과제 수행 기간: 06월 09일(목) ~ 07월 22일(금)
  - 코드 리뷰 기간: 07월 22일(금) ~ 07월 29일(금)
- 내용: 
  - API 분석 후 어떤 프로젝트로 진행/완성할 것인지 팀 단위로 결정하세요.

## API 사용법

모든 API 요청(Request) `headers`에 다음 정보가 꼭 포함되어야 합니다.<br>
`username`은 다른 사람과 겹치지 않도록 주의하세요!<br>
본명으로 만들면 나중에 문제가 발생했을 때 찾기가 쉬워요.(E.g. `KDT2_ParkYoungWoong`)

```json
{
  "content-type": "application/json",
  "apikey": "FcKdtJs202204",
  "username": "<YOUR_NAME>"
}
```

<hr />

## 인증

'인증' 관련 API는 모두 일반 사용자 전용입니다.

### 회원가입

사용자가 `username`에 종속되어 회원가입합니다.

- 사용자 비밀번호는 암호화해 저장합니다.(관리자는 확인할 수 없습니다!)
- 프로필 이미지는 1MB 이하여야 합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  email: string // 사용자 아이디 (필수!)
  password: string // 사용자 비밀번호, 8자 이상 (필수!)
  displayName: string // 사용자 이름, 20자 이하 (필수!)
  profileImgBase64?: string // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
}
```

```json
{
  "email": "thesecon@gmail.com",
  "password": "********",
  "displayName": "ParkYoungWoong",
  "profileImgBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf...(생략)"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  user: { // 회원가입한 사용자 정보
    email: string // 사용자 아이디
    displayName: string // 사용자 표시 이름
    profileImg: string | null // 사용자 프로필 이미지(URL)
  }
  accessToken: string // 사용자 접근 토큰
}
```

```json
{
  "user": {
    "email": "thesecon@gmail.com",
    "displayName": "ParkYoungWoong",
    "profileImg": "https://storage.googleapis.com/heropy-api/vjbtIrh5dGv163442.png"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlM3WDhpQ...(생략)"
}
```

### 로그인

- 발급된 `accessToken`은 24시간 후 만료됩니다.(만료 후 다시 로그인 필요)

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  email: string // 사용자 아이디 (필수!)
  password: string // 사용자 비밀번호 (필수!)
}
```

```json
{
  "email": "thesecon@gmail.com",
  "password": "********"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  user: { // 회원가입한 사용자 정보
    email: string // 사용자 아이디
    displayName: string // 사용자 표시 이름
    profileImg: string | null // 사용자 프로필 이미지(URL)
  }
  accessToken: string // 사용자 접근 토큰
}
```

```json
{
  "user": {
    "email": "thesecon@gmail.com",
    "displayName": "ParkYoungWoong",
    "profileImg": "https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlQS3I...(생략)"
}
```

### 인증 확인

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  email: string // 사용자 아이디
    displayName: string // 사용자 표시 이름
    profileImg: string | null // 사용자 프로필 이미지(URL)
}
```

```json
{
  "email": "thesecon@gmail.com",
  "displayName": "ParkYoungWoong",
  "profileImg": "https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png"
}
```

### 로그아웃

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true // 로그아웃 처리 상태
```

### 사용자 정보 수정

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user
  \ -X 'PUT'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  displayName?: string // 새로운 표시 이름
  profileImgBase64?: string // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
  oldPassword?: string // 기존 비밀번호
  newPassword?: string // 새로운 비밀번호
}
```

```json
{
  "oldPassword": "********",
  "newPassword": "**********"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  email: string // 사용자 아이디
  displayName: string // 사용자 표시 이름
  profileImg: string | null // 사용자 프로필 이미지(URL)
}
```

```json
{
  "email": "thesecon@gmail.com",
  "displayName": "ParkYoungWoong",
  "profileImg": "https://storage.googleapis.com/heropy-api/vAKjlJ-Gx5v163442.png"
}
```

<hr />

## 계좌

'계좌' 관련 API는 모두 일반 사용자 전용입니다.

### 선택 가능한 은행 목록 조회

- 은행 당 하나의 계좌만 허용됩니다.
- 사용자가 계좌를 추가하면, 해당 은행 정보 `disabled` 속성이 `true`로 변경됩니다.
- 은행 정보 `digits` 속성의 숫자를 모두 더하면 각 은행의 유효한 계좌번호 길이가 됩니다.
- `[3, 2, 4, 3]` => 123-12-1234-123

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

```plaintext
@return {object[]} - 선택 가능한 은행 목록
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Bank[] // 선택 가능한 은행 정보 목록

interface Bank { // 선택 가능한 은행 정보
  name: string // 은행 이름
  code: string // 은행 코드
  digits: number[] // 은행 계좌 자릿수
  disabled: boolean // 사용자가 추가한 계좌 여부
}
```

```json
[
  {
    "name": "KB국민은행",
    "code": "004",
    "digits": [3, 2, 4, 3],
    "disabled": false
  },
  {
    "name": "신한은행",
    "code": "088",
    "digits": [3, 3, 6],
    "disabled": true
  },
  {
    "name": "우리은행",
    "code": "020",
    "digits": [4, 3, 6],
    "disabled": true
  },
  {
    "name": "하나은행",
    "code": "081",
    "digits": [3, 6, 5],
    "disabled": false
  },
  {
    "name": "케이뱅크",
    "code": "089",
    "digits": [3, 3, 6],
    "disabled": false
  },
  {
    "name": "카카오뱅크",
    "code": "090",
    "digits": [4, 2, 7],
    "disabled": false
  },
  {
    "name": "NH농협은행",
    "code": "011",
    "digits": [3, 4, 4, 2],
    "disabled": false
  }
]
```

### 계좌 목록 및 잔액 조회

- 계좌번호는 일부만 노출됩니다. E.g. `"123-XXXX-XXXX-XX"`
- 잔액의 단위는 '원화(￦)'입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  totalBalance: number // 사용자 계좌 잔액 총합
  accounts: Bank[] // 사용자 계좌 정보 목록
}

interface Bank { // 사용자 계좌 정보
  id: string // 계좌 ID
  bankName: string // 은행 이름
  bankCode: string // 은행 코드
  accountNumber: string // 계좌 번호
  balance: number // 계좌 잔액
}
```

```json
{
  "totalBalance": 5999900,
  "accounts": [
    {
      "id": "jQMfKla8vOIFELA3mAXv",
      "bankName": "NH농협은행",
      "bankCode": "011",
      "accountNumber": "356-XXXX-XXXX-XX",
      "balance": 2999900
    },
    {
      "id": "wiPgsXvMAmcLw8AuRHIi",
      "bankName": "KB국민은행",
      "bankCode": "004",
      "accountNumber": "123-XX-XXXX-XXX",
      "balance": 3000000
    }
  ]
}
```

### 계좌 연결

- 연결된 계좌 잔액에는 자동으로 기본 '3백만원'이 추가됩니다.
- 요청하는 계좌번호와 전화번호에는 `-` 구분이 없어야 합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  bankCode: string // 연결할 은행 코드 (필수!)
  accountNumber: string // 연결할 계좌번호 (필수!)
  phoneNumber: string // 사용자 전화번호 (필수!)
  signature: boolean // 사용자 서명 (필수!)
}
```

```json
{
  "bankCode": "088",
  "accountNumber": "123456789012",
  "phoneNumber": "01012345678",
  "signature": true
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue { // 연결된 계좌 정보
  id: string // 계좌 ID
  bankName: string // 은행 이름
  bankCode: string // 은행 코드
  accountNumber: string // 계좌 번호
  balance: number // 계좌 잔액
}
```

```json
{
  "id": "1qRFC6Ey5VkSu6nyj5Ba",
  "bankName": "신한은행",
  "bankCode": "088",
  "accountNumber": "123-XXX-XXXXXX",
  "balance": 3000000
}
```

### 계좌 해지

- 해지한 계좌는 다시 연결해도 잔액이 반영되지 않습니다.(기본 금액으로 추가됩니다)

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/account 
  \ -X 'DELETE'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  accountId: string // 계좌 ID (필수!)
  signature: boolean // 사용자 서명 (필수!)
}
```

```json
{
  "accountId": "jQMfKla8vOIFELA3mAXv",
  "signature": true
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true  // 계좌 해지 처리 상태
```

<hr />

## 제품

'제품' 관련 API는 관리자 전용과 일반 사용자 전용으로 구분됩니다.<br>
공용 API도 있으니 주의하세요!

### 모든 제품 조회

- 관리자 전용 API입니다.
- 상세 정보가 아닌 기본 정보의 제품 설명은 100자까지만 포함됩니다.
- 상세 정보가 아닌 기본 정보의 제품 상세 사진은 포함되지 않습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products 
  \ -X 'GET'
  \ -H 'masterKey: true'
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Product[] // 관리하는 모든 제품의 목록

interface Product { // 제품 정보
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 설명(최대 100자)
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부
}
```

```json
[
  {
    "id": "cFmeC7aY5KjZbBAdJE9y",
    "title": "삼성전자 스마트모니터 M7 S43AM700",
    "price": 639000,
    "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
    "tags": [
      "가전",
      "모니터",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png",
    "isSoldOut": false
  },
  {
    "id": "nbqtQvEivYwEXTDet7YM",
    "title": "MacBook Pro 16",
    "price": 3360000,
    "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성",
    "tags": [
      "가전",
      "노트북",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
    "isSoldOut": false
  }
]
```

### 전체 거래(판매) 내역

- 관리자 전용 API입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all 
  \ -X 'GET'
  \ -H 'masterKey: true'
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
type RequestValue = TransactionDetail[] // 모든 거래 내역의 목록

interface TransactionDetail { // 거래 내역 정보
  detailId: string // 거래 내역 ID
  user: { // 거래한 사용자 정보
    email: string
    displayName: string
    profileImg: string | null
  }
  account: { // 거래한 사용자의 계좌 정보
    bankName: string
    bankCode: string
    accountNumber: string
  }
  product: { // 거래한 제품 정보
    productId: string
    title: string
    price: number
    description: string
    tags: string[]
    thumbnail: string | null
  }
  reservation: Reservation | null // 거래한 제품의 예약 정보
  timePaid: string // 제품을 거래한 시간
  isCanceled: boolean // 거래 취소 여부
  done: boolean // 거래 완료 여부
}

interface Reservation {
  start: string // 예약 시작 시간
  end: string // 예약 종료 시간
  isCanceled: boolean // 예약 취소 여부
  isExpired: boolean // 예약 만료 여부
}
```

```json
[
  {
    "detailId": "dMhfxyrAupQP18OYmywy",
    "user": {
      "email": "thesecon@gmail.com",
      "displayName": "ParkYoungWoong",
      "profileImg": "https://storage.googleapis.com/heropy-api/vsLRqTlPO5v200111.png"
    },
    "account": {
      "bankName": "KB국민은행",
      "bankCode": "004",
      "accountNumber": "123-XX-XXXX-XXX"
    },
    "product": {
      "productId": "cFmeC7aY5KjZbBAdJE9y",
      "title": "삼성전자 스마트모니터 M7 S43AM700",
      "price": 639000,
      "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
      "tags": [
        "가전",
        "모니터",
        "컴퓨터"
      ],
      "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png"
    },
    "reservation": null,
    "timePaid": "2021-11-07T20:01:49.100Z",
    "isCanceled": false,
    "done": false
  }
]
```

예약 정보(`reservation`)가 있는 경우:

```json
[
  {
    "reservation": {
      "start": "2021-11-12T06:00:00.000Z",
      "end": "2021-11-12T07:00:00.000Z",
      "isCanceled": false,
      "isExpired": true
    }
  }
]
```

### 거래(판매) 내역 완료/취소 및 해제

- 관리자 전용 API입니다.
- 거래 내역을 취소하면, 예약도 같이 취소됩니다.
- 거래 내역을 취소 해제하면, 예약도 같이 취소가 해제됩니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/:detailId 
  \ -X 'PUT'
  \ -H 'masterKey: true'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  isCanceled?: boolean // 거래 취소 여부 (사용자의 '제품 거래(구매) 취소' 상태와 같습니다)
  done?: boolean // 거래 완료 여부 (사용자의 '제품 거래(구매) 확정' 상태와 같습니다)
}
```

```json
{
  "isCanceled": true
}
```

응답 데이터 타입 및 예시:


```ts
type ResponseValue = true // 거래 내역 완료/취소 및 해제 처리 상태
```

### 제품 추가

- 관리자 전용 API입니다.
- 파일(사진)은 Base64로 요청해야 합니다.
- 제품 썸네일 사진은 1MB 이하여야 합니다.
- 제품 상세 사진은 4MB 이하여야 합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products 
  \ -X 'POST'
  \ -H 'masterKey: true'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title: string // 제품 이름 (필수!)
  price: number // 제품 가격 (필수!)
  description: string // 제품 상세 설명 (필수!)
  tags?: string[] // 제품 태그
  thumbnailBase64?: string // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
}
```

```json
{
  "title": "MacBook Pro 16",
  "price": 3360000,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "thumbnailBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...(생략)"
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue { // 추가한 제품의 상세 내용
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 상세 설명
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  photo: string | null // 제품 상세 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부
}
```

```json
{
  "id": "nbqtQvEivYwEXTDet7YM",
  "title": "MacBook Pro 16",
  "price": 3360000,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
  "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
  "isSoldOut": false
}
```

### 제품 수정

- 관리자 전용 API입니다.
- 사용자의 구매 내역 확인을 위해, 제품을 실제로는 삭제하지 않고 매진(Sold Out) 처리해야 합니다.
- 매진은 다시 해제할 수 있습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/:productId
  \ -X 'PUT'
  \ -H 'masterKey: true'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title?: string // 제품 이름
  price?: number // 제품 가격
  description?: string // 제품 상세 설명
  tags?: string[] // 제품 태그
  thumbnailBase64?: string // 제품 썸네일(대표) 사진(base64) - jpg, jpeg, webp, png, gif, svg
  photoBase64?: string // 제품 상세 사진(base64) - jpg, jpeg, webp, png, gif, svg
  isSoldOut?: number // 제품 매진 여부
}
```

```json
{
  "price": 1500
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue { // 수정한 제품의 상세 내용
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 상세 설명
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  photo: string | null // 제품 상세 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부 
}
```

```json
{
  "id": "nbqtQvEivYwEXTDet7YM",
  "title": "MacBook Pro 16",
  "price": 1500,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
  "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
  "isSoldOut": false
}
```

### 단일 제품 상세 조회

- 공용 API입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/:productId
  \ -X 'GET'
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
interface ResponseValue { // 제품의 상세 내용
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 상세 설명
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
  photo: string | null // 제품 상세 이미지(URL)
  isSoldOut: boolean // 제품 매진 여부 
  reservations: Reservation[] // 제품의 모든 예약 정보 목록
}

interface Reservation {
  start: string // 예약 시작 시간
  end: string // 예약 종료 시간
  isCanceled: boolean // 예약 취소 여부
  isExpired: boolean // 예약 만료 여부
}
```

```json
{
  "id": "nbqtQvEivYwEXTDet7YM",
  "title": "MacBook Pro 16",
  "price": 3360000,
  "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성능과 놀라운 배터리 사용 시간을 자랑하죠. 여기에 시선을 사로잡는 Liquid Retina XDR 디스플레이, Mac 노트북 사상 최고의 카메라 및 오디오 그리고 더할 나위 없이 다양한 포트까지. 기존 그 어떤 카테고리에도 속하지 않는 노트북. 새로운 MacBook Pro는 그야말로 야수입니다.",
  "tags": [
    "가전",
    "노트북",
    "컴퓨터"
  ],
  "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png",
  "photo": "https://storage.googleapis.com/heropy-api/voihKb3NLGcv195257.png",
  "isSoldOut": false,
  "reservations": []
}
```

예약 정보(`reservation`)가 있는 경우:

```json
{
  "reservations": [
    {
      "reservation": {
        "start": "2021-11-12T06:00:00.000Z",
        "end": "2021-11-12T07:00:00.000Z",
        "isCanceled": false,
        "isExpired": true
      }
    }
  ] 
}
```

### 제품 검색

- 사용자 전용 API입니다.
- 제품 이름과 태그를 동시에 검색할 수 있고, 'And'(검색한 이름과 태그 모두 포함된 제품) 조건으로 결과를 반환합니다.
- 제품 이름과 태그 모두 포함하지 않으면, 모든 제품의 결과를 반환합니다.
- 제품의 기본 정보만 반환합니다.
- 매진된 제품은 검색되지 않습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  searchText?: string // 검색할 제품 이름
  searchTags?: string[] // 검색할 제품 태그
}
```

```json
{
  "searchText": "삼성전자",
  "searchTags": ["가전"]
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Product[] // 관리하는 모든 제품의 목록

interface Product { // 제품 정보
  id: string // 제품 ID
  title: string // 제품 이름
  price: number // 제품 가격
  description: string // 제품 설명(최대 100자)
  tags: string[] // 제품 태그
  thumbnail: string | null // 제품 썸네일 이미지(URL)
}
```

```json
[
  {
    "id": "cFmeC7aY5KjZbBAdJE9y",
    "title": "삼성전자 스마트모니터 M7 S43AM700",
    "price": 639000,
    "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
    "tags": [
      "가전",
      "모니터",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png"
  }
]
```

### 제품 거래(구매) 신청

- 사용자 전용 API입니다.
- 거래(구매) 신청시 연결된 계좌에서 결제됩니다.
- 결제할 계좌(ID)를 꼭 선택해야 합니다.(`계좌 목록 및 잔액 조회` API를 사용하세요)
- 선택한 계좌의 잔액보다 결제 금액이 크면 결제가 처리되지 않습니다.(에러 반환)

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/buy 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  productId: string // 거래할 제품 ID (필수!)
  accountId: string // 결제할 사용자 계좌 ID (필수!)
  reservation?: { // 예약 정보(예약 시스템을 사용하는 경우만 필요)
    start: string // 예약 시작 시간(ISO)
    end: string // 예약 종료 시간(ISO)
  }
}
```

```js
const isoString = new Date().toISOString()
```

```json
{
  "productId": "nbqtQvEivYwEXTDet7YM",
  "accountId": "Mq2KKHk8vlmr6Xkg58Fa",
  "reservation": {
    "start": "2021-11-12T06:00:00.000Z",
    "end": "2021-11-12T07:00:00.000Z"
  }
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true // 거래 신청 처리 여부
```

### 제품 거래(구매) 취소

- 사용자 전용 API입니다.
- '거래 취소'시 결제한 사용자 계좌로 금액이 환불됩니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  detailId: string // 취소할 제품의 거래 내역 ID
}
```

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy"
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true // 거래 취소 처리 여부
```

### 제품 거래(구매) 확정

- 사용자 전용 API입니다.
- '거래(구매) 확정' 후에는 '거래 취소'를 할 수 없습니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  detailId: string // 거래(구매) 확정할 제품의 거래 내역 ID
}
```

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy"
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true // 거래(구매) 확정 처리 여부
```

### 제품 전체 거래(구매) 내역

- 사용자 전용 API입니다.
- 거래 내역의 기본 정보만 포함됩니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details 
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

-

응답 데이터 타입 및 예시:

```ts
type RequestValue = TransactionDetail[] // 모든 거래 내역의 목록

interface TransactionDetail { // 거래 내역 정보
  detailId: string // 거래 내역 ID
  product: { // 거래한 제품 정보
    productId: string
    title: string
    price: number
    description: string
    tags: string[]
    thumbnail: string | null
  }
  reservation: Reservation | null // 거래한 제품의 예약 정보
  timePaid: string // 제품을 거래한 시간
  isCanceled: boolean // 거래 취소 여부
  done: boolean // 거래 완료 여부
}

interface Reservation {
  start: string // 예약 시작 시간
  end: string // 예약 종료 시간
  isCanceled: boolean // 예약 취소 여부
  isExpired: boolean // 예약 만료 여부
}
```

```json
[
  {
    "detailId": "9jAoagzrZBkSWI5NctEB",
    "product": {
      "productId": "nbqtQvEivYwEXTDet7YM",
      "title": "MacBook Pro 16",
      "price": 3360000,
      "description": "역대 가장 강력한 MacBook Pro가 등장했습니다. 최초의 프로용 Apple Silicon인 M1 Pro 또는 M1 Max 칩을 탑재해 쏜살같이 빠른 속도는 물론, 획기적인 성",
      "tags": [
        "가전",
        "노트북",
        "컴퓨터"
      ],
      "thumbnail": "https://storage.googleapis.com/heropy-api/vIKMk_jy4Yv195256.png"
    },
    "reservation": null,
    "timePaid": "2021-11-07T20:17:32.112Z",
    "isCanceled": true,
    "done": false
  },
  {
    "detailId": "dMhfxyrAupQP18OYmywy",
    "product": {
      "productId": "cFmeC7aY5KjZbBAdJE9y",
      "title": "삼성전자 스마트모니터 M7 S43AM700",
      "price": 639000,
      "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,00",
      "tags": [
        "가전",
        "모니터",
        "컴퓨터"
      ],
      "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png"
    },
    "reservation": {
      "start": "2021-11-12T06:00:00.000Z",
      "end": "2021-11-12T07:00:00.000Z",
      "isCanceled": false,
      "isExpired": true
    },
    "timePaid": "2021-11-07T20:01:49.100Z",
    "isCanceled": false,
    "done": true
  }
]
```

### 단일 제품 상세 거래(구매) 내역

- 사용자 전용 API입니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail 
  \ -X 'POST'
  \ -H 'Authorization: Bearer <accessToken>'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  detailId: string // 상세 내용을 확인할 거래(구매) 내역 ID
}
```

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy"
}
```

응답 데이터 타입 및 예시:

```ts
interface TransactionDetail { // 상세 거래 정보
  detailId: string // 거래 내역 ID
  account: { // 거래한 사용자의 계좌 정보
    bankName: string
    bankCode: string
    accountNumber: string
  }
  product: { // 거래한 제품 정보
    productId: string
    title: string
    price: number
    description: string
    tags: string[]
    thumbnail: string | null
    photo: string | null
  }
  reservation: Reservation | null // 거래한 제품의 예약 정보
  timePaid: string // 제품을 거래한 시간
  isCanceled: boolean // 거래 취소 여부
  done: boolean // 거래 완료 여부
}

interface Reservation {
  start: string // 예약 시작 시간
  end: string // 예약 종료 시간
  isCanceled: boolean // 예약 취소 여부
  isExpired: boolean // 예약 만료 여부
}
```

```json
{
  "detailId": "dMhfxyrAupQP18OYmywy",
  "account": {
    "bankName": "KB국민은행",
    "bankCode": "004",
    "accountNumber": "123-XX-XXXX-XXX"
  },
  "product": {
    "productId": "cFmeC7aY5KjZbBAdJE9y",
    "title": "삼성전자 스마트모니터 M7 S43AM700",
    "price": 639000,
    "description": "107.9cm(43인치) / 와이드(16:9) / 평면 / VA / 3840 x 2160(4K UHD) / 픽셀피치: 0.2451mm / 8ms(GTG) / 300cd / 5,000:1 / 최대 주사율: 60Hz / HDMI 2.0 / USB Type-C / 플리커 프리 / 블루라이트 차단 / 게임모드 지원 / 스피커 / 리모컨 / USB허브 / Wi-Fi(무선) / 스마트TV / 블루투스 / 틸트(상하) / 200 x 200mm / HDR / HDR10 / 10.6kg 기획전 차세대 게임 라이프 PS5 매력분석 관련기사 큐소닉, 43인치 4K UHD 스마트 모니터 ‘삼성전자 M7 S43AM700’ 출시 및 할인 행사 사용기 삼성 스마트모니터 m7 s43am700",
    "tags": [
      "가전",
      "모니터",
      "컴퓨터"
    ],
    "thumbnail": "https://storage.googleapis.com/heropy-api/vBAK4MQdH5v195712.png",
    "photo": "https://storage.googleapis.com/heropy-api/vVLP-ox_zSDv195712.jpg"
  },
  "reservation": null,
  "timePaid": "2021-11-07T20:01:49.100Z",
  "isCanceled": false,
  "done": true
}
```
