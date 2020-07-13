import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// const Alert = (props) =>
// 	props.alerts !== null &&
// 	props.alerts.length > 0 &&
// 	props.alerts.map((item) => (
// 		<div key={item.id} className={`alert alert-${item.alertType}`}>
// 			{item.msg}
// 		</div>
// 	));

// const Alert = (props) => {
// 	return (
// 		props.alerts !== null &&
// 		props.alerts.length > 0 &&
// 		props.alerts.map((item) => {
// 			return (
// 				<div key={item.id} className={`alert alert-${item.alertType}`}>
// 					{item.msg}
// 				</div>
// 			);
// 		})
// 	);
// };

function Alert(props) {
    if (props.alerts !== null && props.alerts.length > 0) {
      return props.alerts.map(alert => (
        <div key={alert.id} className={'alert alert-' + alert.alertType}>
          {alert.msg}
        </div>
      ));
    } else {
      return null;
    }
  }

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    console.log(state);
	return {
		alerts: state.alert,
	};
};

export default connect(mapStateToProps)(Alert);
