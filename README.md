
# KOCAMP

<a href="https://kocamp.du.r.appspot.com/">Kocamp 홈페이지</a>

## 🌱개요
주제 선정을 위해 웹과 앱들을 찾아보던 중 코로나 이후 캠핑하는 사람들이 많아짐에 따라 캠핑장 정보와 해당 캠핑장의 리뷰를 쉽게 볼 수 있는 웹앱이 있으면 좋을 것 같아 주제로 정하게 되었습니다.

## ⚒️기술 스택
<b>Front-End</b>
<br>
<img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>&nbsp;&nbsp;<img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>&nbsp;&nbsp;<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>

<br>
<b>Back-End</b>
<br>
<p><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>&nbsp;&nbsp;<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>&nbsp;&nbsp;<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/></p>

## 📖배운점
Express의 패키지인 EJS 템플릿 엔진을 통해 프론트엔드 부분을 구현하였고, 서버는 Node.js의 Express.js 프레임워크로 서버를 구현하였습니다. 또, NoSQL 데이터베이스인 MongoDB와 연결하기 위해 NPM 패키지인 Mongoose를 사용하였습니다.

프론트엔드 부분을 구현하면서 느낀 부분은 공부를 시작할 당시 자신감을 가졌던 레이아웃을 구현하는 부분과 재사용이 가능한 CSS를 작성하는 부분이 조금 미숙했던 것 같아 이 부분들에 대해서는 조금 보충적인 공부가 필요하다고 느꼈습니다.

처음 구상한 계획은 실제로 캠핑 환경이 얼마나 잘 준비되어 있는지 (예: 온수 유무, 매점의 유무 등)에 대한 데이터들과 예약과 결제까지 가능한 웹·앱을 구현하고자 했으나 프론트엔드 개발의 지식을 더 쌓아야 하는 입장으로써 더 이상의 백엔드 구현은 아직 저에게 시기상조라 생각되어 기본적인 리뷰가 가능한 부분에서 개발을 마무리 하였습니다.

Express.js를 통해 프론트엔드 개발자가 어떻게 서버측으로 데이터를 정리해서 보내야 하는지와 서버에서 데이터를 받아올 때 어떻게 구현을 해야 서버에서 받아온 데이터들을 프론트엔드 개발자가 더 보기좋게 레이아웃을 구상할 수 있는지에 대한 부분들을 고민하면서 생각할 수 있는 좋은 기회가 되었습니다.

그리고 더불어 MongoDB를 통한 데이터베이스에 대한 기초적인 이론과 사용 방법들을 슥듭함에 따라,  데이터베이스들의 특징과 서버와 데이터베이스가 서로 데이터를 주고 받는 방식을 배울 수 있었습니다.

실제 배포까지 진행해보고 싶어서 Google Cloud Platform(GCP)를 통해 배포까지 시도해봤지만 어떤 이유에서인지 실제 배포가 된 Kocamp에서는 새로운 데이터를 주고 받고자 할 때, Internal Server Error(HTTP 상태코드 500)에러가 자꾸 발생해서 해당 오류에 대해서 찾아보고 있습니다.

백엔드를 구현한 부분이 엉성하지만 구현하면서 좋은 경험을 했습니다. :-)
