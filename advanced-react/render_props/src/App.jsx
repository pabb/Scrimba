import './App.css'
import DataFetcher from './DataFetcher'

function App() {
    return (
        <div className="App">
            <DataFetcher
                url="https://swapi.dev/api/people/1/"
                render={(loading, data, error) => (
                    error ? <h1>Error occurred</h1> :
                    (loading ? 
                        <h1>Loading...</h1> : 
                        <p>{JSON.stringify(data)}</p>
                ))}
            />
        </div>
    )
}

export default App
