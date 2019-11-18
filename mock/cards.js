let data = [
  {
    id: 1,
    name: 'umi',
    desc: '极快的类 Next.js 的 React 应用框架。',
    url: 'https://umijs.org'
  },
  {
    id: 2,
    name: 'antd',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn'
  },
  {
    id: 3,
    name: 'antd-pro',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn'
  }
];

export default {
  'GET /api/cards': (req, res) => {
    setTimeout(() => {
      res.json({
        result: data,
      })
    }, 250)
  },
  'POST /api/cards/add': function (req, res, next) {
    data = [...data, {
      ...req.body,
      id: data[data.length - 1].id + 1,
    }];
    
    res.json({
      success: true,
    });
  },
  'PUT /api/cards/update/:id': function (req, res) {
    const { id } = req.params;
    const { name, desc, url } = req.body;
    const record = data.find(item => item.id === parseInt(id, 10));
    record.name = name;
    record.desc = desc;
    record.url = url;
    res.json({
      success: true,
    });
  },
  'DELETE /api/cards/delete/:id': function (req, res) {
    const { id } = req.params;
    data = data.filter(item => item.id !== parseInt(id));
    res.json({
      success: true,
    });
  },
  'GET /api/cards/:id/statistic': function (req, res, next) {
    res.json({
      result: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 1150 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ]
    });
  },
}