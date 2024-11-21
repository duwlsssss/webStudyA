import {useEffect} from 'react'
import {Modal, PlayListItem} from '../../components'
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux'
import {clearCart, calculateTotals, decrease, removeItem} from '../../redux/cartSlice'
import {openModal, closeModal} from '../../redux/modalSlice'
import * as S from './PlayList.styles'
import { CartIcon } from '../../data/icons'

export function PlayList(){

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const selectedItemId = useAppSelector((state) => state.modal.selectedItemId);

  useEffect(()=>{
    dispatch(calculateTotals());
  },[cartItems,dispatch]);

  const handleClearCart = () => {dispatch(openModal(null));} // 모달 열기, 전체 삭제 시 선택 항목 null

  const handleItemRemove = (id: string) => {
    dispatch(openModal(id)); // 모달 열기, 특정 아이템 삭제
  };

  const handleDecrease = (id: string, amount: number) => {
    if (amount > 1) {
      dispatch(decrease(id)); // 바로 감소
    } else {
      dispatch(openModal(id)); // 모달 열기, 특정 아이템 삭제
    }
  };

  const onClose = () => {dispatch(closeModal());} //모달 닫기

  const onclickYes = () => {
    if (selectedItemId) {
      dispatch(removeItem(selectedItemId)); // 특정 아이템 삭제
    } else {
      dispatch(clearCart()); // 전체 삭제
    }
    dispatch(closeModal()); // 모달 닫기
  }

  return(
    <>
      {/* Modal Portal */}
      {isOpen && 
        <Modal onClose={onClose} onclickYes={onclickYes}>
          <p>
            {selectedItemId
              ? `이 항목을 삭제하시겠습니까?`
              : `모든 항목을 삭제하시겠습니까?`}
          </p>
        </Modal>}
      {/* Main Content */}
      <S.StyledHeader>
        <p>JOY'S PlayList</p>
        <div className='cart-icon-container'>
          <CartIcon size={40}/>
          <div className='total-amount'>{totalAmount}</div>
        </div>
      </S.StyledHeader>
      <S.StyledSection>
        {cartItems.map(item=><PlayListItem key={item.id} item={item} onRemove={handleItemRemove} onDecrease={handleDecrease}/>)}
        <S.StyledTotalPrice>
          <p>총 가격:</p>
          <p className='total-price'>{Number(totalPrice).toLocaleString('en-US')} 원</p>
        </S.StyledTotalPrice>
        <S.StyledButton onClick={handleClearCart}>장바구니 초기화</S.StyledButton>
      </S.StyledSection>
    </>
  );
}

