const todoInput = document.querySelector("#todo-input"); 
const todoList = document.querySelector("#todo-list");
const doneList = document.querySelector("#done-list");
const MAX_TODO_LENGTH = 10;

// 할 일 추가 함수
function addTodo() {
  const todoText = todoInput.value;

  // 입력 항목 유효성 검사
  if (todoText.length > MAX_TODO_LENGTH) {
    alert(`할 일은 최대 ${MAX_TODO_LENGTH}자로 입력해주세요!`);
    return;
  }
  if (!todoText.trim()) {
    alert("스터디 계획을 입력해주세요!");
    return;
  }

  // 새로운 할 일 항목 생성
  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";
  todoItem.textContent = todoText;

  // 완료 버튼 생성
  const completeButton = document.createElement("button");
  completeButton.textContent = "완료";
  completeButton.className = "complete-btn";
  completeButton.addEventListener("click", () => moveToDone(todoItem));

  // 할 일 항목에 완료 버튼 추가 후 할 일 목록에 추가
  todoItem.append(completeButton);
  todoList.append(todoItem);

  // 입력 필드 초기화
  todoInput.value = "";
}

// 스터디 계획 작성 후 Enter키 이벤트
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.isComposing) {
    addTodo();
  }
});

// 할 일을 해낸 일로 옮기는 함수
function moveToDone(todoItem) {
  // 완료 버튼 제거
  const completeButton = todoItem.querySelector(".complete-btn");
  completeButton.remove();

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", () => todoItem.remove());

  // 할 일 항목에 삭제 버튼 추가 후 해낸 일 목록에 추가
  todoItem.appendChild(deleteButton);
  doneList.appendChild(todoItem);

}
