import React from 'react';
import VK from 'vk-openapi';
import {useNavigate} from 'react-router-dom';

import './Wall.css';

const Wall = ({authState, load}) => {
	const [wall, setWall] = React.useState('');

	React.useEffect(() => {
		VK.Api.call('database.getCountries', {v:"5.81"}, function(r) {
		    //setWall(r.response);
		    console.log(r);
		});
	}, []);

	const navigate = useNavigate();
	if(!authState){
		navigate('/');
	}

	if(load){
		return 'Загрузка..';
	}

	return(
		<div className="profile__inner">
			Стена
		</div>
	)
}

export default Wall;