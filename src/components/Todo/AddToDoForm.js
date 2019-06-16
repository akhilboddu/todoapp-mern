import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'


export default class AddToDoForm extends Component {

    state = {
        text: ''
    }

    handleOnChange = (e) => {
        const newText = e.target.value
        this.setState({text: newText})
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            this.props.createTodo(this.state.text)
            this.setState({text: ''})
        }
    }

    render() {
        return (
            <TextField
                id="standard-name"
                label="To do..."
                onChange={this.handleOnChange}
                onKeyDown={this.handleKeyDown}
                value={this.state.text}
                fullWidth
                margin="normal"
            />
        )
    }
}

