const btn = document.querySelector(".add-button")

const buttonClick = () =>{
    const input=document.getElementById("todo-input"); /*요소를 집어온거야*/
    /*리스트를 뽑아와야 돼*/
    const li=document.createElement("li");
    li.textContent=input.value; 

    //삭제
    const deletebtn=document.createElement('button'); 
    deletebtn.textContent="삭제";
    deletebtn.classList.add("dleeehfhejfhejfhe");
    deletebtn.addEventListener("click", function(){
        ul.removeChild(li);

    });

    li.appendChild(deletebtn);

    const ul=document.getElementById("todo-list");
    ul.appendChild(li);


};

btn.addEventListener("click", buttonClick);






/*document.querySelectorAll -> 모든걸 반환함 */
/*querySelector 은 클래스나 아이디값 됨.
/*getElementById 는 html에서 정의한 아이디값 그냥 ""안에 넣어주면 됨. Id 만 됨*/
