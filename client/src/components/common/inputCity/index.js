import './style.scss';
import React from 'react';
import Reflux from 'reflux';
import axios from 'axios';
import { StoreMain, actionsMain } from '../../../stores/main';

class InputCity extends React.Component {

    constructor(props) {
        super(props);
        this.state = { focus: false, value: '', predictions: [] };
    }

    onClick(prediction) {
        this.setState({value: '', predictions: [] });
        const cityId = prediction.cityId;
        this.onGetLocation(cityId)
            .then(this.updateCity.bind(this)); 
    }

    updateCity(prediction) {
        this.props.onChange(prediction.city, 'city');
        this.props.onChange(prediction.loc, 'loc');
    }

    onChange(event) {
        const value = event.target.value;
        this.setState({value: value });
        this.onAutocomplete(value);
    }

    onFocus() {
        this.setState({ focus: true });
    }

    onBlur() {
        this.setState({ focus: false });
    }

    onGetLocation(cityId) {
        return axios.get(`/geo/location/${cityId}`)
            .then((response) => {
                return {
                    city: response.data.city,
                    loc: response.data.loc
                };
            });  
    }
        
    onAutocomplete(input) {
        return axios.get(`/geo/autocomplete/${input}`)
            .then((response) => {
                this.setState({ 'predictions': response.data });
            }); 
    }

    render() {
        const value = this.state.focus ? this.state.value : this.props.value;

        return (
            <div className={'input ' +
                (this.state.focus ? 'focus ' : '') +
                ((this.state.value||this.props.value) ? 'full ' : '') +
                (this.props.className || '')}>
                <input
                    className='input__value'
                    name={this.props.name}
                    value={value || ''}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onChange={this.onChange.bind(this)} />
                <div className='input__label'>{this.props.label}</div>
                <hr className='input__bar' />
                <div className='input__autolist'>
                    {
                        this.state.predictions.map((prediction, index) => <div 
                            className='input__autolist__item'
                            key={index}
                            onClick={this.onClick.bind(this, prediction)}>
                            {prediction.city}
                        </div>) 
                    }
                </div>
            </div>
        );
    }
}

export default InputCity;
