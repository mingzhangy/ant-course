import request from '../utils/request';

export function queryList() {
  return request('/api/cards');
}

export function addOne(data) {
  return request('/api/cards/add', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateOne(id, params) {
  return request(`/api/cards/update/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

export function deleteOne(id) {
  return request(`/api/cards/delete/${id}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'DELETE'
  });
}

export function getStatistic(id) {
  return request(`/api/cards/${id}/statistic`);
}