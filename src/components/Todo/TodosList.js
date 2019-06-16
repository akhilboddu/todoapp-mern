import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';


export default class CheckboxList extends React.Component {

    
    render() {
        return (
            <List>
            {this.props.todos && this.props.todos.map(todo => {
                const labelId = `checkbox-list-label-${todo}`;
    
                return (
                <ListItem key={todo._id} role={undefined} dense button onClick={() => this.props.handleUpdateTodo(todo)}>
                    <ListItemIcon>
                    <Checkbox
                        checked={todo.complete}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${todo.text}`} />
                    <ListItemSecondaryAction>
                    <IconButton onClick={() => this.props.handleRemoveTodo(todo)}>
                        <Close />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })}
            </List>
        );
    }
    
}
