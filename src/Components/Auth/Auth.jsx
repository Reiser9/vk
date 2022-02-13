import React from 'react';
import {NavLink} from 'react-router-dom';

import './Auth.css';

const Auth = ({load, authState, auth, fail}) => {
	return(
		<div className="auth__inner">
			{load ? 'Загрузка..' 
			: <>
				<p className="auth__text">
					{fail ? 'Вы запретили доступ к данным VK' : <NavLink to="/">Главная</NavLink>}
				</p>

				{authState
				? <NavLink to="/profile" className="auth__button">
					Профиль
				</NavLink>
				: <button className="auth__button" onClick={auth}>
					Авторизоваться через VK
				</button>}
			</>}
		</div>
	)
}

export default Auth;