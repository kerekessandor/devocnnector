import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({isAuthanticated}) => {

    if (!isAuthanticated){
        return <Redirect to='/login' />;
    }

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

Dashboard.propTypes = {
    isAuthanticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthanticated: state.auth.isAuthanticated
});

export default connect(mapStateToProps)(Dashboard)
