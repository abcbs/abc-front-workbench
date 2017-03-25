export extend from 'lodash/extend'
import  endsWith from  'lodash/endsWith'

String.ends_with=String.ends_with||endsWith;
String.prototype.startsWith=String.prototype.startsWith||endsWith;