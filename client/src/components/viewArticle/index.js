import './style.scss';
import Reflux from 'reflux';
import React from 'react';
import { Route, Switch} from 'react-router-dom'
import ComponentUrlWatched from './../common/componentUrlWatched';
import Article from './article';
import ArticleEdit from './articleEdit';
import Articles from './articles';

class ViewArticle extends React.Component {

    render() {
        return (
            <div className='view-article'>
                <Route exact path='/articles/' component={Articles} />
                <Switch>
                    <Route exact path='/articles/create' component={ArticleEdit} />
                    <Route exact path='/articles/:articleId' component={Article} />
                </Switch>
                <Route exact path='/articles/:articleId/edit' component={ArticleEdit} />
            </div>
        );
    }
}

export default ViewArticle;  