import React, { Component } from 'react'
import axios from 'axios'

export default class GetArticle extends Component {
    state = {
        articles : [],
        article : {},
        articleIsVisible : false,
        formIsVisible : false,
        name : '',
        description : '',
        idArray : []
    }

    componentDidMount(){
        this.getAllArticles()
    }

    getAllArticles = () => {
        axios.get('http://localhost:4000/article/get-all')
        .then(response => response.data)
        .then(data => this.setState({articles : data}), () => this.state)
    } 

    getOneArticle = (e) => {
        const id = e.target.value
        axios.get(`http://localhost:4000/article/${id}`)
        .then(response => response.data)
        .then(data => this.setState({
            article : data,
            articleIsVisible : !this.state.articleIsVisible
        }), () => this.state)
    } 

    updateArticle = (e) => {
        e.preventDefault()
        const id = this.state.article[0].id
        const article = {
            name : this.state.name ? this.state.name : this.state.article[0].name,
            description : this.state.description ? this.state.description : this.state.article[0].description  
        }
        
        axios.put(`http://localhost:4000/article/${id}`, article)
        .then(response => response.data)
        .then(data => console.log(data), () => this.state)

        window.location.reload()
    }

    displayForm = (e) => {
        this.getOneArticle(e);
        this.setState({
            formIsVisible : !this.state.formIsVisible
        })

    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    deleteArticle = (e) => {
        const id = e.target.value
        axios.delete(`http://localhost:4000/article/${id}`)
        .then(response => response.data)
        .then(data =>  console.log(data))
        window.location.reload()
    }

    getArticleIsToDelete = (e) => {
        const idArray = this.state.idArray
        idArray.push(e.target.value) 
        this.setState({idArray : idArray})
    }

    confirmMultipleDelete = () => {
    const ids = this.state.idArray
        for (let i = 0; i < ids.length; i++) {
            axios.delete(`http://localhost:4000/article/${ids[i]}`)
            .then(response => response.data)
            .then(data =>  console.log(data))
        }
        window.location.reload()
    }
    
    render() {
        console.log(this.state)
        return (
            <div>
                {
                    this.state.articles ? 
                    this.state.articles.map((article, i) => ( 
                        <div key={i}>
                            <h2>{article.name}</h2>
                            <button value={article.id} onClick={this.getOneArticle}>Voir plus</button>
                            <button value={article.id} onClick={this.displayForm}>Modifier</button>
                            <button value={article.id} onClick={this.deleteArticle}>Supprimer</button>
                            <input type="checkbox" value={article.id} onChange={this.getArticleIsToDelete}/>
                        </div> 
                    )): ''
                    
                }

                {/* {
                    this.state.articleIsVisible ? (
                        <div>
                            <p>{this.state.article[0].description}</p>    
                        </div>) : ''
                } */}

                {
                    this.state.formIsVisible ? (
                        <form>
                        <label>Titre :
                            <input type="text" name="name" placeholder={this.state.article[0] ? this.state.article[0].name : ''} onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <br/>
                        <label>Description :
                            <textarea type="text" name="description" placeholder={this.state.article[0] ? this.state.article[0].description : ''}  onChange={this.handleChange}/>
                        </label>
    
                        <input type="submit" value="Submit" onClick={this.updateArticle}/>
                    </form>
                    ) : ''
                }

                <button onClick={this.confirmMultipleDelete}>Supprimer tous</button>
            </div>
            )
           
        
    }
    
}