# WeTube

Cloning YouTube with Vanilla and NodeJS

# ToDo

1. userProfile image ratio

## Pages:

- [x] Home
- [x] Join
- [x] Login
- [x] Search
- [x] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Upload
- [x] Video Detail
- [x] Edit Video

# 초기세팅

## gitignore

- .env
- npm install
- 업데이트 테스트

## 3.12 Searching Videos

- regular expression(https://regex101.com/)
- mongoose_regex: 내가 검색한 단어를 포함한 것을 찾으려고 할 때
- search에서 검색 결과를 담는 videos는 const가 아닌 let으로 선언(추후 변경할 수 있도록)
- videoDetail.pug

  - comments 추가

## 4.0 Introduction to Webpack

- webpack 오류 해결 중
- 설치

  - webpack, webpack-cli

    - webpack

      - 개발자의 코드는 건드리지 않으면서, client의 코드를 변환
      - entry: 파일이 어디서 왔는가?
      - output: 그 파일을 어디에 넣을 것인가?

    - webpack-cli

      - 터미널에서 webpack을 쓸 수 있음

    - 방법: npm install webpack webpack-cli

  - prettier

    - eslint 오류(Error: Cannot find module 'prettier')가 발생하여 설치함

## 4.1 & 4.2 Styles with Webpack

### Webpack을 전부 이해하려고 하지 않아도 된다(각 모듈이 어떤 일을 하는지만 이해)

- 설치

  - cross-env(dev:assets 부분 에러 해결)

    - npm install cross-env

  - extract-text-webpack-plugin(@next: 베타버전)

    - npm install extract-text-webpack-plugin@next

  - loader

    - css-loader: webpack이 이해
    - postcss-loader: CSS를 변환(브라우저 간 호환성 문제)

      - autoprefixer

    - sass-loader: Sass or SCSS > CSS

  - node-sass

- webpack이 scss를 인식하지 못하는 문제

  - 규칙을 추가한다(rules)

    1. scss를 찾고,
    2. scss를 css로 변환하고,
    3. 변환한 css 텍스트를 추출하고,
    4. 텍스트를 하나의 css파일로 만듬

  - use
    - 위에서 아래로 시행되는 것이 아니고, 아래에서 위로 시행된다.
    - 먼저 실행되어야 하는 것을 아래에 두어야 함
      1. sass-loader
      2. postcss-loader
      3. css-loader

## 4.3 ES6 with Webpack

- 설치

  - babel-loader(ES6 변환)

  - babel/polyfill (regenerator error 해결)

- webpack -w
  - 변환 대상이 되는 파일의 변화를 확인하고, webpack을 실행

## 5.0 SCSS and Making the header

- main에 min-height를 주는 이유(main 안에 들어가는 콘텐츠의 양이 적어 footer가 위로 올라오는 것을 방지하기 위해)

## 5.1 Footer and Login / Join

- scss를 수정할 때 마다 nodemon이 서버를 재시작함.

  - 서버를 재시작하는 것을 막는 방법

    - package.json > scripts > dev:server > --ignore 'scss' 추가

## 6.0 Introduction to PassportJS

- Passport란?

  - http://www.passportjs.org/

- 쿠키란?

## 6.1 Local Authentication with Passport part One

- strategy(로그인 하는 방식)
  - passport-local(해당 사이트 가입 시)

### 설치

- passport-local-mongoose

  - https://www.npmjs.com/package/passport-local-mongoose
  - option
    - usernamefield: 여러 항목(name, email, id 등등)중 어떤 field를 username으로 할 지 알려주는 설정

- passport

## 6.2 Local Authentication with Passport part Two

- serialization

  - 이용자의 쿠키에 정보를 담는 것

- deserialization

  - 이용자 쿠키의 정보를 통해 이용자를 확인하는 것

- register
  - 이용자 등록

## 6.3 Loggin the User In

PostJoin을 미들웨어로 만들고,
회원가입 과정이 끝나면(next()) PostLogin으로 이어지도록 함

회원가입 성공 > 로그인 > 홈 리다이렉트
회원가입 실패 > 홈 리다이렉트

로그인 성공 > 홈 리다이렉트
로그인 실패 > 로그인 리다이렉트

## 6.4 Sessions on Express

- session 필수 옵션인 secret에 넣어줄 문자열은 다른 사람이 봐선 안되기에 .env에 넣어준다.

### 흐름

1.  app.use(session({})) > 쿠키 획득(해독)
2.  app.use(passport.session()) > session이 가진 쿠키를 이용
3.  ./passport.js deserializeUser > 쿠키를 가지고 어떤 유저인지 확인
4.  이후 유저정보를 middleware or routes의 req obj에 할당 > 로그인한 사용자가 누구인지 확인할 수 있음

### 설치

- express-session
  - session을 관리하기 위한 모듈

## 6.5 MongoStore and Middlewares

- MongoStore

  - 서버를 껏다 켜도 로그인이 유지되려면, 쿠키를 DB에 저장해야 한다.
  - session과 mongoose를 연결하기 위해 connect-mongo를 설치

- Middlewares
  - 로그인하지 않은 유저만 갈 수 있는 페이지
    - Join
    - Login
  - 로그인한 유저만 갈 수 있는 페이지
    - Profile
    - Upload 등등
  - onlyPublic & onlyPrivate라는 Middleware를 만들고, Router를 통해 페이지를 이동할 때 Middleware를 거치도록 하면, 로그인 한 유저와 로그인하지 않은 유저를 구분하여 페이지 이동을 제한할 수 있다.

### 설치

- connect-mongo

## 6.6 Github Log In part One

- github
  - Authorization callback URL
    - http://localhost:4000/auth/github/callback
  - Client ID / Client Secret을 부여받음

### 설치

- passport-github

## 6.7 Github Log In part two

- github로 보내기
  - globalRouter.get(routes.gitHub, githubLogin);
- github에서 돌아온 유저의 console.log 찍기
  - globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", {
    failureRedirect: "/login"
    }),
    postGithubLogin
    );

## 6.9 Recap and User Profile

- 인증 과정 정리(github)
- userProfile의 url을 id에서 따던 것을 me로 바꿈
  - 내가 나의 Profile을 들어갈때와 다른 사람의 Profile을 들어갈 때 Url을 구분한 것
  - MyProfile = /me
  - AnotherProfile = /users/id

## 6.10 User Detail + Facebook Login Part One

- Facebook Login을 위한 세팅
- 로그인 성공 But, 이메일 & 프로필 이미지 등을 받지 못함

### 설치

- npm install passport-facebook

## 6.11 Facebook Login Part Two

- facebook로그인을 하기 위해서는 사이트가 https여야 함
  - localhost에서 https를 만들기 위해 Localtunnel을 사용
  - ## 단순한 테스트용임

### 설치

- npm install -g localtunnel

## 6.12 Facebook Log In part Three

## 7.0 User Profile

## 7.2 Change Password

- 비밀번호를 바꾸기 위해 사용하는 plugin
  - passport-local-mongoose

## 7.3 Adding Creator to Video

- models 구조(서로 엮임)

  - User >> Video / Comment 할당
  - Video >> creator / Comment 할당
  - Comment >> creator 할당

- Upload할 때 Video.creator에 res.user.id(로그인 한 나)를 할당

- Video Edit 버튼 보안
  - if video.creator.id(이 영상 만든사람) === loggedUser.id(로그인 한 나)

## 7.4 Protecting Video Routes

- Video Edit 버튼 보안 2
  - 단순히 버튼을 안보이게 한다고 해도 url로 접근한다면 어떻게 할까?
  - getVideoDetail에서 video.creator와 req.user.id를 비교함으로써 보안처리가 가능
- userdetail에 들어갔을 때 해당 이용자가 올린 영상의 목록을 볼 수 있도록 함(Not me)

## 8.0 Starting the VideoPlayer

- videoDetail과 videoPlayer(mixin)와의 관계 // home과 videoBlock과의 관계
  - videoPlayer는 틀이고, 변수를 누구에게서 받는가 함은
  - videoDetail에서 videoPlayer를 추가할 때 넘겨줄 변수도 함께 설정한다.

## 8.1 Play Pause Functionallity

-

## 8.4 Total Time and Current Time

- duration
- currentTime

- video가 불러오기 전에 setTotalTime()이 실행되면, duration의 값을 가져오지 못함
  - 이를 해결하기 위해 video가 불러올때 실행되는 event(loadedmetadata)를 찾고, 이 이벤트가 실행될 때 함수를 실행하도록 함

# 8.4 error & solve

처음 페이지를 로드할 때는 totalTime이 제대로 나오지만, 새로고침을 하면 totalTime이 NaN으로 바뀌어버림

해결방법 : https://academy.nomadcoders.co/courses/435438/lectures/6903898

## 8.5 Volume Bar part One

- input type: range

## 8.6 volume Bar part Two

- mute 해제 시 원래 볼륨으로 돌아가기
  - videoPlayer.volume = past volume (handleDrag가 마지막으로 실행되었을 때의 볼륨값)
  - volumeRange.value = current volume (mute 버튼을 누르면 volumeRange.value는 0으로 변경되지만, videoPlayer.volume은 변경되지 않으므로, mute 해제 시 원래 볼륨으로 돌아가기 위해서는 videoPlayer의 값을 다시 가지고 오면 된다.)

# 8.6 error

> input {
> background-color: rgba(0, 0, 0, 0.7);
> &::-webkit-slider-runnable-track {
> background-color: \$grey;

          height: 5px;
        }
        &::-webkit-slider-thumb {
          all: unset;
          background-color: $red;

height: 15px;
width: 15px;
border-radius: 50%;
position: relative;
top: -5px;
}
}

- 이 부분이 적용되지 않음 >> volume 슬라이더 모양 변경 X

# 9.0 Getting User Media

videoStream을 위해 사용하는 Api

=> https://developer.mozilla.org/ko/docs/Web/API/MediaDevices

=> https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia

# 9.1 Recording video part One

videoRecording을 위해 사용하는 Api

> https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

> let streamObject

streamObject를 전역변수로 선언하고,
getVideo 함수에 있는 stream을 저장하여 다른 함수에서 사용할 수 있도록 함

### addEventListener("click", ~~)와 onclick의 차이점

> recordBtn.addEventListener("click", getVideo);

=> 클릭 이벤트에 여러 함수를 추가할 수 있음

> recordBtn.onclick = getVideo;

=> 클릭 이벤트에 단 하나만 놓을 수 있음 & recordBtn.onclick = null; 로 삭제할 수 있지만 전부 삭제 되는 것

### Question (ondataavailable)

> videoRecorder.ondataavailable = handleVideoData;

=> 이건 되고

> videoRecorder.addEventListener("dataavailable", e => {
> console.log(e);
> console.log("addEventListener");
> });

=> 이건 안된다.

# 9.2 Recording video part Two

### Answer (ondataavailable)

dataavailable 이벤트는 레코딩이 끝났을 때 얻을 수 있음
그래서 레코딩 시작했을 때 event가 실행되지 않는 것

데이터 확인 하는 방법

1. 일정한 주기로 녹화를 시작하는 방법

   > videoRecording.start(1000)

2. 일정한 주기로 데이터를 요청하는 방법
   > setInterval(() => videoRecorder.requestData(), 1000);

### 과제

1. 녹화되고 있는 시간 확인 가능하도록
2. 다운로드한 비디오 파일의 총 재생시간도 볼 수 있도록

# 10.0 API Registering a View part One

### Single Page Application

페이지 이동 없이 필요한 데이터를 가져다 주는 방식 (with ajax)
ex) Youtube

### API

server와 통신하기 위한 URL
database로 다른 서비스와 통신하기 위해 만듬

1. 유저가 접근할 수 없음
2. 해당 url에 어떠한 것도 렌더할 수 없음

만드는 법

1. 해당 api에 대한 url 세팅
2. url 방문 시 일어날 함수(controller) 세팅
3. 끝

# 10.1 API Registering a View part Two

### 설치

- axios

=> https://www.npmjs.com/package/axios

### post req & get req

1. database를 변경할 필요가 없다.

- get req

2. database를 변경해야 한다.

- post req

### fetch

> fetch(`/api/${videoId}/view`, {

    method: "POST"

});

# 10.2 API Adding a Comment part One

### populate

Model간 연결되어 있고, 연결된 모델을 가져오려고 할 때

> export const videoDetail = async (req, res) => {
> const {

    params: { id }

} = req;

try {
const video = await Video.findById(id)
.populate("creator")
.populate("comments");
// console.log(video);
res.render("videoDetail", { pageTitle: video.title, video });
} catch (error) {
console.log(error);
res.redirect(routes.home);
}
};

Model 사전 작업

> const UserSchema = new mongoose.Schema({
> name: String,
> email: String,
> avatarUrl: String,
> facebookId: Number,
> githubId: Number,
> comments: [

    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }

],
videos: [

{

type: mongoose.Schema.Types.ObjectId,

ref: "Video"

}

]
});

# 10.3 API Adding a Comment part Two

# 10.4 API Adding a Comment part Three

### 새로고침 없이 댓글을 쓰는 방법(Fake)

### Comment 최신 순서로 하는 방법

1. push로 comment를 DB에 입력하고, reverse로 꺼냄
2. append로 comment를 DB에 입력함

# 10.5 Error 수정 및 코드 정리

1. videoDetail

- loggedUser.id 가 선언되지 않았다는 error 수정
  > if loggedUser && video.creator.id === loggedUser.id

2. comment delete 기능
1. google material icon 추가
   material.scss

# 11.5~6 Deploying to Heroku

## Heroku 설치 및 login

- https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

- vscode 재시작 & 로그인

  > \$ heroku login

  연결

  > \$ heroku create

## Heroku config for .env

- https://www.npmjs.com/package/heroku-config

## Heroku 작동 방식

- heroku는 npm start를 함 => package.json 세팅 필요!!

# 11.7 Express Flash

## npm install express-flash

# SCSS 문법

- &:not(:last-child)
- &:nth-child(2)
- input[type="submit"]
- &::placeholder

# 보안처리

7.3, 7.4 참고
