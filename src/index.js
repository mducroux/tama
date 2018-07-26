import React from "react";

import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import localeEn from 'react-intl/locale-data/en';
import localeFr from 'react-intl/locale-data/fr';

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import messagesFr from "./translations/fr.json";
import messagesEn from "./translations/en.json";

addLocaleData([...localeEn, ...localeFr]);

const messages = {
  'fr': messagesFr,
  'en': messagesEn
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(<IntlProvider locale={language} messages={messages[language]}><App /></IntlProvider>, document.getElementById("root"));
registerServiceWorker();
