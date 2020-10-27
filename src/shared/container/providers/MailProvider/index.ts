import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import GmailMailProvider from './implementations/GmailMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  gmail: container.resolve(GmailMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
