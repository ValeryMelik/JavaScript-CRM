import { showError } from '../modal-windows/modal-show-err';

const URL = 'http://localhost:3000/api/clients';

export async function getClientList(fn) {
  try {
    const response = await fetch(URL);
    checkStatus(response);

    return await response.json();
  } catch (error) {
    showError(error, fn);
  }
}

export async function postNewcl(newclJSON, fn) {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newclJSON,
    });
    checkStatus(response);

    return response;
  } catch (error) {
    showError(error, fn);
  }
}

export async function patchClient(id, clJSON, fn) {
  try {
    const response = await fetch(URL + '/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: clJSON,
    });
    checkStatus(response);

    return response;
  } catch (error) {
    showError(error, fn);
  }
}

export async function removeClient(id, fn) {
  try {
    const response = await fetch(URL + '/' + id, {
      method: 'DELETE',
    });
    checkStatus(response);

    return response;
  } catch (error) {
    showError(error, fn);
  }
}

async function removeClientAPI(id) {
  return await fetch(URL + '/' + id, {
    method: 'DELETE',
  });
}

function checkStatus({ status }) {
  if (status !== 200 && status !== 201) {
    const error = new Error();
    error.status = status;
    throw error;
  }
}
