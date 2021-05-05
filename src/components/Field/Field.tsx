import React from "react";
import { DatePicker, Input, InputNumber } from "antd";

import './FieldStyle.scss'

import "antd/dist/antd.css";
import { FieldData } from "../../types";

interface Props {
    field_name: FieldData["Field Name"],
    field_type: FieldData["Field Type"],
    min_max: FieldData["Min-Max"]
}

class Field extends React.Component<Props> {
    state = {
        ////////////////////////////
        field_name: '',
        field_name_validated: false,
        field_name_error: false,
        ////////////////////////////
        min: 0,
        max: 100,
        ////////////////////////////
    }


  render() {
    return (
            <div className='wrapper'>
                <div className='field_name_wrapper'>
                    <h3>Field Name: {this.props.field_name}</h3>
                </div>
                <div className='field_name_wrapper'>
                    <h3>Field type: {this.props.field_type}</h3>
                </div>
                <div className='field_value_wrapper'>
                    {   
                        this.props.field_type === 'string' ? 
                            <Input
                                type='text'
                                minLength={this.props.min_max ? this.props.min_max.min : undefined}
                                maxLength={ this.props.min_max ? this.props.min_max.max : undefined}
                                placeholder={'Field Value'}
                            />
                        :
                            this.props.field_type === 'int' ? 
                                <InputNumber
                                    type='number'
                                    min={this.props.min_max ? this.props.min_max.min : undefined}
                                    max={this.props.min_max ? this.props.min_max.max : undefined}
                                />
                            :
                                <DatePicker
                                    disabledDate={d => !d || d.isAfter(new Date(this.props.min_max ? this.props.min_max.min : undefined)) || d.isBefore(new Date(this.props.min_max ? this.props.min_max.max : undefined)) }
                                />
                    }
                </div>
            </div>
    );
  }
}

export default Field;