import React, {Component} from 'react';

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(`${this.API_URL}/data`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data
                });
            })
            .catch(error => {
                console.error("Error when fetching: ", error);
            })
    }

    render() {
        let list = this.state.data.map((elm, index) => <li key={index}>{elm}</li>);
        return (
            <div className="container">
                <h1>MERN Deployment Example</h1>

                <p>Data from API:</p>
                <ol>
                    {list}
                </ol>
            </div>
        );
    }
}

export default App;
