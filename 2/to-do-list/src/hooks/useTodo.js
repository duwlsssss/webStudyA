import { useQuery, useMutation } from '@tanstack/react-query';
import { addTodo, editTodo, deleteTodo} from '../api/todo'
import { queryClient } from '../App';

// todo 추가
export const useAddTodo = () => {
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']); // 전체 Todo 목록 갱신
    },
    onError: (error) => {
      console.log('할 일 추가 중 오류 발생:',error.message); 
    },
  });
};

// todo 수정
export const useEditTodo = () => {
  return useMutation({
    mutationFn: editTodo, 
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']); // 전체 Todo 목록 갱신
    },
    onError: (error) => {
      console.log('할 일 수정 중 오류 발생:',error.message); 
    },
  });
};

// todo 삭제
export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']); // 전체 Todo 목록 갱신
    },
    onError: (error) => {
      console.log('할 일 삭제 중 오류 발생:',error.message); 
    },
  });
};


