import React, { Component } from 'react'
import {connect} from 'react-redux'
 class DashBoard extends Component {
    
    render() {
        const {user} = this.props.auth
        return (
            <div>
                {user.email}
            </div>
        )
    }
}


function mapStateToProps (state)  {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,{})(DashBoard)