import React, {Component} from "react"

class DataFetcher extends Component {
    state = {
        loading: false,
        data: null,
        error: false
    }

    // Error handling: https://stackoverflow.com/questions/48339844/catching-error-in-fetch-function
    componentDidMount() {
        this.setState({loading: true})
        fetch(this.props.url)
            .then(res => {
                if (!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                }
                return res.json()
            })
            .then(parsedRes => this.setState({
                loading: false,
                data: parsedRes
            }))
            .catch(err => {
                console.log("Error on fetch: " + err)
                this.setState({error: true, loading: false})
            })
    }

    render() {
        return (
            this.props.render(this.state.loading, this.state.data, this.state.error)
        )
    }

}

export default DataFetcher