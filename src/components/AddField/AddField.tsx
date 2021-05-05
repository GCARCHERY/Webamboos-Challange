import React from "react";
import { Button, Input, Form, message, DatePicker, Select, InputNumber } from "antd";

import './AddFieldStyle.scss'

import fieldConfig from './fieldConfig.json'

import "antd/dist/antd.css";
import { FieldData } from "../../types";

interface Props {
    onSubmit?: Function 
}

class AddField extends React.Component<Props> {
    state = {
        ////////////////////////////
        field_name: '',
        field_name_validated: false,
        field_name_error: false,
        ////////////////////////////
        min: 0,
        max: 100,
        ////////////////////////////
        data_type: fieldConfig.data_types[0].value as FieldData["Field Type"]
    }

    onFinish = (values: FieldData) => {
        let data = values
        data['Min-Max'] = {
            min: this.state.min,
            max: this.state.max
        }
        this.setState({
            field_name: '',
            min: 0,
            max: 100,
            data_type: fieldConfig.data_types[0].value
        })
        let Form:any = (document.getElementById("field-config-form"))
        if(Form) {
            Form.reset()
        }
        
        if(this.props.onSubmit) {
            this.props.onSubmit(data)
        }
    };

    onFinishFailed = (errorInfo:any) => {
        errorInfo.errorFields.map((element:any) => {
            message.error(element.errors);
            if(element.name[0] === 'Field Name' && !this.state.field_name_error) {
                this.setState({field_name_error: true})
            }
        })
        
    };

    renderDataTypes() {
        return fieldConfig.data_types.map((data_type, key) => {
            return <Select.Option value={data_type.value} key={key}>{data_type.name}</Select.Option>
        })
    }

  render() {
    return (
            <div className='add_field_wrapper'>
                <Form
                    id='field-config-form'
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item 
                        validateStatus={this.state.field_name_validated ? 'success': this.state.field_name_error ? 'error' : ''} 
                        help={fieldConfig.default_texts.field_name.help}
                        name={fieldConfig.default_texts.field_name.name}
                        rules={[{required: true}]}
                    >
                        <Input 
                            placeholder={fieldConfig.default_texts.field_name.name}
                            onChange={(event) => {
                                this.setState({field_name: event.target.value})
                                if(event.target.value && !this.state.field_name_validated) {
                                    this.setState({field_name_validated: true, field_name_error: false})
                                }else if(!event.target.value) {
                                    this.setState({field_name_validated: false, field_name_error: true})
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item 
                        help={fieldConfig.default_texts.field_type.help}
                        name={fieldConfig.default_texts.field_type.name}
                        initialValue={this.state.data_type}
                    >
                        <Select 
                            style={{ width: '30%' }} 
                            defaultValue={this.state.data_type} 
                            onChange={(event) => {
                                this.setState({data_type: event})
                            }}
                            value={this.state.data_type}
                        >
                            {this.renderDataTypes()}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        help={fieldConfig.default_values[this.state.data_type].help}
                        hasFeedback 
                    >
                            {   this.state.data_type === 'date' ? 
                                    <DatePicker.RangePicker 
                                        onChange={(data: any) => {
                                            data.map((element:any, key: number) => {
                                                if(key) {
                                                    this.setState({min: element})
                                                }else{
                                                    this.setState({max: element})
                                                }
                                            }) 
                                        }}
                                    /> 
                                :
                                    <div>
                                        <InputNumber
                                            defaultValue={0}
                                            value={this.state.min}
                                            onChange={(event) => {
                                                console.log(event)
                                                if(event >= 0) {
                                                    this.setState({min: event })
                                                }
                                            }}
                                            parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') ? value.replace(/\$\s?|(,*)/g, '') : '0')}
                                        />
                                        <InputNumber
                                            defaultValue={100}
                                            value={this.state.max}
                                            onChange={(event) => {
                                                console.log(event)
                                                if(event >= 0) {
                                                    this.setState({max: event })
                                                }
                                            }}
                                            parser={value => parseInt(value?.replace(/\$\s?|(,*)/g, '') ? value.replace(/\$\s?|(,*)/g, '') : '100')}
                                        />
                                    </div>
                            }
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Field
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    );
  }
}

export default AddField;