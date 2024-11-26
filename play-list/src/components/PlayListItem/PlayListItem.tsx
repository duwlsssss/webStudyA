import { ChevronDown,ChevronUp, TrashIcon} from '../../data/icons'
import { useAppDispatch } from '../../hooks/useRedux'
import { increase } from '../../redux/cartSlice'
import * as S from './PlayListItem.styles'
import TCartItem from '../../types/cartItem'

type TPlayListItemProps = {
  item: TCartItem;
  onRemove: (id: string) => void;
  onDecrease: (id: string, amount: number) => void;
}; 

export function PlayListItem({item, onRemove, onDecrease}: TPlayListItemProps){
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    dispatch(increase(item.id));
  };

  const handleDecrease = () => {
    onDecrease(item.id, item.amount); // 수량 감소 모달 띄우기 -> 상위 컴포넌트 handleDecrease 호출
  };

  const handleRemove = () => {
    onRemove(item.id); // 삭제 요청 전달 -> 상위 컴포넌트 handleItemRemove 호출
  };

  return (
    <S.StyledItem>
      <div className='item-left'>
        <img src={item.img} alt={item.title} className="item-image" />
        <div className="item-details">
          <h3>{item.title} | {item.singer}</h3>
          <p>₩ {Number(item.price).toLocaleString('en-US')}</p>
        </div>
      </div>
      <div className='item-right'>
        <div className="item-controls">
          <ChevronUp size={15} onClick={handleIncrease}/>
          <p>{item.amount}</p>
          <ChevronDown size={15} onClick={handleDecrease}/>
        </div>
        <TrashIcon size={15} onClick={handleRemove}/>
      </div>
    </S.StyledItem>
  );
}

