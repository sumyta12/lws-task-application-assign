import { useDispatch } from 'react-redux';
import LOGO from './../../asstes/images/logo.svg'
import { searchTask } from '../../Feature/Filter/FilterTask';

function Nav() {

  
  const dispatch = useDispatch()

  const handlerInput = (e) => {
    dispatch(searchTask(e.target.value))
  }

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <a href="./index.html">
          <img src={LOGO} alt="this is logo" />
        </a>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            onChange={handlerInput}
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
