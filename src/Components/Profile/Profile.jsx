import React from 'react';
import VK from 'vk-openapi';
import {useNavigate, NavLink} from 'react-router-dom';

import './Profile.css';

const Profile = ({logout, authState, load}) => {
	const [name, setName] = React.useState('');
	const [surname, setSurname] = React.useState('');
	const [img, setImg] = React.useState('');
	const [id, setId] = React.useState('');

	const navigate = useNavigate();
	if(!authState){
		navigate('/');
	}

	React.useEffect(() => {
		VK.Api.call('users.get', {fields: 'photo_100', v:"5.81"}, function(r) {
		    const res = r.response[0];
		    setName(res.first_name);
		    setSurname(res.last_name);
		    setImg(res.photo_100);
		    setId(res.id);
		});
	}, []);

	if(load){
		return 'Загрузка..';
	}

	return(
		<div className="profile__inner">
			<a href={`https://vk.com/id${id}`} className="profile__img--inner" target="_Blanc">
				<img className="profile__img" src={img} alt="Аватарка" />
			</a>

			<p className="profile__text">
				{name}
			</p>

			<p className="profile__text">
				{surname}
			</p>

			<button className="auth__button" onClick={logout}>
				Выйти
			</button>

			<NavLink to="/status" className="auth__button m1">
				Статус
			</NavLink>

			<NavLink to="/friends" className="auth__button m1">
				Друзья
			</NavLink>

			<NavLink to="/groups" className="auth__button m1">
				Группы
			</NavLink>

			<NavLink to="/wall" className="auth__button m1">
				Стена
			</NavLink>
		</div>
	)
}

export default Profile;