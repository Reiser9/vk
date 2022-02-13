import React from 'react';

import './FriendsCard.css';

const FriendsCard = React.memo(({data}) => {
	console.log("Перерисовка карточки друга");
	if(data.last_seen){
		var date = new Date(data.last_seen.time*1000);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		if(minutes < 10){
			minutes = "0" + minutes;
		}
		var seconds = date.getSeconds();
		if(seconds < 10){
			seconds = "0" + seconds;
		}
	}

	return(
		<div className="friend__card">
			<a href={`https://vk.com/id${data.id}`} className="profile__img--inner" target="_Blanc">
				<img className="profile__img" src={data.photo_100} alt="Аватарка" />
			</a>

			<p className="profile__text">
				{data.status ? data.status : 'Нет статуса'}
			</p>

			<p className="profile__text">
				{data.screen_name}
			</p>

			<p className="profile__text">
				{data.first_name}
			</p>

			<p className="profile__text">
				{data.last_name}
			</p>

			<p className="profile__text">
				{data.last_seen ? hours + ":" + minutes + ":" + seconds : 'Нет данных'}
			</p>

			<p className="profile__text">
				{data.bdate ? data.bdate : 'Дата рождения не указана'}
			</p>

			<p className="profile__text">
				Подпищники: {data.followers_count ? data.followers_count : "Скрыто либо 0"}
			</p>

			{data.online_mobile ? <div className="online__mobile"></div> : data.online === 1 ? <div className="online"></div> : <div className="offline"></div>}
		</div>
	)
})

export default FriendsCard;