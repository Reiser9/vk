import React from 'react';
import VK from 'vk-openapi';
import {useNavigate} from 'react-router-dom';

import GroupCard from './GroupCard/GroupCard.jsx';
import Paggin from '../../common/Paggin/Paggin.jsx';

import './Groups.css';

const Groups = ({load, authState}) => {
	const [groups, setGroups] = React.useState('');
	const [search, setSearch] = React.useState('');
	const [prevSearch, setPrevSearch] = React.useState('');
	const [showGroups, setShowGroups] = React.useState(21);

	const [currentPage, setCurrentPage] = React.useState(1);

	React.useEffect(() => {
		VK.Api.call('groups.get', {count: showGroups, extended: 1, v:"5.81"}, function(r){
		    setGroups(r.response);
		});
	}, []);

	const handleChange = (e) => {
		setSearch(e.target.value);
	}

	const searchGroups = React.useCallback((q = "", offset = 0) => {
		if(q.trim() !== ""){
			VK.Api.call('groups.search', {offset, count: showGroups, q, v:"5.81"}, function(r){
			    setGroups(r.response);
			    setPrevSearch(q.trim());
			    setSearch('');
			});
		}
		else{
			VK.Api.call('groups.get', {offset, count: showGroups, extended: 1, v:"5.81"}, function(r){
			    setGroups(r.response);
			    setPrevSearch("");
			});
		}
	}, [groups]);

	const navigate = useNavigate();
	if(!authState){
		navigate('/');
	}

	if(load){
		return 'Загрузка..';
	}

	console.log(groups);

	return(
		<div className="profile__inner">
			<p className="profile__text">
				Группы: {groups?.count}
			</p>

			<input type="text" placeholder="Поиск.." className="m1" value={search} onChange={handleChange} />

			<button className="auth__button m1" onClick={() => searchGroups(search)}>
				Поиск
			</button>

			{prevSearch && <p className="m1">
				Результаты по запросу '{prevSearch}'
			</p>}

			<div className="friends__inner">
				{groups.count > 0 ? groups.items.map((d, id) => <GroupCard key={id} data={d} />) : 'Групп не найдено'}
			</div>

			{groups.count > showGroups && <Paggin searchFunc={searchGroups} search={prevSearch} countResult={groups?.count} countInPage={showGroups} />}
		</div>
	)
}

export default Groups;