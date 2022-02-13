import React from 'react';
import VK from 'vk-openapi';
import {useNavigate} from 'react-router-dom';

import './Status.css';

const Status = ({authState, load}) => {
	const [status, setStatus] = React.useState('');

	React.useEffect(() => {
		VK.Api.call('status.get', {v:"5.81"}, function(r){
		    setStatus(r.response?.text);
		});
	}, []);

	const handleChange = (e) => {
		setStatus(e.target.value);
	}

	const navigate = useNavigate();
	if(!authState){
		navigate('/');
	}

	if(load){
		return 'Загрузка..';
	}

	return(
		<div className="profile__inner">
			<input type="text" value={status} placeholder="Статус" onChange={handleChange} className="status__input" />
		</div>
	)
}

export default Status;