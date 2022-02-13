import React from 'react';

import './Paggin.css';

const Paggin = React.memo(({searchFunc, search, countResult, countInPage =  21}) => {
	console.log("Перерисовка пагинации");
	const [pagesCount, setPagesCount] = React.useState(1);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [pages, setPages] = React.useState([]);

	React.useEffect(() => {
		setPagesCount(Math.ceil(countResult / countInPage));
		let temp = [];
		for(let i = 1; i <= pagesCount; i++){
			temp = [...temp, i];
		}
		setPages(temp);
	}, [countResult, pagesCount]);

	React.useEffect(() => {
		setCurrentPage(1);
	}, [search])

	const handlePaggin = (id) => {
		searchFunc(search, (id * countInPage));
		setCurrentPage(id + 1);
	}

	return(
		<div className="paggination">
			{pages.map((i, id) => {
				return <div onClick={() => handlePaggin(id)} className={`paggin__item${i === currentPage ? ' active' : ''}`} key={id}>{i}</div>
			})}
		</div>
	)
})

export default Paggin;