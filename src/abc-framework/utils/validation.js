const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return {message:'Invalid email address',flag:"error"
    };
  }
}

export function required(value) {
  if (isEmpty(value)) {
    // return 'Required';
    return {message:'必填',flag:"error"}
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      const message= `长度必须大于 ${min} 字`;
      return {message:message,
        flag:"error"}
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      const message= `长度必须小于 ${max} 字`;
      return {message:message,
        flag:"error"}
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    // return 'Must be an integer';
    return {message:'必须是整数',
      flag:"error"}
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      const message=`必须是: ${enumeration.join(', ')}`;
      return {message:message,
        flag:"error"}
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        // return 'Do not match';
        return {message:'不匹配',
          flag:"error"}
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); 
      const error = rule(data[key], data);

      if (error) {
        errors[key] = error;
      }
    });
    return errors;
    return {message:errors,
      flag:"error"}
  };
}
