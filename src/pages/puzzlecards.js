import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { connect } from 'dva';

const mapDispatchToProps = (dispatch) => {
  return {
    onClickAdd: (newCard) => {
      const action = {
        type: 'puzzlecards/addNewCard',
        payload: newCard,
      };
      dispatch(action);
    },
  };
};
@connect(({ puzzlecards }) => ({
  cardList: puzzlecards.data
}), mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
  render() {
    const { cardList } = this.props;
    return (
      <div>
        {
          cardList.map(card => {
            return (
              <Card key={card.id}>
                <div>Q: {card.setup}</div>
                <div>
                  <strong>A: {card.punchline}</strong>
                </div>
              </Card>
            );
          })
        }
        <div>
          <Button onClick={() => this.props.onClickAdd({
            setup: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            punchline: 'here we use dva',
          })}> 添加卡片 </Button>
        </div>
      </div>
    );
  }
}