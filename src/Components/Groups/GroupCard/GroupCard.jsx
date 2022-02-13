import React from 'react';

import './GroupCard.css';

const GroupCard = React.memo(({data}) => {
	console.log("Ререндер карточки группы");
	return(
		<div className="friend__card">
			<a href={`https://vk.com/public${data.id}`} className="profile__img--inner" target="_Blanc">
				<img className="profile__img" src={data.photo_200 ? data.photo_200 : 'https://www.meme-arsenal.com/memes/29008789bb9db36a7d84b857506ab069.jpg'} alt="Аватарка" />
			</a>

			<p className="profile__text">
				{data.screen_name}
			</p>

			<p className="profile__text">
				{data.name}
			</p>

			<p className="profile__text">
				{data.type}
			</p>
		</div>
	)
})

export default GroupCard;