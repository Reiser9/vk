import React from 'react';
import VK from 'vk-openapi';
import {useNavigate} from 'react-router-dom';

import FriendsCard from './FriendsCard/FriendsCard.jsx';
import Paggin from '../../common/Paggin/Paggin.jsx';

import './Friends.css';

const Friends = ({authState, load}) => {
	const [friends, setFriends] = React.useState('');
	const [search, setSearch] = React.useState('');
	const [prevSearch, setPrevSearch] = React.useState('');
	const [showFriends, setShowFriends] = React.useState(21);

	React.useEffect(() => {
		VK.Api.call('friends.get', {count: showFriends, order: 'hints', fields:'photo_100, status, screen_name, online, last_seen, bdate, followers_count', v:"5.81"}, function(r) {
		    setFriends(r.response);
		});
	}, []);

	const handleChange = (e) => {
		setSearch(e.target.value);
	}

	const searchFriends = React.useCallback((q = "", offset = 0) => {
		if(q.trim() !== ""){
			VK.Api.call('friends.search', {count: showFriends, offset, order: 'hints', fields:'photo_100, status, screen_name, online, last_seen, bdate, followers_count', q, v:"5.81"}, function(r){
			    setFriends(r.response);
			    setPrevSearch(q.trim());
			    setSearch('');
			});
		}
		else{
			VK.Api.call('friends.get', {count: showFriends, offset, order: 'hints', fields:'photo_100, status, screen_name, online, last_seen, bdate, followers_count', q, v:"5.81"}, function(r){
			    setFriends(r.response);
			    setPrevSearch('');
			    setSearch('');
			});
		}
	}, [friends]);

	const navigate = useNavigate();
	if(!authState){
		navigate('/');
	}

	if(load){
		return 'Загрузка..';
	}

	return(
		<div className="profile__inner">
			<p className="profile__text">
				Друзья: {friends?.count}
			</p>

			<input type="text" placeholder="Поиск.." className="m1" value={search} onChange={handleChange} />

			<button className="auth__button m1" onClick={() => searchFriends(search)}>
				Поиск
			</button>

			{prevSearch && <p className="m1">
				Результаты по запросу '{prevSearch}'
			</p>}

			<div className="friends__inner">
				{friends.count > 0 ? friends.items.map((d, id) => <FriendsCard key={id} data={d} />) : 'Пользователей не найдено'}
			</div>

			{friends.count > showFriends && <Paggin searchFunc={searchFriends} search={prevSearch} countResult={friends?.count} countInPage={showFriends} />}
		</div>
	)
}

export default Friends;