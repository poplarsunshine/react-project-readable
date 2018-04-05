import * as ReadableAPI from '../utils/api'

import {
    SET_CATEGORIES,
} from './types';

export function fetchCategories() {
  return dispatch => {
    ReadableAPI.getAllCategories().then(
      (categories) => {
        console.log('fetchCategories:', categories);
        dispatch(setCategories(categories));
      }
    )
  }
}

function setCategories (data) {
  return {
    type : SET_CATEGORIES,
    categories : data
  }
}
