import { CONFIG } from "../config/systemconfig";

import flag from "../sysflag";

const SETTING = CONFIG[flag];

export default {
  protocol: SETTING.protocol,
  mktdataserverhostname: SETTING.mktdataserverhostname,
  mktdataserverport: SETTING.mktdataserverport,
  path: SETTING.path,
};
