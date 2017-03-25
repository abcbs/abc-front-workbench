import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email,minLength}
    from '../../../abc-framework/utils/validation';

const authenticationValidation = createValidator({
  authName: [required, minLength(10)],
  authCode: [required, minLength(10),maxLength(20)],

});
export default memoize(10)(authenticationValidation);
