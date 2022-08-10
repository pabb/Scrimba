import React, {Component} from "react"

const {Provider, Consumer} = React.createContext()

class UserContextProvider extends Component {
    state = {
        username: "Default User",
    }
    
    setUsername = (newUser) => {
        this.setState(prevState => {
            return {
                username: newUser
            }
        })
    }
    
    render() {
        return (
            <Provider value={{username: this.state.username, setUsername: this.setUsername}}>
                {this.props.children}
            </Provider>
        )
    }
}

export {UserContextProvider, Consumer as UserContextConsumer}