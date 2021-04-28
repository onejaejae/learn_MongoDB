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