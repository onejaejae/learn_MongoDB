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

-   데이터베이스의 인덱스는 그저 원하는 정보를 빨리 찾을 수 있도록 돕는 색인의 역할을 합니다

✔ 기본 전략

1.  가급적 촘촘하게 인덱스를 작성해서 selectivity를 높입니다.

2.  쓰기 작업이 많은 데이터셋은 인덱스를 복잡하게 설계하지 않습니다.

3.  메모리를 충분히 확보하고 항상 관찰해야 합니다.

✔ Single-Key Index

<img src="https://user-images.githubusercontent.com/62149784/117264657-664f6380-ae8e-11eb-85f7-b5c7290b414f.jpg">

<br>

- 쿼리에서 단 하나의 키key만을 이용한다면 단일 키 인덱스를 사용해야 합니다.

-   단일 키를 기준으로 정렬 -> 최적의 알고리즘 -> 탐색시간 줄어듬

<br>

🤷‍♀️ 초기 users field의 index를 보면 username이 왜 설정되있을까?

<br>

<img src="https://user-images.githubusercontent.com/62149784/117269683-787fd080-ae93-11eb-8100-2df6f78c820f.jpg">

스키마를 짤 때 username의 속성을 unique로 주었기 때문에 탐색 작업이 발생하게 된다. 그렇기 때문에 username을 빠르게 확인 할 수 있게 하기 위해 default로 설정 되있다.   

<br>

🙋‍♀️ age의 index를 오름차순으로 하고 query를 줄때 내림차순 정렬로 준다면 성능의 차이가 있을까?

<img src="https://user-images.githubusercontent.com/62149784/117272434-25f3e380-ae96-11eb-9737-c510f663740e.jpg">

<br>

<img src="https://user-images.githubusercontent.com/62149784/117272488-31dfa580-ae96-11eb-82d6-d795000387d6.jpg">

<br>

✔ 차이가 없다

✔  일렬로 나열되어 있기 때문에 찾는 순서는 중요하지 않습니다. 왼쪽에서 오른쪽으로 읽든, 오른쪽에서 왼쪽으로 읽든 어차피 동일하기 때문입니다. 실제로 `단일 인덱스`에서 오름차순으로 정의 된 인덱스의 컬렉션을 내림차순으로 검색해도 동일한 성능을 냅니다.



출처 : https://www.inflearn.com/course/%EB%AA%BD%EA%B3%A0%EB%94%94%EB%B9%84-%EA%B8%B0%EC%B4%88-%EC%8B%A4%EB%AC%B4/lecture/67295?tab=curriculum

https://blog.ull.im/engineering/2019/04/05/mongodb-indexing-strategy.html



