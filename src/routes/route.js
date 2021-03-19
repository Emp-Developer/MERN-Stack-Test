import React from 'react'
import { Router, Switch, Route } from 'react-router';
import Navigation from '../components/navigation';
import Dashboard from '../components/dashboard';
import Login from '../components/login';
import Register from '../components/register';
import Update from '../components/update';

import AuthApi from '../middleware/authapi';

function Routes() {
    const Auth = React.useState(AuthApi)

    const ProtectedRoute = ({auth, component: Component, ...rest}) => {
        return(
            <Route 
            {...rest}
            render = {() => auth? (
                <Component />
            ) : 
            (
                window.location.href('/login')
            )
            }
            />
        )
    }    
    const ProtectedLogin = ({auth, component: Component, ...rest}) => {
        return(
            <Route 
            {...rest}
            render = {() => !auth? (
                <Component />
            ) : 
            (
                window.location.href('/dashboard')
            )
            }
            />
        )
    }
    const ProtectedSignup = ({auth, component: Component, ...rest}) => {
        return(
            <Route 
            {...rest}
            render = {() => !auth? (
                <Component />
            ) : 
            (
                window.location.href('/dashboard')
            )
            }
            />
        )
    }
    return (        
            <Router>
                <div className="App">
                    <Navigation />

                    <div className="auth-wrapper">
                        <div className="auth-inner">
                        <Switch>
                            <ProtectedRoute exact path='/' auth={Auth.auth} component={Dashboard} />
                            <ProtectedLogin path="/login" auth={Auth.auth} component={Login} />
                            <ProtectedSignup path="/register" component={Register} />
                            <Route path="/update" component={Update} />
                        </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        
    )
}

export default Routes
