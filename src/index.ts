import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/model/AppApi';


const appApi = new AppApi(CDN_URL, API_URL);
const eventBroker = new EventEmitter();

