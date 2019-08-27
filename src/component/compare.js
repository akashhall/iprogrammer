import React, { Component } from 'react';
import axios from 'axios'
import './style.css'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoData: [],
            compareData: [],
        }
    }

    fetchData() {
        let data = axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        data.then((d) => {
            console.log(d)
            this.setState({
                photoData: d.slice(0, 4)
            })
        })
    }

    componentDidMount() {
        this.fetchData();
    }
    handleCompare = (e, id) => {
        let filteredArray = this.state.compareData;
        console.log(id)
        let filterValue = this.state.photoData.find((data) => data.id === id)
        if (!this.state[id]) {
            this.setState({ [id]: true })
            filteredArray.push(filterValue)
        } else {
            filteredArray = filteredArray.filter((data) => data.id !== id)
            this.setState({ [id]: false })
        }
        this.setState({ compareData: filteredArray })
    }
    render() {
        const { photoData, compareData } = this.state
        return (
            <div className="main-container">
                <div className="container">
                    {
                        photoData && photoData.length ? photoData.map((data, index) => {
                            return (
                                <div className="subContainer" key={index}>
                                    <div className="image-set">
                                        <img src={data.url} alt={data.url} />
                                    </div>
                                    <span> {data.title}</span>
                                    <span> {data.id}</span>
                                    <span> {data.url}</span>
                                    <button className={this.state[data.id] ? 'compare-btn-red' : 'compare-btn'} onClick={(e) => {
                                        this.handleCompare(e, data.id)
                                    }}> {this.state[data.id] ? 'remove' : 'Compare'}</button>
                                </div>
                            )
                        })
                   : null }
                </div>
                <div>
                    {compareData && compareData.length ?
                        <table style={{ width: '70%', marginLeft: '100px', marginTop : '50px' }}>
                            <caption style={{ border : '2px solid', marginBottom : '10px', padding : '5px'}}>Comparison</caption>
                            <tr>
                                <th>Photo</th>
                                <th>ID</th>
                                <th>URL</th>
                                <th>Title</th>
                            </tr>
                            <tbody>
                                {compareData.map((data, index) => {
                                    return <tr key={index}>
                                        <td><img src={data.thumbnailUrl} alt={data.thumbnailUrl}/></td>
                                        <td>{data.title}</td>
                                        <td>{data.id}</td>
                                        <td>{data.url}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table> : null}
                </div>
            </div>
        )
    }
}

export default App;