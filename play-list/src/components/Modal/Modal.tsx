import ReactDOM from 'react-dom'
import * as S from './Modal.styles'

type TModalProps = {
  onClose: () => void;
  onclickYes?: () => void; 
  children: React.ReactNode; 
}

export function Modal({onClose, onclickYes, children}: TModalProps){

  //모달 바깥 클릭시 모달 닫기
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  const portalElement = document.getElementById('portal');
  if (!portalElement) {
    console.error('Portal element 없음');
    return null;
  }

  return ReactDOM.createPortal(
    <S.ModalPotal onClick={handleOutsideClick}>
      <S.StyledModal>
        <button className='close' onClick={onClose}>❌</button>
        {children}
        <div className='btn-container'>
          <button className='btn yes' onClick={onclickYes}>예</button>
          <button className='btn no' onClick={onClose}>아니오</button>
        </div>
      </S.StyledModal>
    </S.ModalPotal>,
    portalElement
  );
}