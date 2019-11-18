import React, { PureComponent } from 'react';
import { Table, Button, Modal, Divider, message, DatePicker } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import SampleChart from '../../components/SampleChart';
import CreateForm from './CreateForm';

//定义全局变量

@connect(({ cards, loading }) => ({
  cardsList: cards.cardsList,
  statistic: cards.statistic,
  cardsLoading: loading.effects['cards/queryList']
}))
class List extends PureComponent{
  //状态值

  state = {
    createVisible: false,
    isEdit: false,
    currentRecord: {},
    id: '',
    statisticVisible: false,
  }

  columns = [
    {
      title: formatMessage({ id : 'name_column_label'}),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'description_column_label' }),
      dataIndex: 'desc',
    },
    {
      title: formatMessage({ id: 'link_column_label' }),
      dataIndex: 'url',
      render: value => <a href={value}>{value}</a>
    },
    {
      title: formatMessage({ id: 'dataStatistics_column_label' }),
      dataIndex: '_',
      render: (_, { id }) => {
        return (
          <Button type="primary" onClick={() => { this.showStatistic(id); }}>图表</Button>
        );
      },
    },
    {
      title: formatMessage({ id: 'operate_column_label' }),
      render: record => (this.renderActions(record))
    },
  ];

  //生命周期
  componentDidMount() {
    this.queryList();
  }

  showStatistic = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cards/getStatistic',
      payload: id,
    });
    // 更新 state，弹出包含图表的对话框
    this.setState({
      id, 
      statisticVisible: true
    });
  };

  handleStatisticCancel = () => {
    this.setState({
      statisticVisible: false,
    });
  }

  renderActions = (record) => {
    const editAction = <a onClick={() => {this.showEditRecord(record)}}>编辑</a>;
    const deleteAction = <a onClick={() => {this.deleteRecord(record)}}>删除</a>;
    return (
      <span>
        {editAction}
        <Divider type="vertical" />
        {deleteAction}
      </span>
    );
  }

  queryList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cards/queryList'
    });
  }

  deleteRecord = (record) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '删除记录',
      content: <span>确认要删除<strong>{record.name}</strong>吗？</span>,
      okText: "确定",
      cancelText: "取消",
      onOk() {
        dispatch({
          type: 'cards/deleteOne',
          id: record.id
        }).then(res => {
          message.success("删除记录成功");
        });
      }
    });
  }

  handleCancel = () => {
    this.setState({
      createVisible: false
    });
  }

  handleOk = () => {
    const { dispatch } = this.props;
    const { isEdit, currentRecord } = this.state;
    const { form: { validateFields } } = this.createFormRef.props;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      // 编辑
      if (!isEdit) {
        dispatch({
          type: 'cards/addOne',
          payload: values
        }).then(res => {
          message.success("添加一条记录成功");
          this.setState({
            createVisible: false
          });
        });
      } else {
        dispatch({
          type: 'cards/updateOne',
          id: currentRecord.id,
          params: values
        }).then(res => {
          message.success("更新一条记录成功");
          this.setState({
            createVisible: false
          });
        });
      }
    });
  }

  showCreateModel = () => {
    this.setState({
      createVisible: true,
    });
  }

  showEditRecord = (record) => {
    console.log(record)
    this.setState({
      createVisible: true,
      isEdit: true,
      currentRecord: record
    });
  }

  saveCreateFormRef = (ref) => {
    this.createFormRef = ref;
  }

  dateOnChange = (date, dateString) => {
    console.log(date, dateString);
  }

  //页面渲染
  render() {
    // 重新定义页面渲染所需的值
    const { cardsList, cardsLoading, statistic } = this.props;
    const { createVisible, currentRecord, isEdit, id, statisticVisible } = this.state;
    return (
      <div>
        <DatePicker />
        <Table
          columns={this.columns}
          dataSource={cardsList}
          loading={cardsLoading}
          rowKey="id"
        />
        <Button onClick={this.showCreateModel}>新建</Button>
        <Modal
          title={isEdit ? "编辑记录" : "新建记录"}
          visible={createVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <CreateForm
            wrappedComponentRef={this.saveCreateFormRef}
            currentRecord={currentRecord}
          />
        </Modal>
        <Modal
          title="查看图表"
          visible={statisticVisible}
          onCancel={this.handleStatisticCancel}
          footer={null}
        >
          <SampleChart data={statistic[id]} />
        </Modal>
      </div>
    );
  }
}

export default List;