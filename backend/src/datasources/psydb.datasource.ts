import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'psydb',
  connector: 'memory',
  localStorage: '',
  file: './data/db.json',
  disableMigration: false
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PsydbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'psydb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.psydb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
