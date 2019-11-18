import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

//定义全局变量
const FormItem = Form.Item;

@Form.create()
class CreateForm extends PureComponent {
  // 状态值

  // 生命周期

  
  //页面渲染
  render() {
    const { currentRecord, form: { getFieldDecorator } } = this.props;
    return (
      <Form>
        <FormItem label="名称" required>
          {getFieldDecorator('name', {
            rules: [{ required: true }],
            initialValue: currentRecord && currentRecord.name || ""
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
        <FormItem label="描述" required>
          {getFieldDecorator('desc', {
            initialValue: currentRecord && currentRecord.desc || ""
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
        <FormItem label="链接" required>
          {getFieldDecorator('url', {
            rules: [{ type: 'url' }],
            initialValue: currentRecord && currentRecord.url || ""
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default CreateForm;