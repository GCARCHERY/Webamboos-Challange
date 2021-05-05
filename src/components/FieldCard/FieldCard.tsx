import React from "react";
import { Button, Card, Modal } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { updateFields } from '../../state/actions/fieldActions'; 

import AddField from '../AddField/AddField';
import Field from '../Field/Field';

import './FieldCardStyle.scss';

import "antd/dist/antd.css";

import { FieldData } from "../../types";

const mapDispatchToProps = (dispatch:any) => {
    return {
      updateFields: (data:Array<FieldData>) => {
        dispatch(updateFields(data))
      },
    }
  }

const mapStateProps = (state:any) => {
    return {
        fields: state.fields,
    };
};

interface Props {
    fields: Array<FieldData>,
    updateFields: Function
}

class FieldCard extends React.Component<Props> {
    state = {
        isModalVisible: false,
    }

    handleOk = () => {
        this.setState({isModalVisible: false})
    };
    
    handleCancel = () => {
        this.setState({isModalVisible: false})
    };

    onSubmit = (data: FieldData) => {
        let fields = this.props.fields
        fields.push(data)
        this.props.updateFields(fields)
        this.setState({isModalVisible: false})
    }

    displayFields() {
        return this.props.fields.map((element:FieldData, key:number) => {
            return <Field field_name={element['Field Name']} field_type={element['Field Type']} min_max={element['Min-Max']} key={key}/>
        })
    }

  render() {
    return (
            <Card 
                title={[
                    <Button type="dashed" onClick={() => this.setState({isModalVisible: true})} block icon={<PlusOutlined />}>
                        Add field
                    </Button>
                ]}
            >
                <Modal okText='Add Field' title="Add a new Field" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}
                footer={[]}
                >
                    <AddField onSubmit={this.onSubmit}/>
                </Modal>

                {
                    this.props.fields ? 
                        this.displayFields()
                    :
                        undefined
                }

            </Card>
    );
  }
}

export default connect(mapStateProps, mapDispatchToProps)(FieldCard);