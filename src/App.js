import React, {Component} from 'react';

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            inputData: ""
        };

        this.getData = this.getData.bind(this);
        this.click = this.click.bind(this);
        this.change = this.change.bind(this);
        this.postData = this.postData.bind(this);
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

    postData(data) {
        fetch(`${this.API_URL}/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({data: data})
        })
        .then(response => response.json())
        .then(data => console.info(data))
        .catch(error => {
            console.error("Error when posting: ", error);
        })
    }

    change(event) {
        this.setState({input: event.target.value})
    }

    click() {
        console.log("click", this.state.input);
        this.postData(this.state.input);
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
                <p>Post new data:</p>
                <input onChange={this.change} type="text"/>
                <button onClick={this.click}>Post</button>
            </div>
        );
    }
}

export default App;
