### mongoDB 관련 포스팅
---

https://kciter.so/posts/about-mongodb

<br>

### Promise all에 관한 포스팅

---
<br>

<img src="https://user-images.githubusercontent.com/62149784/115832217-9ab62f00-a44d-11eb-8f5c-8c69479bca4c.png">

<br>

https://code-masterjung.tistory.com/91

<br>

### 관계된 데이터 효율적으로 읽기
---

<br>

-   populate 사용 전

<img src="https://user-images.githubusercontent.com/62149784/115879943-29926e00-a485-11eb-9fce-f332f976b640.jpg">

<br>

-   populate 사용 후 성능 개선

<img src="https://user-images.githubusercontent.com/62149784/115879933-27301400-a485-11eb-8cfd-5dfa83897989.jpg">

<br>

출처 https://www.inflearn.com/course/%EB%AA%BD%EA%B3%A0%EB%94%94%EB%B9%84-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EB%AC%B4/dashboard

<br>


✔ DB 호출을 줄이는 것이 중요 

<br>

### Keyword : mongodb nested

---

<br>

✔ read 할 때 들어가는 가공을 create, update, delete 할 때  가공함으로써 읽기 성능 개선을 하였다

✔ 읽기 빈도가 쓰기 빈도보다 훨씬 높기 때문에 계산을 한번 하고 여러번 읽는 작업에서 혜택을 보자는 방향이다

<br>


### arrayFilter
---

<br>

공식문서 
https://docs.mongodb.com/manual/reference/operator/update/positional-filtered/

블로그

https://devyeogoo.tistory.com/3

<br>

### pull, push, $
---

<br>

블로그

https://www.zerocho.com/category/MongoDB/post/57a46d287c4a5115004e97eb

<br>

### 1:1 & 1:N
---

<br>

<img src="https://user-images.githubusercontent.com/62149784/130087072-2efa3610-7654-449f-81b3-beee9794ee3f.jpg">

<br>

-   관계

    - 개별적으로 읽을 때도 있다?

    -   내장하려는 문서가 자주 바뀐다?

<br>

- 내장  

    -   같이 불러올 때가 많다?

    -   읽기 비중이 CUD보다 더 높다?

<br>

✔ 위의 질문을 바탕으로 스키마를 발전 시켜나가라

✔ 기준이 모호하다면 일단 관계로 설정하고 추후에 내장이 필요하다면 내장해라

<br>

<img src="https://user-images.githubusercontent.com/62149784/130087078-62fe7e5b-82e3-4f12-bcc4-7e94b3bc5f50.jpg">

<br>

📌 1:N

-   N<100 -> 내장

-   100 < N < 1000 -> 부분(id만) 내장 (codePlat project에서 구현한 방식)

- 1000<N    -> 관계

-   N을 다양한 조건으로 탐색한다? -> 관계

<br>

### Index 
---
<br>

✔ 데이터가 많아지면 탐색시간이 오래걸린다
-> 이를 해결 하기 위한 방안으로 Index가 있다.
<br>



<br>

✨ 들어가기 전

-   MongoDB의 인덱스를 잘 작성하는 법을 이야기하기 전에 꼭 기억해야 할 것이 있습니다. 그것은 바로 항상 상상하라는 것입니다. 내가 가진 수많은 데이터를 효과적으로 검색하려면 어떤 키들을 어떤 순서로 정렬해두어야 할지를 언제나 고민해야 합니다. 마치 백과사전의 색인을 스스로 작성하는 것 처럼 말입니다.

✔ Index란

-   Index는 MongoDB에서 데이터 쿼리를 더욱 효율적으로 할 수 있게 해줍니다. 인덱스가 없이는, MongoDB는 collection scan – 컬렉션의 데이터를 하나하나 조회 – 방식으로 스캔을 하게 됩니다. 만약 document의 갯수가 매우 많다면, 많은 만큼 속도가 느려지겠죠? 이 부분을 향상시키기 위하여 인덱스를 사용하면 더 적은 횟수의 조회로 원하는 데이터를 찾을 수 있습니다.

✔ 기본 전략

1.  가급적 촘촘하게 인덱스를 작성해서 selectivity를 높입니다.

2.  쓰기 작업이 많은 데이터셋은 인덱스를 복잡하게 설계하지 않습니다.

3.  메모리를 충분히 확보하고 항상 관찰해야 합니다.


4.  index는 한 쿼리에 한 index만 유효합니다. 따라서 두 개의 index 가 필요하다면 복합 index를 사용합니다.


5.  index는 어떤 데이터가 도큐먼트에 추가되거나 수정될 때( write 작업 ) 그 컬렉션에 생성되어 있는 index도 새로운 도큐먼트를 포함시켜 수정됩니다. 이로 인하여 index 추가 시 wirte 작업은 느려질 수 있습니다. 따라서 index는 read 작업 위주의 애플리케션에서 유용하고 읽기보다 쓰기 작업이 많으면 index를 추가하는 것은 고려해야 합니다.

<br>

✔ Single-Key Index

<img src="https://user-images.githubusercontent.com/62149784/117264657-664f6380-ae8e-11eb-85f7-b5c7290b414f.jpg">

<br>

- 쿼리에서 단 하나의 키key만을 이용한다면 단일 키 인덱스를 사용해야 합니다.

-   단일 키를 기준으로 정렬 -> 최적의 알고리즘 -> 탐색시간 줄어듬

<br>

🤷‍♀️ 초기 users field의 index를 보면 username이 왜 설정되있을까?

<br>

<img src="https://user-images.githubusercontent.com/62149784/117269683-787fd080-ae93-11eb-8100-2df6f78c820f.jpg">

<br>


-   기본 인덱스 _id
모든 MongoDB의 컬렉션은 기본적으로 _id 필드에 인덱스가 존재합니다. 만약에 컬렉션을 만들 때  _id 필드를 따로 지정하지 않으면 mongod드라이버가 자동으로 _id 필드 값을 ObjectId로 설정해줍니다.

    _id 인덱스는 unique(유일)하고 이는 MongoDB 클라이언트가 같은 _id 를 가진 문서를 중복적으로 추가하는 것을 방지합니다.

-   스키마를 짤 때 username의 속성을 unique로 주었기 때문에 탐색 작업이 발생하게 된다. 그렇기 때문에 username을 빠르게 확인 할 수 있게 하기 위해 default로 설정 되있다.   

<br>

🙋‍♀️ age의 index를 오름차순으로 하고 query를 줄때 내림차순 정렬로 준다면 성능의 차이가 있을까?

<img src="https://user-images.githubusercontent.com/62149784/117272434-25f3e380-ae96-11eb-9737-c510f663740e.jpg">

<br>

<img src="https://user-images.githubusercontent.com/62149784/117272488-31dfa580-ae96-11eb-82d6-d795000387d6.jpg">

<br>

✔ 차이가 없다

✔  일렬로 나열되어 있기 때문에 찾는 순서는 중요하지 않습니다. 왼쪽에서 오른쪽으로 읽든, 오른쪽에서 왼쪽으로 읽든 어차피 동일하기 때문입니다. 실제로 `단일 인덱스`에서 오름차순으로 정의 된 인덱스의 컬렉션을 내림차순으로 검색해도 동일한 성능을 냅니다.



📌 출처

https://www.inflearn.com/course/%EB%AA%BD%EA%B3%A0%EB%94%94%EB%B9%84-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EB%AC%B4/lecture/67295?tab=curriculum

https://blog.ull.im/engineering/2019/04/05/mongodb-indexing-strategy.html

https://velopert.com/560

<br>

### Pagenation
---

<br>

<img src="https://user-images.githubusercontent.com/62149784/117526382-b568d600-afff-11eb-8e6e-7e6bd14d73a3.jpg">

✔ index, pagenation을 활용해 탐색시간을 줄일 수 있다.

✔ index를 없이 pagenation을 한다면 컬렉션의 모든 데이터를 검색하고 정렬을 한 뒤 pagenation이 발생하지만, index와 함께 pagenation을 사용한다면 limit 개수만큼 탐색을 하게 된다.

✔ 하지만 skip의 값이 엄청나게 커진다면 탐색 시간도 증가할 것이다. 예를들어 skip 10000, limit 10이라면 10010개의 탐색이 이루어진다.

✔ 즉, pagenation을 이용하면 시작부분, 끝부분은 엄청나게 빠르다(index는 왼쪽에서 오른쪽으로 읽든, 오른쪽에서 왼쪽으로 읽든 어차피 동일하기 때문) 중간 페이지가 상대적으로 느려질 수 있고 이를 위한 해결방안도 존재한다.

🙋‍♀️ 중간페이지 탐색시간 해결방안

생성 시간 순으로 정렬하고 pagination을 적용한다고 했을 때 예시로 알려드릴게요. 일단 _id는 기본으로 인덱스가 걸려 있고 해당 인덱스는 생성시간 순으로 나열이 되어 있어요. ObjectId에 timestamp가 포함되어 있기 때문이죠. 

일반적인 방법:

page1: model.find().skip(0).limit(10)

page2: model.find().skip(10).limit(10)

page3: model.find().skip(20).limit(10)

뒤로 갈수록 skip을 많이 해야되서 조금씩 느려지는건데요.

page1: model.find().imit(10)

page2: model.find({_id: { $gt: last_id }}).limit(10)

page3: model.find({_id: { $gt: last_id }}).limit(10)

이런식으로 하게 되면 skip을 할 필요가 없어지죠. 전 페이지의 마지막 문서의 _id를 GET API에 같이 보내주는거에요. 그러면 인덱스로 빠르게 탐색하고 다음 페이지의 문서들을 빠르게 호출할 수 있게 됩니다.

<br>

### Compound Index

---

<br>

✔ 두 개 이상의 필드를 사용하는 인덱스를 `복합 인덱스`라고 부릅니다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpgemF%2FbtqEHwZU7aD%2FWF4HYxkcc6rzNAaEuMDIuk%2Fimg.png">

<br>


-   특징 1. sort 연산 시 인덱스 순서를 고려하여 생성하자.
  
  <br>

-   특징 2. 단일 인덱스와 다르게 복합 인덱스는 정렬 방향을 고려하자.

📌 출처

https://ryu-e.tistory.com/1

<br>

### 기본 전략

---

<br>

앞선 이야기를 이어가봅시다. 영어 단어장을 만들고 있습니다. 나중에 찾고자 하는 영단어를 쉽게 검색하기 위해 색인을 만들어야 합니다. 고민 끝에 ‘동사’와 ‘명사’로 나누어 색인을 만들기로 했습니다. 총 1,000자의 단어 중 동사가 300자, 명사가 700자였습니다. ‘teacher’를 검색하기 위해 700자의 명사를 처음부터 하나씩 찾기 시작합니다.

무엇이 문제일까요? 색인이 너무 큰 범위로 만들어졌습니다. 이를 데이터베이스 용어로 ‘Selectivity’가 떨어진다고 이야기합니다. 효과적인 인덱스 작성 전략을 위해 반드시 고려해야 하는 것이 바로 이 ‘Selectivity’를 높이는 것입니다. 보다 정확하게 검색 할 수 있도록 좁은 범위를 갖는 색인을 만들어야 합니다. 즉, 초기 인덱싱 서치로 좁은 범위를 만들어 주는 것이 Selectivity가 높은 것이다.

‘읽기’와 ‘쓰기’중 어떤 작업을 주로 하는가도 잘 파악해야 합니다. 내가 만든 단어장은 아직 미완성이어서 계속 새로운 단어를 추가하고 있습니다. 이미 색인을 만들어두었기 때문에 매번 알파벳 순서로 추가 할 위치를 찾고 그 사이에 새로운 단어를 추가하는 작업을 해야 합니다. 따라서 쓰기 작업이 읽기 작업에 비해 많은 데이터베이스는 인덱스를 복잡하게 설정하면 오히려 나쁜 성능을 내는 경우가 있습니다.

마지막으로 사용 할 수 있는 메모리 크기를 고려해야 합니다. 인덱스는 실제 데이터와 별개의 메모리 공간에 저장을 하게 됩니다. 따라서 인덱스를 많이 만들다 보면 그만큼 많은 메모리를 사용하게 됩니다. 데이터베이스가 정상적으로 동작하기 위해서는 그 외에도 작업 셋working set이라는 데이터 구조도 메모리를 점유하게 됩니다. 따라서 메모리가 부족하여 문제가 발생하지 않도록 항상 주의를 기울여야 합니다.

<br>

### text index

---

<br>

✔ text index는 컬렉션 당 최대 한개까지 가능

<br>

### 부분 Nesting & Pagination을 이용한 고급스러운 API 만들기

---

<br>

😎 세션 소개

1. 후기 pagenation

2. 후기 총 개수

3. 최신 후기 목록들만 내장

📌 countDocuments

``` js
    const comments = await Comment.find({ blog: blogId }).countDocuments();
```

위와 같이 `countDocuments함수`를 사용하면, 현재 조건에 맞는 컬럼(도큐먼트)의 갯수를 빠르게 가져올 수 있다.

<br>

### Transaction
---

<br>

블로그

https://darrengwon.tistory.com/660

<br>

### AWS에 Node.js 백엔드 배포하기

---

📌 배포 flow

<br>

<img src="https://user-images.githubusercontent.com/62149784/117913568-8793d200-b31c-11eb-8acb-3dc34aac07c3.jpg">


<br>

✨ Ubuntu 환경 설정

Ubuntu에 node 14 downloads

-   https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/

=> node를 설치하면 npm도 설치된다.

=> git은 기존에 설치되 있으므로 node, npm, git이 세팅되게 된다.

=> 이후에 git clone으로 AWS pull code 과정을 진행한다.

=> 서버가 다운 될 경우를 대비해서 PM2를 사용했다.

=> 고정 IP 설정

=> https 적용(https를 적용하려면 도메인이 있어야 한다)

<br>

📌 기억할 것

-   노출되지 말아야 할 정보가 github에 노출되었다면 반드시 무효화 처리(개인정보 변경)를 해라!

-    찰나의 순간 노출되었더라도 반드시 무효화 처리를 해야한다!


✔ 자료 출처

https://www.inflearn.com/course/%EB%AA%BD%EA%B3%A0%EB%94%94%EB%B9%84-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EB%AC%B4/lecture/67903?tab=curriculum

<br>

### 무중단 서비스 & 확장성

---

<br>

<img src="https://user-images.githubusercontent.com/62149784/118228069-92896680-b4c4-11eb-9f0b-0a368e84ba5a.jpg">

✨ 서론

요즘 실제로 어플리케이션을 개발해서 서비스할 때, 단순히 하나의 어플리케이션을 구동하는 것이 아니라, 재해, 재난, 장애 등 여러 문제가 발생하여 어플리케이션이 다운되었을 경우 대비해 여러개의 서버에 어플리케이션을 구동시켜서 클러스터링을 통해 대응하는데, 데이터베이스도 마찬가지로 하나의 디비 서버가 죽었을 때를 대비해 복제를 통한 대응을 하려고하는데 기본적으로 몽고 DB에서는 복제의 기능을 지원합니다.


<br>

<img src="https://user-images.githubusercontent.com/62149784/118228133-a8972700-b4c4-11eb-9865-8336f974f41b.jpg">

<br>

✔ Replica set

MongoDB에서는 기본적으로 Replication(복제)를 지원합니다. 이는 서비스의 지속성과 안전성(무중단 서비스)을 제공하는 데이터베이스 시스템의 설비이며, MongoDB는 단순하게 데이터 복제를 위한 것뿐만 아니라 Master가 장애시, Slave를 Master로 자동 승격시켜줍니다. 수 많은 Slave 중에서 어떤 것을 Master로 할지를 투표를 통해 결정하게 되는데, MongoDB는 투표에 참여하기만 하는 것으로 Arbiter를 설정할 수 있습니다.

(기본적으로 MongoDB에서는 Master --> Primary노드, Slave --> Secondary노드라고 부르기도 합니다.)

✔ 과부하로 response time이 길어진다면?

<img src="https://user-images.githubusercontent.com/62149784/118230002-eb0e3300-b4c7-11eb-9fae-adb5d452e54f.jpg">

<img src="https://user-images.githubusercontent.com/62149784/118230011-ed708d00-b4c7-11eb-8429-00744c6460ed.jpg">

<br>

📌 자료 출처

https://www.inflearn.com/course/%EB%AA%BD%EA%B3%A0%EB%94%94%EB%B9%84-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EB%AC%B4/lecture/69955?tab=curriculum

https://toma0912.tistory.com/85

https://m.blog.naver.com/PostView.nhn?blogId=dlghks44&logNo=221314300059&proxyReferer=https:%2F%2Fwww.google.com%2F

<br>

### 관계형데이터베이스와 비교하기

<br>

<img src="https://user-images.githubusercontent.com/62149784/118233019-58bc5e00-b4cc-11eb-8e19-f426125e1c72.jpg">

<img src="https://user-images.githubusercontent.com/62149784/118233038-5eb23f00-b4cc-11eb-8c5c-519c163043cd.jpg">

<img src="https://user-images.githubusercontent.com/62149784/118233054-62de5c80-b4cc-11eb-9e22-084d28156e73.jpg">

<img src="https://user-images.githubusercontent.com/62149784/118233063-65d94d00-b4cc-11eb-8f27-1e149e72d9ae.jpg">

<img src="https://user-images.githubusercontent.com/62149784/118233078-6a9e0100-b4cc-11eb-92a4-42ac8e5026b9.jpg">

### $slice 

---

$each랑 같이 써야함
https://docs.mongodb.com/manual/reference/operator/update/slice/