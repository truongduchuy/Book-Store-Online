import { put, call, takeLatest, fork } from 'redux-saga/effects';
import { callApi, createReducer, createAction } from 'dorothy/utils';

export const EMPLOYEES_REQUEST = 'EMPLOYEES_REQUEST';
export const EMPLOYEES_RESPONSE = 'EMPLOYEES_RESPONSE';

export const LOGIN_DASHBOARD_REQUEST = 'LOGIN_DASHBOARD_REQUEST';

export const EMPLOYEE_ADD_REQUEST = 'EMPLOYEE_ADD_REQUEST';
export const EMPLOYEE_ADD_RESPONSE = 'EMPLOYEE_ADD_RESPONSE';

export const EMPLOYEE_UPDATE_REQUEST = 'EMPLOYEE_UPDATE_REQUEST';
export const EMPLOYEE_UPDATE_RESPONSE = 'EMPLOYEE_UPDATE_RESPONSE';

export const EMPLOYEE_DELETE_REQUEST = 'EMPLOYEE_DELETE_REQUEST';
export const EMPLOYEE_DELETE_RESPONSE = 'EMPLOYEE_DELETE_RESPONSE';

export const SEARCH_EMPLOYEE_CHANGE = 'SEARCH_EMPLOYEE_CHANGE';

export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export const EMPLOYEE_REQUEST_ERROR = 'EMPLOYEE_REQUEST_ERROR';

function* requestEmployee() {
  try {
    const response = yield call(callApi, 'GET', `/api/users`);

    if (response) yield put(createAction(EMPLOYEES_RESPONSE, response));
  } catch (error) {
    console.log(error);
  }
}

function* watchEmployeesRequest() {
  yield takeLatest(EMPLOYEES_REQUEST, requestEmployee);
}

function* addEmployee(action) {
  const { callBack, ...data } = action.payload;
  try {
    const response = yield call(callApi, 'POST', `/api/users`, data);

    if (response) yield put(createAction(EMPLOYEE_ADD_RESPONSE, response));
    callBack(true);
  } catch (error) {
    console.log(error);
    callBack(false);
    yield put(createAction(EMPLOYEE_REQUEST_ERROR));
  }
}

function* watchAddEmployee() {
  yield takeLatest(EMPLOYEE_ADD_REQUEST, addEmployee);
}

function* deleteEmployee(action) {
  try {
    const response = yield call(callApi, 'DELETE', `/api/users/${action.payload}`);

    if (response && response.success)
      yield put(createAction(EMPLOYEE_DELETE_RESPONSE, action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* watchDeleteEmployee() {
  yield takeLatest(EMPLOYEE_DELETE_REQUEST, deleteEmployee);
}

function* updateEmployee(action) {
  const { callBack, ...data } = action.payload;
  const { _id, ...payload } = data;

  try {
    const response = yield call(callApi, 'PATCH', `/api/users/${_id}`, payload);

    if (response && response.success)
      yield put(createAction(EMPLOYEE_UPDATE_RESPONSE, { _id, updateData: payload }));
    callBack(true);
  } catch (error) {
    console.log(error);
    callBack(false);
    yield put(createAction(EMPLOYEE_REQUEST_ERROR));
  }
}

function* watchUpdateEmployee() {
  yield takeLatest(EMPLOYEE_UPDATE_REQUEST, updateEmployee);
}

function* loginDashboard(action) {
  const { history, callBack, ...data } = action.payload;
  try {
    const response = yield call(callApi, 'POST', `/api/users/login`, data);

    if (response) {
      history.push('/dashboard/orders');
      yield put(createAction(UPDATE_EMPLOYEE, response));
      callBack(true);
    }
  } catch (error) {
    console.log(error);
    callBack(false);
    yield put(createAction(EMPLOYEE_REQUEST_ERROR));
  }
}

function* watchLoginDashboard() {
  yield takeLatest(LOGIN_DASHBOARD_REQUEST, loginDashboard);
}

const initEmployee = { isWaitingEmployees: false, employees: [], employee: {} };
const employeeActionHandlers = {
  [EMPLOYEES_REQUEST]: (state, action) => ({ ...state, isWaitingEmployees: true }),
  [EMPLOYEES_RESPONSE]: (state, action) => {
    const employees = action.payload;
    return {
      ...state,
      isWaitingEmployees: false,
      employees,
      allEmployees: employees,
    };
  },
  [EMPLOYEE_ADD_REQUEST]: (state, action) => ({ ...state, isWaitingAdd: true }),
  [EMPLOYEE_ADD_RESPONSE]: (state, action) => {
    const employees = [...state.employees, action.payload];
    return {
      ...state,
      isWaitingAdd: false,
      employees,
      allEmployees: employees,
    };
  },
  [EMPLOYEE_UPDATE_REQUEST]: (state, action) => ({ ...state, isWaitingUpdate: true }),
  [EMPLOYEE_UPDATE_RESPONSE]: (state, action) => {
    const employees = state.employees.map(employee =>
      employee._id === action.payload._id
        ? { ...employee, ...action.payload.updateData }
        : employee,
    );
    return {
      ...state,
      isWaitingUpdate: false,
      employees,
      allEmployees: employees,
    };
  },
  [EMPLOYEE_DELETE_RESPONSE]: (state, action) => {
    const employees = state.employees.filter(({ _id }) => _id !== action.payload);
    return {
      ...state,
      isWaitingAdd: false,
      employees,
      allEmployees: employees,
    };
  },
  [UPDATE_EMPLOYEE]: (state, action) => {
    localStorage.setItem('bookstore-employee', JSON.stringify(action.payload));
    return {
      ...state,
      employee: action.payload,
    };
  },
  [SEARCH_EMPLOYEE_CHANGE]: (state, action) => ({
    ...state,
    employees: state.allEmployees.filter(
      employee => employee.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1,
    ),
  }),
};

export const employeeReducer = createReducer(initEmployee, employeeActionHandlers);
export const employeeSagas = [
  fork(watchEmployeesRequest),
  fork(watchAddEmployee),
  fork(watchDeleteEmployee),
  fork(watchUpdateEmployee),
  fork(watchLoginDashboard),
];
