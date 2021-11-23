import { setUser } from "actions/auth.actions";
import React, { useEffect } from "react";
import routes from "routes";
import api from "services/api";
import Main from "./Main";
import {connect} from 'react-redux'

const DashboardLayout = ({ children, setUser, Auth, ...rest }) => {
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    await api.axios
      .get('/v1/me')
      .then((res) => {
        setUser(res.person)
      })
  }
  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900`}>
      <div className="flex flex-col flex-1 w-full">
        {/* <Nav /> */}
        <Main routes={routes} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  Auth: state
})
export default connect(mapStateToProps, { setUser })(DashboardLayout);