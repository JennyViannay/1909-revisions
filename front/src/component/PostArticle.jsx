import React, { Component } from 'react'
import axios from 'axios'

export default class GetArticle extends Component {
    state = {
        name: '',
        description: ''
    }

    postArticle = (e) => {
        e.preventDefault();
        const article = { 
            name : this.state.name,
            description : this.state.description
        }
       
        axios.post('http://localhost:4000/article/create', article)
            .then(response => response.data)
            .then(data => console.log('response from server',data))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
                <form>
                    <label>Titre :
                        <input type="text" name="name" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>
                    <label>Description :
                        <textarea type="text" name="description" onChange={this.handleChange}/>
                    </label>

                    <input type="submit" value="Submit" onClick={this.postArticle}/>
                </form>
            </div>
        )


    }

}