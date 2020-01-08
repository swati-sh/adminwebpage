import React from 'react';
import './leftDisplay.css';
import piktorLogo from '../../assets/Page-1_1_.svg';

const LeftDisplay = (props) => {
	return (
		<div>
			<div className="main-content">
				<div className="piktor-gotab">
					<div className="content__left--logo"><img src={piktorLogo} alt="" className="piktor-logo" /></div>
					<div className="content__left--gotab">Gotab</div>
				</div>
				<div className="content__left--desc">
					<div className="content__left--desc-text">
						<div className="text">Unified </div>
						<div className="text">Employee</div>
						<div className="text">Management</div>
						<div className="text">Platform</div>
					</div></div>
			</div>
		</div>
	)
}

export default LeftDisplay;