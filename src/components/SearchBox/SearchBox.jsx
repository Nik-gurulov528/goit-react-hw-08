import { useId } from 'react';
import css from './SearchBox.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/filtersSlice';

export default function SearchBox() {
  const filterStr = useSelector(state => state.filter.items);
  const dispatch = useDispatch();
  const id = useId();

  return (
    <div className={css.mainFilter}>
      <label htmlFor={`${id}-filter`}>
        Find contact by name or phonenumber
      </label>
      <input
        id={`${id}-filter`}
        type="text"
        className={css.onlyField}
        value={filterStr}
        onChange={() => dispatch(changeFilter(event.data))}
      />
    </div>
  );
}
