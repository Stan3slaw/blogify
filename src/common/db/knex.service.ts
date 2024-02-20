import KnexInit from 'knex';

import knexConfiguration from './configuration/knex.configuration';

const knexService = KnexInit(knexConfiguration);

export default knexService;
